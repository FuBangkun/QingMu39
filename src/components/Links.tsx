import { Show, For, createSignal, onMount } from "solid-js";
import siteLinks from "~/assets/siteLinks.json";
import { Icon, type IconName } from "~/assets/icons";
import { state } from "~/store";
import { togglePlay } from "~/player";

// 站点链接图标映射（siteLinks.json 里的 icon 名 → 本地图标）
const iconAlias: Record<string, IconName> = {
  Book: "book",
  Blog: "blog",
  Cloud: "cloud",
  CompactDisc: "compact-disc",
  Compass: "compass",
  Fire: "fire",
  LaptopCode: "laptop-code",
  Heart: "heart",
  Qrcode: "qrcode",
  Link: "link",
};

const PAGE_SIZE = 6;

/** 站点链接条目（带 donate 字段时：点击弹出赞赏码，而不是跳转外链） */
type SiteLinkItem = { icon: string; name: string; link: string; donate?: string };
const linkList = siteLinks as SiteLinkItem[];

/** public 资源路径（兼容 GitHub Pages 子路径部署） */
const asset = (path: string) =>
  /^https?:\/\//.test(path)
    ? path
    : import.meta.env.BASE_URL.replace(/\/+$/, "") + "/" + path.replace(/^\/+/, "");

/** 网站链接列表：手写分页（每页 6 个），替代 Swiper */
export function Links() {
  const [page, setPage] = createSignal(0);
  /** 赞赏码弹层（null = 关闭） */
  const [donateSrc, setDonateSrc] = createSignal<string | null>(null);
  let pressX = 0;

  const pages = () => {
    const out: SiteLinkItem[] = [];
    for (let i = 0; i < linkList.length; i += PAGE_SIZE) {
      out.push(linkList.slice(i, i + PAGE_SIZE));
    }
    return out;
  };

  const current = () => pages()[page()] || [];

  const jump = (item: SiteLinkItem) => {
    // 赞赏码条目：弹出二维码弹层
    if (item.donate) {
      setDonateSrc(asset(item.donate));
      return;
    }
    if (item.name === "音乐" && state.musicClick) {
      togglePlay();
    } else {
      window.open(item.link, "_blank");
    }
  };

  // 左右拖拽翻页
  const onDragStart = (e: MouseEvent | TouchEvent) => {
    pressX =
      "clientX" in e ? e.clientX : (e as TouchEvent).touches[0]?.clientX ?? 0;
  };
  const onDragEnd = (e: MouseEvent | TouchEvent) => {
    const endX =
      "clientX" in e ? e.clientX : (e as TouchEvent).changedTouches[0]?.clientX ?? pressX;
    const delta = endX - pressX;
    if (delta < -60) {
      setPage((page() + 1) % Math.max(pages().length, 1));
    } else if (delta > 60) {
      setPage((page() - 1 + Math.max(pages().length, 1)) % Math.max(pages().length, 1));
    }
  };

  onMount(() => console.log(linkList));

  return (
    <div class="links">
      <div class="line">
        <Icon name="link" size={20} />
        <span class="title">网站列表</span>
      </div>

      <Show when={current().length}>
        <div
          class="link-grid"
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
          onMouseUp={onDragEnd}
          onTouchEnd={onDragEnd}
        >
          <For each={current()}>
            {(item, i) => (
              <div
                class="item cards"
                style={{ "margin-bottom": i() < 3 ? "20px" : "0" }}
                onClick={() => jump(item)}
              >
                <Icon name={iconAlias[item.icon] || "link"} size={26} />
                <span class="name text-hidden">{item.name}</span>
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* 分页指示器 */}
      <Show when={pages().length > 1}>
        <div class="pager">
          <For each={pages()}>
            {(_, i) => (
              <span
                class="pager__dot"
                classList={{ "pager__dot--active": i() === page() }}
                onClick={() => setPage(i())}
              />
            )}
          </For>
        </div>
      </Show>

      {/* 赞赏码弹层 */}
      <Show when={donateSrc()}>
        <div class="donate" onClick={() => setDonateSrc(null)}>
          <div class="donate__card" onClick={(e) => e.stopPropagation()}>
            <span
              class="donate__close"
              onClick={() => setDonateSrc(null)}
              aria-label="关闭"
            >
              <Icon name="close" size={22} />
            </span>
            <p class="donate__title">赞助我吧！</p>
            <img class="donate__qr" src={donateSrc() ?? ""} alt="赞赏码" />
            <p class="donate__tip">请我喝杯奶茶，支持这个小站继续更新 ❤</p>
          </div>
        </div>
      </Show>
    </div>
  );
}