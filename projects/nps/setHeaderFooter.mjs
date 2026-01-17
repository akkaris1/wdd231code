

// setHeaderFooter.mjs
import { parkInfoTemplate } from "./somewhereYouHaveIt.mjs"; 
import { footerTemplate } from "./templates.mjs";

// If parkInfoTemplate is still in main.js, move it to templates and import it here.
// If it's already in a module, import from that module.

function setHeaderInfo(data) {
  // disclaimer link
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;

  // title
  document.querySelector("head > title").textContent = data.fullName;

  // banner image
  document.querySelector(".hero-banner > img").src = data.images[0].url;

  // header content
  document.querySelector(".hero-banner__content").innerHTML = parkInfoTemplate(data);
}

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

export default function setHeaderFooter(data) {
  setHeaderInfo(data);
  setFooter(data);
}
