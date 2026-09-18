import { createSignal, onMount } from "solid-js";
import {
  getAdcode,
  getRegeo,
  getWeather,
  getGeoWeather,
} from "~/api";
import { toast } from "~/components/ui/Toast";

const mainKey = import.meta.env.VITE_WEATHER_KEY;

const [city, setCity] = createSignal<string>("");
const [wx, setWx] = createSignal({
  weather: "",
  temperature: "",
  winddirection: "",
  windpower: "",
});

// WMO 天气代码 -> 中文
const weatherCodeMap: Record<number, string> = {
  0: "晴", 1: "大致晴朗", 2: "多云", 3: "阴", 45: "雾", 48: "雾凇",
  51: "毛毛雨", 53: "毛毛雨", 55: "毛毛雨", 56: "冻毛毛雨", 57: "冻毛毛雨",
  61: "小雨", 63: "中雨", 65: "大雨", 66: "冻雨", 67: "冻雨",
  71: "小雪", 73: "中雪", 75: "大雪", 77: "雪粒", 80: "阵雨", 81: "阵雨",
  82: "强阵雨", 85: "阵雪", 86: "强阵雪", 95: "雷阵雨", 96: "雷阵雨伴冰雹", 99: "强雷暴伴冰雹",
};

const windDirMap = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"];

const beaufort = (kmh: number): number => {
  const bounds = [2, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
  let level = 0;
  for (let i = 0; i < bounds.length; i++) if (kmh >= bounds[i]) level = i + 1;
  return level;
};

// 免 Key 备用：IP 定位 + Open-Meteo（原 getOtherWeather 证书失效，已移除）数据
const parseGeoWeather = (data: { city: string; current_weather: { weathercode: number; temperature: number; winddirection: number; windspeed: number } }) => {
  const idx = Math.round(data.current_weather.winddirection / 45) % 8;
  return {
    city: data.city,
    weather: {
      weather: weatherCodeMap[data.current_weather.weathercode] || "未知",
      temperature: String(Math.round(data.current_weather.temperature)),
      winddirection: windDirMap[idx] + "风",
      windpower: String(beaufort(data.current_weather.windspeed)),
    },
  };
};

// 免 Key 备用：IP 定位 + Open-Meteo（原 getOtherWeather 证书失效，已移除）
const applyFallback = async (): Promise<void> => {
  const geo = await getGeoWeather();
  const parsed = parseGeoWeather(geo);
  setCity(parsed.city);
  setWx(parsed.weather);
};

const getBrowserLocation = (): Promise<{ lng: number; lat: number } | null> =>
  new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lng: pos.coords.longitude, lat: pos.coords.latitude }),
      () => resolve(null),
      { timeout: 6000, maximumAge: 10 * 60 * 1000 },
    );
  });

const locateCity = async (key: string): Promise<{ adcode: string; city: string | null }> => {
  const manual = import.meta.env.VITE_WEATHER_CITY;
  if (manual) return { adcode: manual, city: null };
  const geo = await getBrowserLocation();
  if (geo) {
    try {
      const regeo = await getRegeo(key, geo.lng, geo.lat);
      const addr = regeo?.regeocode?.addressComponent;
      if (regeo?.infocode === "10000" && addr?.adcode) {
        return { adcode: addr.adcode, city: addr.district || addr.city || addr.province || null };
      }
    } catch {
      // 逆地理失败，退 IP 定位
    }
  }
  const ip = await getAdcode(key);
  if (ip.infocode !== "10000" || !ip.adcode) throw new Error("高德地区查询失败");
  return { adcode: ip.adcode, city: ip.city || null };
};

const getWeatherData = async (): Promise<void> => {
  try {
    if (!mainKey) {
      await applyFallback();
      return;
    }
    try {
      const loc = await locateCity(mainKey);
      const result = await getWeather(mainKey, loc.adcode);
      if (!result?.lives?.[0]) throw new Error("高德天气无数据");
      const lives = result.lives[0];
      setCity(loc.city || lives.city || lives.province || "未知地区");
      setWx({
        weather: lives.weather,
        temperature: lives.temperature,
        winddirection: lives.winddirection,
        windpower: lives.windpower,
      });
    } catch {
      await applyFallback();
    }
  } catch (err) {
    console.error("天气信息获取失败：" + err);
    toast("天气信息获取失败", { type: "error" });
  }
};

const windText = (dir: string) =>
  dir && !dir.endsWith("风") ? dir + "风" : dir;

/** 天气条：城市 + 天气 + 气温 + 风向 + 风力 */
export function Weather() {
  const ready = () => city() && wx().weather;
  onMount(() => getWeatherData());

  return (
    <div class="weather">
      {ready() ? (
        <>
          <span>{city()}&nbsp;</span>
          <span>{wx().weather}&nbsp;</span>
          <span>{wx().temperature}℃</span>
          {wx().winddirection ? (
            <>
              <span class="sm-hidden">
                &nbsp;{windText(wx().winddirection)}&nbsp;
              </span>
              <span class="sm-hidden">{wx().windpower}&nbsp;级</span>
            </>
          ) : null}
        </>
      ) : (
        <span>天气数据获取失败</span>
      )}
    </div>
  );
}