

import { getParkData, parkInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

const parkData = getParkData();

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

setHeaderFooter(parkData);
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks);


/* -------------------------
   Templates
------------------------- */

/*

function parkInfoTemplate(info) {
  return `
    <a href="${parkData.url}" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

function mediaCardTemplate(info) {
  return `<div class="media-card">
    <a href="${info.link}">
      <img src="${info.image}" alt="${info.name}" class="media-card__img">
      <h3 class="media-card__title">${info.name}</h3>
    </a>
    <p>${info.description}</p>
  </div>`;
}

function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}

function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice?.phoneNumber ?? "";
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div>
      <p>${mailing.line1}</p>
      <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
    </div>
    <h4>Phone:</h4>
    <p>${voice}</p>
  </section>`;
}

/* -------------------------
   Data for the 3 info blocks
------------------------- 

const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: parkData.images[2].url,
    description:
      "See what conditions to expect in the park before leaving on your trip!",
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: parkData.images[3].url,
    description: "Learn about the fees and passes that are available.",
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: parkData.images[9].url,
    description: "Learn about the visitor centers in the park.",
  },
];

/* -------------------------
   “Set” functions
------------------------- 

function setHeaderInfo(data) {
  // disclaimer link
  const disclaimerLink = document.querySelector(".disclaimer a");
  if (disclaimerLink) {
    disclaimerLink.href = data.url;
    disclaimerLink.textContent = data.fullName;
  }

  // title
  document.title = data.fullName;

  // hero image (support either selector)
  const heroImg =
    document.querySelector(".hero-banner__image") ||
    document.querySelector(".hero-banner img");

  if (heroImg && data.images?.length) {
    heroImg.src = data.images[0].url;
    heroImg.alt = data.images[0].altText || data.fullName;
  }

  // hero text
  const heroContent = document.querySelector(".hero-banner__content");
  if (heroContent) {
    heroContent.innerHTML = parkInfoTemplate({
      name: data.name,
      designation: data.designation,
      states: data.states,
    });
  }
}

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  if (!introEl) return;

  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(links) {
  const infoEl = document.querySelector(".info");
  if (!infoEl) return;

  const html = links.map(mediaCardTemplate).join("");
  infoEl.insertAdjacentHTML("afterbegin", html);
}

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  if (!footerEl) return;

  footerEl.innerHTML = footerTemplate(data);
}

/* -------------------------
   Run it
------------------------- 

setHeaderInfo(parkData);
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks);
setFooter(parkData);

*/
