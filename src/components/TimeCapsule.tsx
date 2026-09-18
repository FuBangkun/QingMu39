import { For, Show, createSignal, onCleanup, onMount } from "solid-js";
import { getTimeCapsule, siteDateStatistics } from "~/utils/time";
import { Progress } from "~/components/ui/Progress";
import { Icon } from "~/assets/icons";
import { state } from "~/store";

const startDate = () => import.meta.env.VITE_SITE_START as string | undefined;

/** 时光胶囊：今日/本周/本月/本年进度 + 建站统计 */
export function TimeCapsule() {
  const [data, setData] = createSignal(getTimeCapsule());
  const [startText, setStartText] = createSignal<string>("");
  let timer: number | null = null;

  onMount(() => {
    timer = window.setInterval(() => {
      setData(getTimeCapsule());
      if (startDate()) setStartText(siteDateStatistics(new Date(startDate()!)));
    }, 1000);
  });
  onCleanup(() => {
    if (timer) clearInterval(timer);
  });

  const items = () => [
    data().day,
    data().week,
    data().month,
    data().year,
  ];

  return (
    <div class="time-capsule">
      <div class="title">
        <Icon name="hourglass" size={24} />
        <span>时光胶囊</span>
      </div>
      <For each={items()}>
        {(item) => (
          <div class="capsule-item">
            <div class="item-title">
              <span class="percentage">
                {item.name}已度过 <strong>{item.passed}</strong>{" "}
                {item.name === "今日" ? "小时" : "天"}
              </span>
              <span class="remaining">
                剩余 {item.remaining} {item.name === "今日" ? "小时" : "天"}
              </span>
            </div>
            <Progress percentage={item.percentage} textInside strokeWidth={20} />
          </div>
        )}
      </For>
      <Show when={state.siteStartShow && startText()}>
        <div class="capsule-item start">
          <div class="item-title">{startText()}</div>
        </div>
      </Show>
    </div>
  );
}