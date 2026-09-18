// 自定义鼠标：跟随白色圆点 + 隐藏系统光标
// 由主页根组件在 onMount 时调用；所有 API 均为仅浏览器端

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

interface Pos {
  x: number;
  y: number;
}

let cursorEl: HTMLDivElement | null = null;
let posCurr: Pos | null = null;
let posPrev: Pos | null = null;
// 仅作为 requestAnimationFrame 循环句柄持有；eslint 会把"只写不读"变量误判为未使用
let rafId = 0; // eslint-disable-line @typescript-eslint/no-unused-vars

function move(left: number, top: number) {
  if (!cursorEl) return;
  cursorEl.style.left = `${left}px`;
  cursorEl.style.top = `${top}px`;
}

function render() {
  if (posPrev && posCurr) {
    posPrev.x = lerp(posPrev.x, posCurr.x, 0.35);
    posPrev.y = lerp(posPrev.y, posCurr.y, 0.35);
    move(posPrev.x, posPrev.y);
  } else {
    posPrev = posCurr ? { ...posCurr } : null;
  }
  rafId = requestAnimationFrame(render);
}

function create() {
  // 把系统光标替换成白色小圆（SVG data-uri），与原始项目一致
  const style = document.createElement("style");
  style.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='white' /></svg>") 4 4, auto !important}`;
  document.head.appendChild(style);
  cursorEl = document.createElement("div");
  cursorEl.id = "cursor";
  document.body.appendChild(cursorEl);
}

function init() {
  document.onmousemove = (e: MouseEvent) => {
    const x = e.clientX - 9;
    const y = e.clientY - 9;
    if (!posCurr) move(x, y);
    posCurr = { x, y };
    cursorEl?.classList.remove("hidden");
  };
  document.onmouseleave = () => cursorEl?.classList.add("hidden");
  document.onmouseenter = () => cursorEl?.classList.remove("hidden");
  document.onmousedown = () => cursorEl?.classList.add("active");
  document.onmouseup = () => cursorEl?.classList.remove("active");
}

export const cursorInit = (): void => {
  if (typeof document === "undefined") return;
  create();
  init();
  render();
};