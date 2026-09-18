/** 防抖：在 wait 时间内重复调用只执行最后一次 */
let timeout: ReturnType<typeof setTimeout> | null = null;

export default function debounce(
  func: (...args: never[]) => void,
  wait = 300,
  immediate = false,
) {
  if (timeout !== null) clearTimeout(timeout);
  if (immediate) {
    const callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow) func();
  } else {
    timeout = setTimeout(func, wait);
  }
}