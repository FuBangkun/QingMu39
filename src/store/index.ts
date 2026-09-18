import { createStore } from "solid-js/store";
import { createRoot, createEffect } from "solid-js";

/** 单曲结构（由歌曲 API 返回/转换后使用） */
export interface Track {
  name: string;
  artist: string;
  url: string;
  cover?: string;
  lrc?: string;
}

/** 需要持久化到 localStorage 的字段 */
const PERSIST_PATHS = [
  "coverType",
  "musicVolume",
  "siteStartShow",
  "musicClick",
  "playerLrcShow",
  "footerBlur",
  "playerAutoplay",
  "playerLoop",
  "playerOrder",
] as const;

export const PERSIST_KEY = "data";

const DEFAULT_STATE = {
  imgLoadStatus: false, // 壁纸加载状态
  innerWidth: null as number | null, // 当前窗口宽度
  coverType: "0", // 壁纸种类 "0"默认 "1"每日一图 "2"随机风景 "3"随机动漫
  siteStartShow: false, // 建站日期显示
  musicClick: false, // 音乐链接是否直接打开播放器
  musicIsOk: false, // 音乐是否加载完成
  musicVolume: 0, // 音乐音量
  musicOpenState: false, // 音乐面板开启状态
  backgroundShow: false, // 壁纸展示状态
  // —— 单页内视图切换（不持久化）——
  boxOpenState: false, // 盒子开启状态（展示在右栏位置）
  setOpenState: false, // 设置弹层开启状态
  mobileFuncState: false, // 移动端功能区开启状态
  playerState: false, // 当前播放状态（true=播放中）
  playerTitle: null as string | null, // 当前播放歌曲名
  playerArtist: null as string | null, // 当前播放歌手名
  playerLrc: "歌词加载中", // 当前播放歌词
  playerLrcShow: true, // 是否显示底栏歌词
  footerBlur: true, // 底栏模糊
  playerAutoplay: false, // 是否自动播放
  playerLoop: "all", // 循环模式 "all" | "one" | "none"
  playerOrder: "list", // 播放顺序 "list" | "random"
  // —— 播放列表状态（跨路由共享，不持久化）——
  playList: [] as Track[], // 歌曲播放列表
  playIndex: -1, // 当前播放索引
};

type State = typeof DEFAULT_STATE;

/** 从 localStorage 读取已保存设置 */
function loadPersisted(): Partial<State> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PERSIST_KEY);
    if (raw) return JSON.parse(raw) as Partial<State>;
  } catch (e) {
    console.error("读取本地存储失败：", e);
  }
  return {};
}

/** 全局状态。所有组件共享单例（模块级），路由切换不丢失。 */
export const [state, setState] = createStore<State>({
  ...DEFAULT_STATE,
  ...loadPersisted(),
});

// —— 音频单例（浏览器环境创建；SSR 下为 null）——
export const audio: HTMLAudioElement | null =
  typeof window !== "undefined" ? new Audio() : null;

if (audio) {
  audio.preload = "metadata";
}

// —— 持久化：仅保存配置字段，客户端写入 localStorage ——
if (typeof window !== "undefined") {
  createRoot(() =>
    createEffect(() => {
      const toPersist: Record<string, unknown> = {};
      for (const key of PERSIST_PATHS) {
        toPersist[key] = (state as unknown as Record<string, unknown>)[key];
      }
      try {
        window.localStorage.setItem(PERSIST_KEY, JSON.stringify(toPersist));
      } catch (e) {
        console.error("写入本地存储失败：", e);
      }
    }),
  );
}