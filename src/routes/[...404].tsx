import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

/** 404 页面（替换 SolidStart 脚手架默认文案） */
export default function NotFound() {
  return (
    <main class="not-found">
      <Title>404 · 页面走丢了</Title>
      <HttpStatusCode code={404} />
      <div class="not-found__card cards">
        <h1>404</h1>
        <p class="not-found__title">页面走丢了……</p>
        <p class="not-found__desc">
          这里没有你要找的内容，可能是地址输错了，或者页面已经被移走了。
        </p>
        <a class="not-found__home" href="/">
          返回首页
        </a>
      </div>
    </main>
  );
}
