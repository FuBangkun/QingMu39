import { state, setState, audio } from "~/store";
import { getPlayerList } from "~/api";
import { toast } from "~/components/ui/Toast";
import type { Track } from "~/store";

const SERVER = import.meta.env.VITE_SONG_SERVER || "netease";
const TYPE = import.meta.env.VITE_SONG_TYPE || "playlist";
const ID = import.meta.env.VITE_SONG_ID || "";

/** 解析 LRC 歌词：返回按时间排序的 [time秒, 行文] 数组 */
function parseLrc(lrc?: string): Array<[number, string]> {
  if (!lrc) return [];
  const lines: string[] = lrc.split(/\r?\n/);
  const out: Array<[number, string]> = [];
  for (const line of lines) {
    const match = line.match(/\[(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))?]\s*(.*)/);
    if (!match) continue;
    const min = parseInt(match[1], 10);
    const sec = parseInt(match[2], 10);
    const ms = parseInt(match[3] || "0", 10);
    const t = min * 60 + sec + ms / 1000;
    out.push([t, match[4]?.trim() || ""]);
  }
  return out.sort((a, b) => a[0] - b[0]);
}

let lrcLines: Array<[number, string]> = [];
let lastLrcIndex = -1;
let loaded = false;
let currentUrl = ""; // 当前 audio 已装载的曲目 url（区别于 playIndex）

/**
 * 解析歌词来源：injahow 等接口返回的 lrc 是「歌词文件的 URL」，需先 fetch 成文本。
 * 纯文本歌词直接使用。
 */
async function resolveLrc(lrc?: string): Promise<string> {
  if (!lrc) return "";
  if (/^https?:\/\//.test(lrc)) {
    try {
      const res = await fetch(lrc);
      return await res.text();
    } catch (e) {
      console.error("歌词加载失败：", e);
      return "";
    }
  }
  return lrc;
}

/** 根据当前播放时间刷新一次歌词显示（供加载歌词后手动触发） */
function syncLrc() {
  if (!audio) return;
  const t = audio.currentTime;
  let idx = -1;
  for (let i = 0; i < lrcLines.length; i++) {
    if (lrcLines[i][0] <= t) idx = i;
    else break;
  }
  lastLrcIndex = idx;
  if (lrcLines.length === 0) {
    setState({ playerLrc: state.playerLrcShow ? "纯音乐，请欣赏" : "歌词加载中" });
  } else if (idx < 0) {
    setState({ playerLrc: "歌词加载中" });
  } else {
    setState({ playerLrc: lrcLines[idx][1] || "…" });
  }
}

/** 装载指定曲目到 audio（设置 src 并异步填充歌词），不负责播放/暂停 */
function applyTrack(track: Track): void {
  if (!audio || !track?.url) return;
  currentUrl = track.url;
  lrcLines = [];
  lastLrcIndex = -1;
  // 同步标题/歌手（jumpTo 与 togglePlay 首次播放都会走这里）
  setState({ playerTitle: track.name, playerArtist: track.artist });
  audio.src = track.url;
  audio.load();
  // 异步解析歌词（URL 或纯文本）
  void resolveLrc(track.lrc).then((text) => {
    if (audio?.src !== currentUrl) return; // 已切歌，丢弃过期结果
    lrcLines = parseLrc(text);
    lastLrcIndex = -1;
    syncLrc();
  });
}

function pickNextIndex(): number {
  const len = state.playList.length;
  if (len === 0) return -1;
  if (state.playerOrder === "random") {
    if (len === 1) return 0;
    let i: number;
    do {
      i = Math.floor(Math.random() * len);
    } while (i === state.playIndex);
    return i;
  }
  return (state.playIndex + 1) % len;
}

/** 切换/播放指定索引的歌曲 */
export function jumpTo(index: number, playImmediately = true): void {
  const len = state.playList.length;
  if (len === 0 || index < 0) return;
  const idx = index % len;
  const track = state.playList[idx];
  if (!audio || !track?.url) return;

  setState({ playIndex: idx, playerTitle: track.name, playerArtist: track.artist, musicIsOk: true });
  applyTrack(track);
  setState({ playerState: playImmediately, playerLrc: "歌词加载中" });
  if (playImmediately) {
    audio.play().catch(() => setState({ playerState: false }));
  }
}

