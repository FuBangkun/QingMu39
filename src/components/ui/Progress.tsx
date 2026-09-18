import {JSX, Show, splitProps} from "solid-js";

interface ProgressProps extends JSX.HTMLAttributes<HTMLDivElement> {
  percentage: number | string;
  textInside?: boolean;
  strokeWidth?: number;
  showText?: boolean;
}

/** 纯 CSS 进度条（替代 el-progress）：圆角条 + 内部百分比文字 */
export function Progress(props: ProgressProps) {
  const [local, rest] = splitProps(props, [
    "percentage",
    "textInside",
    "strokeWidth",
    "showText",
  ]);
  const num = () =>
    typeof local.percentage === "number"
      ? local.percentage
      : parseFloat(local.percentage) || 0;
  const show = local.showText ?? true;
  const inside = local.textInside ?? false;

  return (
    <div class="ui-progress" {...rest}>
      <div class="ui-progress__outer" style={{ height: "20px", background: "#00000020" }}>
        <div class="ui-progress__inner" style={{ width: `${num()}%`, background: "#efefef" }}>
          <Show when={show && inside}>
            <span class="ui-progress__text">{num()}%</span>
          </Show>
        </div>
      </div>
    </div>
  );
}