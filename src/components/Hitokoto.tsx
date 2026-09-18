import { createSignal, onMount } from "solid-js";
import { hitokotoList } from "~/assets/hitokoto";
import { state, setState } from "~/store";
import { Icon } from "~/assets/icons";
import debounce from "~/utils/debounce";

/** 一言卡片：本地词库随机 + 点击刷新；悬停可打开音乐面板（对齐 home-dev） */
export function Hitokoto() {
  const [text, setText] = createSignal("这里应该显示一句话");
  const [from, setFrom] = createSignal("清沐");
  const [openHover, setOpenHover] = createSignal(false);

  const pickOne = () =>
    hitokotoList[Math.floor(Math.random() * hitokotoList.length)] || {
      text: "这里应该显示一句话",
      from: "清沐",
    };

  const refresh = () => {
    debounce(() => {
      const item = pickOne();
      setText(item.text);
      setFrom(item.from);
    }, 500);
  };

  onMount(() => {
    const item = pickOne();
    setText(item.text);
    setFrom(item.from);
  });

  return (
    <div
      class="hitokoto cards"
      style={{ display: state.musicOpenState ? "none" : "" }}
      onMouseEnter={() => setOpenHover(true)}
      onMouseLeave={() => setOpenHover(false)}
    >
      {/* 打开音乐面板（对齐 home-dev） */}
      <div class="open-music" classList={{ "open-music--show": openHover() }} onClick={() => setState({ musicOpenState: true })}>
        <Icon name="music-menu" size={18} />
        <span>打开音乐播放器</span>
      </div>
      {/* 一言内容 */}
      <div class="content" onClick={refresh}>
        <span class="text">{text()}</span>
        <span class="from">-「 {from()} 」</span>
      </div>
    </div>
  );
}