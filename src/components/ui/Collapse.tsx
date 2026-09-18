import {
  Show,
  createContext,
  createSignal,
  useContext,
  splitProps,
  type JSX,
  type Accessor,
} from "solid-js";

interface CollapseContextValue {
  open: Accessor<string | null>;
  setOpen: (name: string | null) => void;
}

const CollapseContext = createContext<CollapseContextValue>();

export interface CollapsePanelProps {
  title: string;
  name: string;
  children?: JSX.Element;
}

/** 单个折叠项：通过 Context 感知自身开合状态 */
export function CollapsePanel(props: CollapsePanelProps) {
  // 默认值防御：即便 useContext 拿到 undefined 也不会抛 "not a function"
  const { open, setOpen } = useContext(CollapseContext) ?? {
    open: () => "",
    setOpen: () => {},
  };
  const active = () => open() === props.name;
  return (
    <div class="ui-collapse-item" classList={{ "ui-collapse-item--active": active() }}>
      <div class="ui-collapse-item__header" onClick={() => setOpen(active() ? null : props.name)}>
        {props.title}
      </div>
      <Show when={active()}>
        <div class="ui-collapse-item__wrap">
          <div class="ui-collapse-item__content">{props.children}</div>
        </div>
      </Show>
    </div>
  );
}

interface CollapseProps extends JSX.HTMLAttributes<HTMLDivElement> {
  accordion?: boolean;
  children?: JSX.Element;
  activeName?: string;
}

/** 纯 CSS 手风琴折叠面板（替代 el-collapse）：默认展示 activeName 对应的面板 */
export function Collapse(props: CollapseProps) {
  const [local, rest] = splitProps(props, ["accordion", "children", "activeName"]);
  const [open, setOpen] = createSignal<string | null>(local.activeName ?? null);

  return (
    <div class="ui-collapse" {...rest}>
      <CollapseContext.Provider value={{ open, setOpen }}>
        {local.children}
      </CollapseContext.Provider>
    </div>
  );
}