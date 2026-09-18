import { Show, splitProps, type JSX } from "solid-js";

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: JSX.Element;
}

/** 纯 CSS 卡片（替代 el-card）：头部标题 + 正文区 */
export function Card(props: CardProps) {
  const [local, rest] = splitProps(props, ["title", "children"]);
  return (
    <div class="ui-card" {...rest}>
      <Show when={local.title}>
        <div class="ui-card__header">
          <span>{local.title}</span>
        </div>
      </Show>
      <div class="ui-card__body">{local.children}</div>
    </div>
  );
}