/** 播放/暂停切换（歌单未加载时先懒加载；未装载当前曲目时先装载，避免对空 src 播放） */
export async function togglePlay(): Promise<void> {
  if (!audio) return;
  if (state.playList.length === 0) {
    await loadMusic(); // 首次点击时懒加载歌单
  }
  if (state.playIndex < 0) return;
  const track = state.playList[state.playIndex];
  if (!track?.url) return;
  if (currentUrl !== track.url) applyTrack(track); // 尚无音源，先装曲
  if (state.playerState) {
    audio.pause();
    setState({ playerState: false });
  } else {
    audio.play().catch(() => setState({ playerState: false, playerLrc: "歌词加载中" }));
    setState({ playerState: true });
  }
}

/** 播放当前歌曲（供外部 force） */
export function playCurrent(): void {
  if (!audio || state.playIndex < 0) return;
  audio.play().catch(() => undefined);
  setState({ playerState: true });
}

/** 下一曲 */
export function playNext(): void {
  jumpTo(pickNextIndex());
}

/** 上一曲 */
export function playPrev(): void {
  const len = state.playList.length;
  if (len === 0) return;
  const idx = (state.playIndex - 1 + len) % len;
  jumpTo(idx);
}

/** 设定音量（0-1） */
export function setVolume(v: number): void {
  const vol = Math.min(1, Math.max(0, v));
  setState({ musicVolume: vol });
  if (audio) audio.volume = vol;
}

/** 加载歌单（首次/懒加载） */
export async function loadMusic(): Promise<void> {
  if (loaded && state.playList.length > 0) return;
  if (!ID) return; // 未配置歌单
  try {
    const list = await getPlayerList(SERVER, TYPE, ID);
    if (!list || list.length === 0) throw new Error("歌单为空");
    setState({ playList: list, playIndex: 0, musicIsOk: true });
    loaded = true;
    // 自动播放
    if (state.playerAutoplay) jumpTo(0, true);
  } catch (err) {
    console.error("播放器加载失败：", err);
    setState({ musicIsOk: false });
    toast("播放器加载失败", { type: "error" });
  }
}

/** 初始化音频事件监听（客户端，模块首次导入后调用一次） */
export function initPlayer(): void {
  if (typeof window === "undefined" || !audio || (audio as HTMLAudioElement & { _initialized?: boolean })._initialized) {
    return;
  }
  (audio as HTMLAudioElement & { _initialized?: boolean })._initialized = true;

  audio.volume = state.musicVolume || 0.7;

  audio.addEventListener("play", () => setState({ playerState: true }));
  audio.addEventListener("pause", () => setState({ playerState: false }));

  // 歌词同步
  audio.addEventListener("timeupdate", () => {
    const t = audio.currentTime;
    let idx = -1;
    for (let i = 0; i < lrcLines.length; i++) {
      if (lrcLines[i][0] <= t) idx = i;
      else break;
    }
    if (idx !== lastLrcIndex) {
      lastLrcIndex = idx;
      let lrc: string;
      if (lrcLines.length === 0) {
        lrc = state.playerLrcShow ? "纯音乐，请欣赏" : "歌词加载中";
      } else if (idx < 0) {
        lrc = "歌词加载中";
      } else {
        lrc = lrcLines[idx][1] || "…";
      }
      setState({ playerLrc: lrc });
    }
  });

  // 播放结束 -> 循环处理
  audio.addEventListener("ended", () => {
    if (state.playerLoop === "one") {
      audio.currentTime = 0;
      audio.play().catch(() => undefined);
    } else if (state.playerLoop === "all") {
      playNext();
    } else {
      setState({ playerState: false });
    }
  });

  // 播放错误
  audio.addEventListener("error", () => {
    toast(state.playList.length > 1 ? "播放歌曲出现错误，播放到下一首" : "播放歌曲出现错误", {
      type: "error",
      duration: 2000,
    });
    if (state.playList.length > 1) playNext();
  });
}