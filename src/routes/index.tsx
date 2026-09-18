import {createSignal, onCleanup, onMount, Show} from "solid-js";
import { Title } from "@solidjs/meta";
import { state, setState } from "~/store";
import { toast } from "~/components/ui/Toast";
import { Icon } from "~/assets/icons";
import { Loading } from "~/components/Loading";
import { Background } from "~/components/Background";
import { Message } from "~/components/Message";
import { SocialLinks } from "~/components/SocialLinks";
import { Hitokoto } from "~/components/Hitokoto";
import { Music } from "~/components/Music";
import { Weather } from "~/components/Weather";
import { Links } from "~/components/Links";
import { Footer } from "~/components/Footer";
import { Box } from "~/components/Box";
import { MoreSet } from "~/components/MoreSet";
import { cursorInit } from "~/utils/cursor";
import debounce from "~/utils/debounce";
import { getClockText, helloText, checkDays } from "~/utils/time";
import { initPlayer, togglePlay } from "~/player";
import { version, github } from "~/meta";

export default function Home() {
  const [clock, setClock] = createSignal(getClockText());

  const handleResize = () => {
    setState({ innerWidth: window.innerWidth });
    if (window.innerWidth < 721) {
      setState({ mobileOpenState: false, boxOpenState: false, setOpenState: false, mobileFuncState: false });
    }
  };
  const onResize = () => debounce(handleResize, 200); // 防抖，避免拖拽窗口时高频重渲

  onMount(() => {
    // 自定义鼠标
    cursorInit();
    // 禁右键
    document.oncontextmenu = (): boolean => {
      toast("为了浏览体验，本站禁用右键", { duration: 2000 });
      return false;
    };
    // 中键切换壁纸展示
    window.addEventListener("mousedown", (event) => {
      if (event.button === 1) {
        setState({ backgroundShow: !state.backgroundShow });
        toast(state.backgroundShow ? "已开启壁纸展示状态" : "已退出壁纸展示状态");
      }
    });
    handleResize();
    window.addEventListener("resize", onResize);
    // 初始化播放器音频（歌单懒加载：首次播放时再 fetch）
    initPlayer();
    // 时钟
    const t = setInterval(() => setClock(getClockText()), 1000);
    // 空格播放/暂停
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && state.musicIsOk) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    // 控制台彩蛋
    console.info(`%c${import.meta.env.VITE_SITE_NAME}`, "font-size:20px;color:rgb(244,167,89);");
    console.info(`版本: ${version}  主页: https://github.com/${github}`);

    onCleanup(() => {
      clearInterval(t);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    });
  });

  const onLoadComplete = () => {
    toast(`<strong>${helloText()}</strong> 欢迎来到我的主页`, { duration: 2500 });
    const day = checkDays();
    if (day) toast(`今天是${day}`, { duration: 8000 });
  };

  const c = () => clock();

  return (
    <>
      <Title>{import.meta.env.VITE_SITE_NAME}</Title>
      <Loading />
      <Background onLoadComplete={onLoadComplete} />

      <Show when={state.imgLoadStatus}>
        <main id="main">
          <div class="container" classList={{ hidden: state.backgroundShow }}>
            <section class="all">
              {/* 左栏 */}
              <div classList={{ left: true, hidden: state.mobileOpenState }}>
                <Message />
                <SocialLinks />
              </div>
              {/* 右栏（盒子关闭时显示） */}
              <Show when={!state.boxOpenState}>
                <div classList={{ right: true, hidden: !state.mobileOpenState && state.innerWidth !== null && state.innerWidth < 721 }}>
                  <div class="func">
                    <div class="func__col">
                      <Hitokoto />
                      <Music />
                    </div>
                    <div class="func__col">
                      <div class="time cards">
                        <div class="date">
                          <span>{c().date} 年&nbsp;</span>
                          <span>{c().month} 月&nbsp;</span>
                          <span>{c().day} 日&nbsp;</span>
                          <span class="sm-hidden">{c().weekday}</span>
                        </div>
                        <div class="text">{c().hour}:{c().minute}:{c().second}</div>
                        <Weather />
                      </div>
                    </div>
                  </div>
                  <Links />
                </div>
              </Show>
              {/* 盒子（开启时替换右栏） */}
              <Show when={state.boxOpenState}>
                <Box />
              </Show>
            </section>
          </div>

          {/* 设置弹层 */}
          <Show when={state.setOpenState}>
            <section class="more" onClick={() => setState({ setOpenState: false })}>
              <MoreSet />
            </section>
          </Show>

          {/* 移动端菜单按钮 */}
          <button
            type="button"
            class="menu"
            classList={{ hidden: state.backgroundShow }}
            onClick={() => setState({ mobileOpenState: !state.mobileOpenState })}
          >
            <Icon name={state.mobileOpenState ? "close-small" : "hamburger"} size={24} />
          </button>
        </main>
      </Show>

      <Show when={!state.setOpenState}>
        <Footer />
      </Show>
    </>
  );
}