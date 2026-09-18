import { state } from "~/store";

/** 加载动画：壁纸加载完成后整屏淡出收起 */
export function Loading() {
  return (
    <div id="loader-wrapper" classList={{ loaded: state.imgLoadStatus }}>
      <div class="loader">
        <div class="loader-circle" />
        <div class="loader-text">
          <span class="name">{import.meta.env.VITE_SITE_NAME}</span>
          <span class="tip">加载中</span>
        </div>
      </div>
      <div class="loader-section section-left" />
      <div class="loader-section section-right" />
    </div>
  );
}