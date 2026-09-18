import { onCleanup, splitProps, type JSX } from "solid-js";

interface SliderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

/** 纯 CSS 水平滑杆（替代 el-slider）：点击定位 + 拖动 */
export function Slider(props: SliderProps) {
  const [local, rest] = splitProps(props, ["value", "min", "max", "step", "onChange"]);
  const min = () => local.min ?? 0;
  const max = () => local.max ?? 1;
  const step = () => local.step ?? 0.01;

  let barEl: HTMLDivElement | undefined;

  const clip = (v: number) => Math.min(max(), Math.max(min(), v));

  const setFromClientX = (clientX: number) => {
    const rect = barEl?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const ratio = (clientX - rect.left) / rect.width;
    const raw = min() + ratio * (max() - min());
    // 按 step 取整
    const stepped = Math.round(raw / step()) * step();
    local.onChange(clip(stepped));
  };

  const onDown = (e: MouseEvent) => {
    e.preventDefault();
    setFromClientX(e.clientX);
    const onMove = (ev: MouseEvent) => setFromClientX(ev.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    onCleanup(onUp);
  };

  const percent = () => ((local.value - min()) / (max() - min())) * 100;

  return (
    <div class="ui-slider" {...rest}>
      <div
        ref={barEl}
        class="ui-slider__bar"
        onPointerDown={onDown}
        role="slider"
        aria-valuemin={min()}
        aria-valuemax={max()}
        aria-valuenow={local.value}
      >
        <div class="ui-slider__runway" style={{ background: "#ffffff40" }}>
          <div class="ui-slider__inner" style={{ width: `${percent()}%`, background: "#efefef" }} />
        </div>
        <div class="ui-slider__button" style={{ left: `${percent()}%` }} />
      </div>
    </div>
  );
}