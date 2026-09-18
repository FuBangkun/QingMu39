/** 站点元信息（来自 package.json） */
import pkg from "../package.json";

/** 版本号 */
export const version: string = pkg.version ?? "";
/** GitHub 主页 */
export const github: string =
  (import.meta.env.VITE_SITE_GITHUB as string) ||
  (import.meta.env.VITE_GITHUB as string) ||
  "QingMu39-Gao/home";