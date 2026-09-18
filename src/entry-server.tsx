// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

/**
 * 站点对外地址（用于 og:url / og:image）
 * 换域名或换托管时只改 .env 里的 VITE_SITE_ORIGIN 一处即可
 */
const SITE_ORIGIN =
  (import.meta.env.VITE_SITE_ORIGIN as string | undefined)?.replace(/\/+$/, "") ||
  "https://qingmu39-gao.github.io/home";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="zh-CN">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{import.meta.env.VITE_SITE_NAME || "主页"}</title>
          {/* 站外预览 / 搜索引擎摘要 */}
          <meta name="description" content={import.meta.env.VITE_SITE_DES || ""} />
          <meta name="keywords" content={import.meta.env.VITE_SITE_KEYWORDS || ""} />
          <meta name="author" content={import.meta.env.VITE_SITE_AUTHOR || ""} />
          <meta name="theme-color" content="#424242" />

          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={import.meta.env.VITE_SITE_NAME || "主页"} />
          <meta property="og:title" content={import.meta.env.VITE_SITE_NAME || "主页"} />
          <meta property="og:description" content={import.meta.env.VITE_SITE_DES || ""} />
          <meta property="og:url" content={`${SITE_ORIGIN}/`} />
          <meta property="og:image" content={`${SITE_ORIGIN}/images/icon/share-cover.jpg`} />
          <meta property="og:image:secure_url" content={`${SITE_ORIGIN}/images/icon/share-cover.jpg`} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={import.meta.env.VITE_SITE_NAME || "主页"} />
          <meta property="og:locale" content="zh_CN" />

          {/* 部分平台（X/Twitter、部分 IM）使用 twitter 卡片标签 */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={import.meta.env.VITE_SITE_NAME || "主页"} />
          <meta name="twitter:description" content={import.meta.env.VITE_SITE_DES || ""} />
          <meta name="twitter:image" content={`${SITE_ORIGIN}/images/icon/share-cover.jpg`} />

          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/images/icon/apple-touch-icon.png" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
