import { For, createSignal } from "solid-js";
import socialLinks from "~/assets/socialLinks.json";

/** 解析图标路径：绝对 URL 或以 / 开头时拼 BASE_URL（兼容子路径部署） */
const resolveIcon = (icon: string): string => {
  if (!icon) return icon;
  if (/^https?:\/\//.test(icon)) return icon;
  if (icon.startsWith("/")) return import.meta.env.BASE_URL.replace(/\/+$/, "") + icon;
  return icon;
};

/** 社交链接行 */
export function SocialLinks() {
  const [tipText, setTipText] = createSignal("通过这里联系我吧");
  return (
    <div class="social">
      <div class="link">
        <For each={socialLinks}>
          {(item) => (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              class="social-link"
              data-tip={item.tip}
              onMouseEnter={() => setTipText(item.tip)}
              onMouseLeave={() => setTipText("通过这里联系我吧")}
            >
              <img class="icon" src={resolveIcon(item.icon)} height="24" alt={item.name} />
            </a>
          )}
        </For>
      </div>
      <span class="tip">{tipText()}</span>
    </div>
  );
}