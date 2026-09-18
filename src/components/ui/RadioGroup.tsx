import { For, createSignal, splitProps, type JSX } from "solid-js";

export interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  size?: "small" | "large";
}

/** 纯 CSS 单选按钮组（替代 el-radio-group） */
export function RadioGroup(props: RadioGroupProps) {
  const [local, rest] = splitProps(props, ["value", "options", "onChange", "size"]);
  return (
    <div class="ui-radio-group" classList={{ "ui-radio-group--small": local.size === "small" }} {...rest}>
      <For each={local.options}>
        {(opt) => {
          const active = () => local.value === opt.value;
          return (
            <button
              type="button"
              class="ui-radio"
              classList={{ "ui-radio--on": active() }}
              onClick={() => local.onChange(opt.value)}
            >
              <span class="ui-radio__inner" />
              <span class="ui-radio__label">{opt.label}</span>
            </button>
          );
        }}
      </For>
    </div>
  );
}

/** 单选按钮组（受控）组合：返回选中项 value 的简单包装，供非受控使用 */
export function useRadio(initial: string) {
  const [value, setValue] = createSignal(initial);
  return { value, setValue };
}