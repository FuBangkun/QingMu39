import { For, createSignal } from "solid-js";

/** 可选图标：remind=感叹号（默认提示）、check=对勾、close=叉 */
export type ToastIcon = "remind" | "check" | "close";

export interface ToastItem {
  id: number;
  message: string;
  type: "default" | "success" | "error" | "info";
  duration: number;
  icon?: ToastIcon;
}

const [toasts, setToasts] = createSignal<ToastItem[]>([]);
let seq = 0;

/** 全局消息提示（替代 ElMessage）。time.ts 及所有组件直接调用。 */
export function toast(
  message: string,
  opts?: Partial<Pick<ToastItem, "type" | "duration" | "icon">>,
): void {
  const id = ++seq;
  const duration = opts?.duration ?? 2500;
  setToasts((list) => [
    ...list,
    { id, message, type: opts?.type ?? "default", duration, icon: opts?.icon },
  ]);
  window.setTimeout(() => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, duration);
}

/** 解析每条消息的图标：显式指定优先，否则按类型给默认图标（普通提示统一为感叹号） */
function resolveIcon(item: ToastItem): { glyph: string; cls: string } {
  if (item.icon === "remind") return { glyph: "!", cls: "toast__icon toast__icon--remind" };
  if (item.icon === "check") return { glyph: "✓", cls: "toast__icon toast__icon--check" };
  if (item.icon === "close") return { glyph: "✕", cls: "toast__icon toast__icon--close" };
  if (item.type === "success") return { glyph: "✓", cls: "toast__icon toast__icon--check" };
  if (item.type === "error") return { glyph: "✕", cls: "toast__icon toast__icon--close" };
  // default / info：与旧版一致，普通提示带感叹号
  return { glyph: "!", cls: "toast__icon toast__icon--remind" };
}

/** 挂载一次到全局（app.tsx）。渲染所有消息。 */
export function ToastContainer() {
  return (
    <div class="toast-container">
      <For each={toasts()}>
        {(item) => {
          const ic = resolveIcon(item);
          return (
            <div class={`toast toast--${item.type}`} role="status">
              <span class={ic.cls} data-type={item.type}>
                {ic.glyph}
              </span>
              {/* 消息来自站内文案，支持 <strong> 等富文本；无外部输入 */}
              {/* eslint-disable-next-line solid/no-innerhtml */}
              <span class="toast__content" innerHTML={item.message} />
            </div>
          );
        }}
      </For>
    </div>
  );
}