

// parkService.mjs
// Provides park data + the 3 info link records for the home page.

// parkService.mjs
import localPark from "./parkData.json";

const BASE_URL = "https://developer.nps.gov/api/v1/parks";
const PARK_CODE = "yell";

async function getJson(url, apiKey) {
  const res = await fetch(url, {
    headers: { "X-Api-Key": apiKey },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
  }
  return res.json();
}

export async function getParkData() {
  const apiKey = import.meta.env.VITE_NPS_API_KEY;

  if (!apiKey) return localPark;

  try {
    const url = `${BASE_URL}?parkCode=${PARK_CODE}&fields=images,contacts,addresses&limit=1`;
    const data = await getJson(url, apiKey);
    const park = data?.data?.[0];
    return park || localPark;
  } catch (err) {
    console.warn("NPS API unavailable/forbidden; using local parkData.json instead.");
    return localPark;
  }
}

export const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: localPark.images?.[2]?.url ?? "",
    description: "See what conditions to expect in the park before leaving on your trip!",
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: localPark.images?.[3]?.url ?? "",
    description: "Learn about the fees and passes that are available.",
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: localPark.images?.[9]?.url ?? "",
    description: "Learn about the visitor centers in the park.",
  },
];
