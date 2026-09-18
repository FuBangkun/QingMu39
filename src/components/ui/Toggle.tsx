import { splitProps, type JSX } from "solid-js";
import { Icon } from "~/assets/icons";

interface ToggleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** 纯 CSS 开关（替代 el-switch） */
export function Toggle(props: ToggleProps) {
  const [local, rest] = splitProps(props, ["checked", "onChange"]);
  return (
    <div
      class={`ui-toggle${local.checked ? " ui-toggle--on" : ""}`}
      role="switch"
      aria-checked={local.checked}
      onClick={() => local.onChange(!local.checked)}
      {...rest}
    >
      <span class="ui-toggle__core">
        <span class="ui-toggle__thumb">
          <Icon
            name={local.checked ? "check" : "close-small"}
            size={12}
            color={local.checked ? "#564d59" : "#efefef"}
          />
        </span>
      </span>
    </div>
  );
}