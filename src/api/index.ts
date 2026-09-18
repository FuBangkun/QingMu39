import type { Track } from "~/store";

/** 简易 JSONP 请求（替代原 fetch-jsonp），返回解析后的 JSON */
function jsonpFetch<T = unknown>(url: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const cbName = "__jsonp_" + Math.random().toString(36).slice(2);
    const script = document.createElement("script");
    const cleanup = () => {
      delete (window as unknown as Record<string, unknown>)[cbName];
      script.remove();
    };
    window[cbName as keyof Window] = ((data: T) => {
      cleanup();
      resolve(data);
    }) as unknown as Window[typeof cbName] & (() => void);

    script.onerror = () => {
      cleanup();
      reject(new Error("JSONP 请求失败"));
    };
    // 将回调名拼入 query
    const sep = url.includes("?") ? "&" : "?";
    script.src = `${url}${sep}callback=${cbName}`;
    document.head.appendChild(script);
  });
}

/**
 * 获取音乐播放列表
 * 返回统一的 Track 结构
 */
export const getPlayerList = async (
  server: string,
  type: string,
  id: string,
): Promise<Track[]> => {
  // 用 fetch：injahow 的 meting 接口带 `Access-Control-Allow-Origin: *`，可直接跨域；它不支持 callback JSONP
  const res = await fetch(
    `${import.meta.env.VITE_SONG_API}?server=${server}&type=${type}&id=${id}`,
  );
  const data: Array<Record<string, string>> = await res.json();

  if (data[0]?.url?.startsWith("@")) {
    // 命中 JSONP 元数据标记：(handle, jsonpCallback, jsonpCallbackFunction, url)
    const [, , , url] = data[0].url
      .split("@")
      .slice(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonpData: any = await jsonpFetch(url);
    const domain = (
      jsonpData.req_0.data.sip.find(
        (i: string) => !i.startsWith("http://ws"),
      ) || jsonpData.req_0.data.sip[0]
    ).replace("http://", "https://");

    return data.map((v, i) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: domain + jsonpData.req_0.data.midurlinfo[i].purl,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  } else {
    return data.map((v) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: v.url,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  }
};

/** 获取一言数据 */
export const getHitokoto = async (): Promise<Record<string, string>> => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};

/** 高德：IP 定位 → 城市 adcode */
export const getAdcode = async (key: string) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
  return await res.json();
};

/** 高德：逆地理编码（坐标 → 城市 adcode） */
export const getRegeo = async (key: string, lng: number, lat: number) => {
  const res = await fetch(
    `https://restapi.amap.com/v3/geocode/regeo?key=${key}&location=${lng},${lat}`,
  );
  return await res.json();
};

/** 高德：获取实时天气 */
export const getWeather = async (key: string, city: string) => {
  const res = await fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`,
  );
  return await res.json();
};

/** 教书先生天气：证书已失效(ERR_CERT_AUTHORITY_INVALID)，已移除。直接使用 getGeoWeather 兜底。 */

/** 免 Key 备用：IP 定位 + Open-Meteo 天气 */
export const getGeoWeather = async () => {
  const geoRes = await fetch("https://ipwho.is/");
  const geo = await geoRes.json();
  if (!geo || geo.success !== true || !geo.latitude || !geo.longitude) {
    throw new Error("IP 定位失败");
  }
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current_weather=true`,
  );
  const data = await res.json();
  if (!data?.current_weather) {
    throw new Error("天气服务无数据");
  }
  return {
    city: geo.city || geo.country || "未知地区",
    current_weather: data.current_weather,
  };
};