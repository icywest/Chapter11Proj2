import axios from "axios";

export const API_URL =
  "https://www.randyconnolly.com/funwebdev/3rd/api/travel/images.php?iso=gb";

export const THUMB_BASE_URL =
  "https://www.randyconnolly.com/funwebdev/3rd/images/travel/square150/";

export const MEDIUM_BASE_URL =
  "https://www.randyconnolly.com/funwebdev/3rd/images/travel/medium640/";

export function normalizePhoto(raw) {
  const loc = raw?.location ?? {};
  const id = raw?.id ?? raw?.filename ?? "";
  return {
    id,
    title: raw?.title ?? "",
    city: typeof loc.city !== "undefined" ? String(loc.city ?? "") : "",
    country: typeof loc.country !== "undefined" ? String(loc.country ?? "") : "",
    filename: raw?.filename ?? "",
  };
}

export async function fetchPhotos({ signal } = {}) {
  const { data } = await axios.get(API_URL, { signal });
  const arr = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);

  if (arr.length) {
    const s = arr[0];
    console.log("location keys:", Object.keys(s.location || {}));
    console.log("location.city =", s.location?.city, "typeof:", typeof s.location?.city);
    console.log("location.country =", s.location?.country, "typeof:", typeof s.location?.country);
    console.log("normalized sample =", normalizePhoto(s));
  }

  return arr.map(normalizePhoto).filter(p => p.filename);
}
