import { Show } from "solid-js";
import { state } from "~/store";
import { Icon } from "~/assets/icons";

const fullYear = new Date().getFullYear();
const siteStart = import.meta.env.VITE_SITE_START as string | undefined;
const startYear =
  siteStart && siteStart.length >= 4 ? siteStart.substring(0, 4) : null;
const siteIcp = import.meta.env.VITE_SITE_ICP as string | undefined;
const siteAuthor = import.meta.env.VITE_SITE_AUTHOR as string | undefined;

const siteUrl = () => {
  const url = import.meta.env.VITE_SITE_URL as string | undefined;
  if (!url || !url.includes(".")) return import.meta.env.BASE_URL;
  if (!url.startsWith("http://") && !url.startsWith("https://")) return "//" + url;
  return url;
};

/** 页脚：版权信息（或正在播放的歌词） */
export function Footer() {
  const showLrc = () => state.playerState && state.playerLrcShow;
  const showRange = () => startYear !== null && Number(startYear) < fullYear;

  return (
    <footer id="footer" classList={{ blur: state.footerBlur }}>
      {!showLrc() ? (
        <div class="power">
          <span>
            <span classList={{ "c-hidden": !showRange(), hidden: true }}>Copyright&nbsp;</span>
            &copy;
            <Show when={showRange()}>
              <span class="site-start">{startYear} - </span>
            </Show>
            {fullYear} <a href={siteUrl()}>{siteAuthor}</a>
          </span>
          <Show when={false}>
            <span class="hidden">&amp;&nbsp;Made&nbsp;by&nbsp;imsyy</span>
          </Show>
          <Show when={siteIcp}>
            <span>
              &amp; <a href="https://beian.miit.gov.cn" target="_blank">{siteIcp}</a>
            </span>
          </Show>
        </div>
      ) : (
        <div class="lrc">
          <div class="lrc-all">
            <Icon name="music" size={18} />
            <span class="lrc-text text-hidden">{state.playerLrc}</span>
            <Icon name="music" size={18} />
          </div>
        </div>
      )}
    </footer>
  );
}