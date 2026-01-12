

/*import { getParkData } from "./parkService.mjs"; */

import { getParkData } from "./src/js/parkService.mjs";


const parkData = getParkData();

/* -------------------------------------------------
   1) Disclaimer link: update href + text
------------------------------------------------- */
const disclaimerLink = document.querySelector(".disclaimer a");
if (disclaimerLink) {
  disclaimerLink.href = parkData.url;
  disclaimerLink.textContent = parkData.fullName;
} else {
  console.warn('Could not find ".disclaimer a" in the HTML.');
}

/* -------------------------------------------------
   2) Page title
------------------------------------------------- */
document.title = parkData.fullName;

/* -------------------------------------------------
   3) Hero image: use first image in data
------------------------------------------------- */
const heroImg = document.querySelector(".hero-banner__image");
if (heroImg && Array.isArray(parkData.images) && parkData.images.length > 0) {
  heroImg.src = parkData.images[0].url;
  heroImg.alt = parkData.images[0].altText || parkData.fullName;
} else {
  console.warn('Could not set hero image. Check ".hero-banner__image" and parkData.images.');
}

/* -------------------------------------------------
   4) Hero text: name + designation + states
------------------------------------------------- */
const heroContent = document.querySelector(".hero-banner__content");
if (heroContent) {
  heroContent.innerHTML = parkInfoTemplate({
    name: parkData.name,
    designation: parkData.designation,
    states: parkData.states,
  });
} else {
  console.warn('Could not find ".hero-banner__content" in the HTML.');
}

function parkInfoTemplate(info) {
  return `
    <a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}
