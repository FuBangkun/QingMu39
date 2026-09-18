import { createSignal, For, Show } from "solid-js";
import { setState } from "~/store";
import { Icon } from "~/assets/icons";
import { Logo } from "~/components/Logo";
import { Set } from "~/components/Set";
import { version, github } from "~/meta";
import { changelog } from "~/changelog";

/** 设置弹层内容（原 MoreSet/index.vue 的 .set） */
export function MoreSet() {
  const [closeShow, setCloseShow] = createSignal(false);

  return (
    <div
      class="set"
      onMouseEnter={() => setCloseShow(true)}
      onMouseLeave={() => setCloseShow(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <Show when={closeShow()}>
        <span
          class="set-close"
          onClick={() => setState({ setOpenState: false })}
          aria-label="关闭设置"
        >
          <Icon name="close" size={28} />
        </span>
      </Show>

      <div class="set-col set-col--left">
        <Logo />
        <div class="version">
          <div class="num">v&nbsp;{version}</div>
          <a
            class="github"
            href={`https://github.com/${github}`}
            target="_blank"
            aria-label="Github 源代码仓库"
          >
            <Icon name="github" size={24} />
          </a>
        </div>

        {/* 更新日志（原 Vue 版 MoreSet 的卡片，重构时遗漏，现已补回） */}
        <div class="update">
          <div class="update__header">
            <span>更新日志</span>
          </div>
          <div class="upnote">
            <For each={changelog.added}>
              {(item) => (
                <div class="uptext">
                  <Icon name="add" size={22} />
                  <span>{item}</span>
                </div>
              )}
            </For>
            <For each={changelog.fixed}>
              {(item) => (
                <div class="uptext">
                  <Icon name="bug" size={22} />
                  <span>{item}</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>

      <div class="set-col set-col--right">
        <div class="right-title">
          <Icon name="setting" size={28} />
          <span class="name">全局设置</span>
        </div>
        <Set />
      </div>
    </div>
  );
}