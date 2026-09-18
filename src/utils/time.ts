const pad = (n: number) => (n < 10 ? "0" + n : "" + n);

/** 当前时间（含星期） */
export interface CurrentTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekday: string;
  weekText: string;
}

export const WEEKDAYS = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

/** 格式化的时钟字符串（两位） */
export const getClockText = (): { hour: string; minute: string; second: string; date: string; month: string; day: string; weekday: string } => {
  const now = new Date();
  return {
    hour: pad(now.getHours()),
    minute: pad(now.getMinutes()),
    second: pad(now.getSeconds()),
    date: String(now.getFullYear()),
    month: pad(now.getMonth() + 1),
    day: pad(now.getDate()),
    weekday: WEEKDAYS[now.getDay()],
  };
};

/** 当前时间对象 */
export const getCurrentTime = (): CurrentTime => {
  const t = new Date();
  return {
    year: t.getFullYear(),
    month: t.getMonth() + 1,
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes(),
    second: t.getSeconds(),
    weekday: WEEKDAYS[t.getDay()],
    weekText: WEEKDAYS[t.getDay()],
  };
};

/** 时光胶囊单周期数据 */
export interface CapsuleItem {
  name: string;
  total: number;
  passed: number;
  remaining: number;
  percentage: string;
}

/** 时光胶囊：今日/本周/本月/本年进度（原生 Date 实现，替代 dayjs） */
export const getTimeCapsule = (): Record<"day" | "week" | "month" | "year", CapsuleItem> => {
  const now = new Date();
  const dateText = { day: "今日", week: "本周", month: "本月", year: "本年" } as const;

  const startOf = (unit: "day" | "week" | "month" | "year"): Date => {
    const d = new Date(now);
    if (unit === "day") d.setHours(0, 0, 0, 0);
    else if (unit === "week") {
      const day = (d.getDay() + 6) % 7; // 周一起始
      d.setDate(d.getDate() - day);
      d.setHours(0, 0, 0, 0);
    } else if (unit === "month") {
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
    } else if (unit === "year") {
      d.setMonth(0, 1);
      d.setHours(0, 0, 0, 0);
    }
    return d;
  };
  const endOf = (unit: "day" | "week" | "month" | "year"): Date => {
    const d = startOf(unit);
    if (unit === "day") d.setHours(24);
    else if (unit === "week") d.setDate(d.getDate() + 7);
    else if (unit === "month") d.setMonth(d.getMonth() + 1);
    else if (unit === "year") d.setFullYear(d.getFullYear() + 1);
    return d;
  };

  const getDifference = (unit: "day" | "week" | "month" | "year"): CapsuleItem => {
    const start = startOf(unit);
    const end = endOf(unit);
    const isHour = unit === "day";
    const total =
      Math.floor((end.getTime() - start.getTime()) / (isHour ? 3600000 : 86400000)) + 1;
    let passed = Math.floor((now.getTime() - start.getTime()) / (isHour ? 3600000 : 86400000));
    if (unit === "week") passed = (passed + 6) % 7;
    const remaining = total - passed;
    const percentage = (passed / total) * 100;
    return {
      name: dateText[unit],
      total,
      passed,
      remaining,
      percentage: percentage.toFixed(2),
    };
  };

  return {
    day: getDifference("day"),
    week: getDifference("week"),
    month: getDifference("month"),
    year: getDifference("year"),
  };
};

/** 欢迎提示（按时段返回文案） */
export const helloText = (): string => {
  const hour = new Date().getHours();
  if (hour < 6) return "凌晨好";
  if (hour < 9) return "早上好";
  if (hour < 12) return "上午好";
  if (hour < 14) return "中午好";
  if (hour < 17) return "下午好";
  if (hour < 19) return "傍晚好";
  if (hour < 22) return "晚上好";
  return "夜深了";
};

/** 建站日期统计 */
export const siteDateStatistics = (startDate: Date): string => {
  const diffDays = (Date.now() - startDate.getTime()) / 86400000;
  const diffMonths = diffDays / 30;
  const diffYears = diffMonths / 12;
  if (diffYears >= 1) {
    return `本站已经苟活了 ${Math.floor(diffYears)} 年 ${Math.floor(diffMonths % 12)} 月 ${Math.round(
      diffDays % 30,
    )} 天`;
  } else if (diffMonths >= 1) {
    return `本站已经苟活了 ${Math.floor(diffMonths)} 月 ${Math.round(diffDays % 30)} 天`;
  }
  return `本站已经苟活了 ${Math.round(diffDays)} 天`;
};

/** 纪念日（全站灰白 + 提示） */
const anniversaries: Record<string, string> = {
  "4.4": "清明节",
  "5.12": "汶川大地震纪念日",
  "7.7": "中国人民抗日战争纪念日",
  "9.18": "九·一八事变纪念日",
  "12.13": "南京大屠杀死难者国家公祭日",
};

/** 判断今天是否为纪念日，若是则执行置灰并返回名称 */
export const checkDays = (): string | null => {
  if (typeof document === "undefined") return null;
  const now = new Date();
  const key = `${now.getMonth() + 1}.${now.getDate()}`;
  const name = anniversaries[key];
  if (name) {
    const style = document.createElement("style");
    style.textContent = "html{filter: grayscale(100%)}";
    document.head.appendChild(style);
  }
  return name || null;
};