// main.js
// This is the main JavaScript file that runs when the page loads
// It imports functions from other modules and uses them to populate the page

import { getParkData, parkInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1><p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  infoEl.insertAdjacentHTML("afterbegin", data.map(mediaCardTemplate).join(""));
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(parkInfoLinks);
}

init();
