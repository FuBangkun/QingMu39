import { Show, For, createSignal, createEffect, onCleanup } from "solid-js";
import { state, setState } from "~/store";
import { Icon } from "~/assets/icons";
import { Slider } from "~/components/ui/Slider";
import { togglePlay, playNext, playPrev, jumpTo, setVolume, loadMusic } from "~/player";

/** 音乐控制面板 + 播放列表弹窗 */
export function Music() {
  const [volumeHover, setVolumeHover] = createSignal(false);
  const [listShow, setListShow] = createSignal(false);
  const [nameScrolling, setNameScrolling] = createSignal(false);
  let nameEl: HTMLDivElement | undefined;

  // 有真实歌名即开启跑马灯（空闲"未播放音乐"不滚），transform 动画不占布局、不会撑宽卡片
  createEffect(() => {
    const title = state.playerTitle;
    const id = requestAnimationFrame(() => {
      if (!title || title === "未播放音乐" || !nameEl) {
        setNameScrolling(false);
        return;
      }
      setNameScrolling(true);
    });
    onCleanup(() => cancelAnimationFrame(id));
  });

  const displayText = () =>
    state.playerTitle ? `${state.playerTitle} - ${state.playerArtist}` : "未播放音乐";

  const volumeIcon = () =>
    state.musicVolume === 0
      ? "volume-mute"
      : state.musicVolume < 0.7
        ? "volume-small"
        : "volume-notice";

  const openList = async () => {
    if (!state.musicIsOk) await loadMusic();
    setListShow(true);
  };

  return (
    <Show when={state.musicOpenState}>
      <div
        class="music"
        onMouseEnter={() => setVolumeHover(true)}
        onMouseLeave={() => setVolumeHover(false)}
      >
        <div class="btns">
          <span onClick={openList}>音乐列表</span>
          <span onClick={() => setState({ musicOpenState: false })}>回到一言</span>
        </div>
        <div class="control">
          <button class="ctrl" onClick={() => playPrev()}>
            <Icon name="go-start" size={30} />
          </button>
          <button class="ctrl ctrl--state" onClick={togglePlay}>
            <Icon name={state.playerState ? "pause" : "play"} size={46} />
          </button>
          <button class="ctrl" onClick={() => playNext()}>
            <Icon name="go-end" size={30} />
          </button>
        </div>
        <div class="music-menu">
          <Show when={!volumeHover()}>
            <div class="name" ref={nameEl} classList={{ scrolling: nameScrolling() }}>
              <Show
                when={nameScrolling()}
                fallback={<span>{displayText()}</span>}
              >
                <span class="name__track"
                  ><span aria-hidden="true">{displayText()}</span><span aria-hidden="true">{displayText()}</span></span
                >
              </Show>
            </div>
          </Show>
          <Show when={volumeHover()}>
            <div class="volume">
              <div class="icon">
                <Icon name={volumeIcon()} size={24} />
              </div>
              <Slider
                value={state.musicVolume || 0.7}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) => setVolume(v)}
              />
            </div>
          </Show>
        </div>
      </div>

      {/* 播放列表弹窗 */}
      <Show when={listShow()}>
        <div class="music-list" onClick={() => setListShow(false)}>
          <div class="list" onClick={(e) => e.stopPropagation()}>
            <span class="close" onClick={() => setListShow(false)}>
              <Icon name="close" size={24} />
            </span>
            {/* 播放条：标题/歌手 + 实时歌词（对齐 home-dev 的 aplayer 头部） */}
            <div class="playlist-bar">
              <div class="playlist-bar__music">
                <span class="playlist-bar__title">
                  {state.playerTitle ? `${state.playerTitle} - ${state.playerArtist}` : "未播放音乐"}
                </span>
              </div>
              <div class="playlist-bar__lrc">{state.playerLrc}</div>
            </div>
            <div class="playlist">
              <h4 class="playlist__title">播放列表</h4>
              <ul>
                <For each={state.playList}>
                  {(track, i) => (
                    <li
                      classList={{ "playlist__item--active": i() === state.playIndex }}
                      onClick={() => {
                        jumpTo(i());
                        setListShow(false);
                      }}
                    >
                      <span class="playlist__num">{i() + 1}</span>
                      <span class="playlist__name">{track.name}</span>
                      <span class="playlist__artist">{track.artist}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </div>
        </div>
      </Show>
    </Show>
  );
}