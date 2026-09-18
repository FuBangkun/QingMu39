/** 站点 Logo 大标题（原 Right/MoreSet 里的 .logo），优先取 VITE_SITE_URL，空则退回站点名 */
const site = (): string =>
  (import.meta.env.VITE_SITE_URL as string) ||
  (import.meta.env.VITE_SITE_NAME as string) ||
  "qingmu39";

export function Logo() {
  const parts = (): Array<{ main: string; dot?: string }> => {
    const host = site().replace(/^https?:\/\//, "").replace(/\/+$/, "");
    const [first, ...rest] = host.split(".");
    return [{ main: first, dot: rest.join(".") || undefined }];
  };

  const segs = parts();
  return (
    <div class="logo text-hidden">
      <span class="bg">{segs[0].main}</span>
      {segs[0].dot ? <span class="sm">.{segs[0].dot}</span> : null}
    </div>
  );
}