import { createSignal, Show } from "solid-js";
import { setState } from "~/store";
import { Icon } from "~/assets/icons";
import { TimeCapsule } from "~/components/TimeCapsule";
import { MoreContent } from "~/components/MoreContent";

/** 「盒子」面板（展示在右栏位置，hover 显示关闭/设置按钮） */
export function Box() {
  const [closeShow, setCloseShow] = createSignal(false);

  return (
    <div
      class="box cards"
      onMouseEnter={() => setCloseShow(true)}
      onMouseLeave={() => setCloseShow(false)}
    >
      <Show when={closeShow()}>
        <span class="box-btn" onClick={() => setState({ boxOpenState: false })} aria-label="关闭">
          <Icon name="close" size={28} />
        </span>
        <span class="box-btn box-btn--setting" onClick={() => setState({ setOpenState: true })} aria-label="设置">
          <Icon name="setting" size={28} />
        </span>
      </Show>
      <div class="content">
        <TimeCapsule />
        <MoreContent />
      </div>
    </div>
  );
}