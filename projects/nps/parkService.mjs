

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

export async function getParkAlerts(parkCode) {
  const apiKey = import.meta.env.VITE_NPS_API_KEY;

  if (!apiKey) {
    // Return some sample data if no API key
    return [
      {
        category: "Information",
        title: "Sample Alert",
        description: "This is sample alert data. Please configure your API key to see real alerts.",
      },
    ];
  }

  try {
    const url = `https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&limit=10`;
    const data = await getJson(url, apiKey);
    return data?.data || [];
  } catch (err) {
    console.warn("Could not fetch alerts:", err);
    return [];
  }
}

export async function getVisitorCenterData(parkCode) {
  const apiKey = import.meta.env.VITE_NPS_API_KEY;

  if (!apiKey) {
    // Return some sample data if no API key
    return [
      {
        name: "Sample Visitor Center",
        description: "This is sample visitor center data. Please configure your API key to see real visitor centers.",
        directionsInfo: "Sample directions information.",
      },
    ];
  }

  try {
    const url = `https://developer.nps.gov/api/v1/visitorcenters?parkCode=${parkCode}&limit=10`;
    const data = await getJson(url, apiKey);
    return data?.data || [];
  } catch (err) {
    console.warn("Could not fetch visitor centers:", err);
    return [];
  }
}


/**
 * getParkVisitorCenterDetails - fetches a single visitor center by its id
 * Uses the undocumented but functional ?id= query param on the visitorcenters endpoint.
 * @param {string} id - the visitor center id from the URL search param
 */
export async function getParkVisitorCenterDetails(id) {
  const apiKey = import.meta.env.VITE_NPS_API_KEY;

  if (!apiKey) {
    // Return sample data so the page still renders without an API key
    return {
      id,
      name: "Sample Visitor Center",
      description: "Configure your NPS API key to see real visitor center data.",
      directionsInfo: "Directions not available in sample mode.",
      images: [],
      addresses: [],
      contacts: { phoneNumbers: [], emailAddresses: [] },
      amenities: [],
    };
  }

  try {
    const url = `https://developer.nps.gov/api/v1/visitorcenters?id=${id}`;
    const data = await getJson(url, apiKey);
    return data?.data?.[0] || null;
  } catch (err) {
    console.warn("Could not fetch visitor center details:", err);
    return null;
  }
}
