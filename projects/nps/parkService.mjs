

// parkService.mjs
// Provides park data + the 3 info link records for the home page.

import park from "./parkData.json";

export function getParkData() {
  return park;
}

export const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: park.images[2].url,
    description:
      "See what conditions to expect in the park before leaving on your trip!",
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: park.images[3].url,
    description: "Learn about the fees and passes that are available.",
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: park.images[9].url,
    description: "Learn about the visitor centers in the park.",
  },
];
