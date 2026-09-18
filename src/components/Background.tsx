import {createSignal, onCleanup, onMount, Show} from "solid-js";
import { state, setState } from "~/store";
import { toast } from "~/components/ui/Toast";

const WALL_COUNT = 10;

/** 拼接本地壁纸地址 */
const wallUrl = (n: number) =>
  import.meta.env.BASE_URL + "images/wallpapers/wall-" + String(n).padStart(2, "0") + ".jpg";

const randomWall = () => wallUrl(Math.floor(Math.random() * WALL_COUNT) + 1);

/** 每日一图（按天轮换） */
const dailyWall = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return wallUrl((dayOfYear % WALL_COUNT) + 1);
};

interface BackgroundProps {
  onLoadComplete?: () => void;
}

/** 壁纸：默认 / 每日一图 / 随机；加载完成回调 */
export function Background(props: BackgroundProps) {
  const [bgUrl, setBgUrl] = createSignal(wallUrl(1));
  const [showImg, setShowImg] = createSignal(false);
  let timer: number | null = null;
  let emitted = false;
  // 保存 img 元素引用，用于 hydration 后补触发 onLoad
  let imgEl: HTMLImageElement | undefined;

  const changeBg = () => {
    // 当前仅统一使用本地壁纸：默认/随机风景/随机动漫 → 随机；每日一图 → 按天
    setBgUrl(state.coverType === "1" ? dailyWall() : randomWall());
  };

  const imgLoadComplete = () => {
    timer = window.setTimeout(() => {
      setState({ imgLoadStatus: true });
      setShowImg(true);
    }, Math.floor(Math.random() * 300) + 300);
    // 预取另一张壁纸(随机)，便于"展示壁纸"切换时更跟手
    const next = new Image();
    next.src = state.coverType === "1" ? dailyWall() : randomWall();
  };

  const imgLoadError = () => {
    console.error("壁纸加载失败");
    toast("壁纸加载失败，已临时切换", { type: "error" });
    setBgUrl(randomWall());
  };

  onMount(() => {
    changeBg();
    // SSR 场景：壁纸可能在 hydration 绑定 onLoad 前就已加载完成（本地/缓存），
    // load 事件被错过会导致 imgLoadStatus 一直为 false、正文永不显示。
    // 挂载后检查图片是否已加载完成，若是则手动补触发。
    requestAnimationFrame(() => {
      if (imgEl && imgEl.complete && imgEl.naturalWidth > 0 && !state.imgLoadStatus) {
        imgLoadComplete();
      }
    });
  });

  onCleanup(() => {
    if (timer) clearTimeout(timer);
  });

  // 封面显隐后触发加载完成（一次性）
  const onAnimationEnd = () => {
    if (!emitted && state.imgLoadStatus) {
      emitted = true;
      props.onLoadComplete?.();
    }
  };

  return (
    <div classList={{ cover: true, show: state.backgroundShow }}>
      <img
        ref={imgEl}
        src={bgUrl()}
        class="bg"
        alt="cover"
        fetchpriority="high"
        decoding="async"
        style={{ display: showImg() ? "" : "none" }}
        onLoad={imgLoadComplete}
        onError={imgLoadError}
        onAnimationEnd={onAnimationEnd}
      />
      <div classList={{ gray: true, hidden: state.backgroundShow }} />
      <Show when={state.backgroundShow && state.coverType !== "3"}>
        <a class="down" href={bgUrl()} target="_blank">
          下载壁纸
        </a>
      </Show>
    </div>
  );
}
