import { Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { state, setState } from "~/store";
import { Icon } from "~/assets/icons";
import { toast } from "~/components/ui/Toast";

const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
const siteTitle = import.meta.env.VITE_SITE_URL || import.meta.env.VITE_SITE_NAME || "qingmu39";

/** 主界面左栏：头像 + 简介卡片（桌面端点击开启「盒子」） */
export function Message() {
  const desc = () =>
    state.boxOpenState
      ? import.meta.env.VITE_DESC_HELLO_OTHER || "Welcome ~"
      : import.meta.env.VITE_DESC_HELLO || "Welcome ~";
  const sub = () =>
    state.boxOpenState ? import.meta.env.VITE_DESC_TEXT_OTHER : import.meta.env.VITE_DESC_TEXT;

  // 文案变化时用于触发过渡（等价于旧版 :key="hello + text"）
  const descKey = () => `${desc()}|${sub()}`;

  const onToggleBox = () => {
    if (state.innerWidth !== null && state.innerWidth >= 721) {
      setState({ boxOpenState: !state.boxOpenState });
    } else {
      toast("当前页面宽度不足以开启盒子", { duration: 2000 });
    }
  };

  return (
    <div class="message">
      <div class="logo">
        <img class="logo-img" src={siteLogo} alt="logo" />
        <div classList={{ name: true, "text-hidden": true, long: siteTitle.length >= 6 }}>
          <span class="bg">{siteTitle}</span>
        </div>
      </div>
      <div class="description cards" onClick={onToggleBox}>
        <div class="content">
          <Icon name="quote" size={16} />
          {/* 文案切换过渡：与旧版一致的 fade（淡出淡入 + 轻微模糊） */}
          <Transition name="fade" mode="out-in">
            <Show when={descKey()} keyed>
              {() => (
                <div class="text">
                  <p>{desc()}</p>
                  <p>{sub()}</p>
                </div>
              )}
            </Show>
          </Transition>
          <span class="quote-right">
            <Icon name="quote-right" size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
