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

function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;

    // Toggle the .show class on the global-nav to open/close it
    document.querySelector(".global-nav").classList.toggle("show");

    // ev.target may be a child element (svg, span, etc.) — walk up to the button
    if (target.tagName !== "BUTTON") {
      target = target.closest("button");
    }

    // Sync aria-expanded with the new open/closed state
    if (document.querySelector(".global-nav").classList.contains("show")) {
      target.setAttribute("aria-expanded", "true");
      target.setAttribute("aria-label", "Close Menu");
    } else {
      target.setAttribute("aria-expanded", "false");
      target.setAttribute("aria-label", "Open Menu");
    }
  });
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(parkInfoLinks);
  enableNavigation();
}

init();
