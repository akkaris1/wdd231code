// visitor-center.js
// Drives the visitor-center.html detail page.

import "./visitor-center.css";
import { getParkData } from "./parkService.mjs";
import { getParkVisitorCenterDetails } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import {
  vcPageTitleTemplate,
  vcGeneralInfoTemplate,
  vcDetailsBoxTemplate,
  vcAddressTemplate,
  vcContactTemplate,
  vcImageGalleryTemplate,
  listTemplate,
  vcAmenityTemplate,
} from "./templates.mjs";

/**
 * getParam - reads a single URL search parameter by name
 * @param {string} param - the parameter key to look up
 * @returns {string|null}
 */
function getParam(param) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(param);
}

/**
 * renderVisitorCenter - builds and inserts all page sections
 * @param {Object} center - visitor center data from the API
 */
function renderVisitorCenter(center) {
  const main = document.querySelector("#main");

  // 1. Page title (h1 with ranger-station icon)
  main.insertAdjacentHTML("beforeend", vcPageTitleTemplate(center));

  // 2. Hero image + description
  main.insertAdjacentHTML("beforeend", vcGeneralInfoTemplate(center));

  // 3. Accordion section
  const accordionSection = document.createElement("section");
  accordionSection.className = "vc-accordions";

  // Addresses accordion
  accordionSection.insertAdjacentHTML(
    "beforeend",
    vcDetailsBoxTemplate(
      "vcAddresses",
      "heading-icon_map-pin",
      "Addresses",
      vcAddressTemplate(center)
    )
  );

  // Directions accordion
  accordionSection.insertAdjacentHTML(
    "beforeend",
    vcDetailsBoxTemplate(
      "vcDirections",
      "directions",
      "Directions",
      `<p class="vc-directions">${center.directionsInfo || "No directions available."}</p>`
    )
  );

  // Amenities accordion
  const amenities = center.amenities || [];
  const amenitiesContent = amenities.length
    ? listTemplate(amenities, vcAmenityTemplate)
    : "<p>No amenities listed.</p>";

  accordionSection.insertAdjacentHTML(
    "beforeend",
    vcDetailsBoxTemplate(
      "vcAmenities",
      "heading-icon_info",
      "Amenities",
      amenitiesContent
    )
  );

  // Contact Information accordion
  accordionSection.insertAdjacentHTML(
    "beforeend",
    vcDetailsBoxTemplate(
      "vcContact",
      "phone",
      "Contact Information",
      vcContactTemplate(center)
    )
  );

  main.appendChild(accordionSection);

  // 4. Image gallery
  main.insertAdjacentHTML("beforeend", vcImageGalleryTemplate(center));
}

async function init() {
  // Get the visitor center id from the URL (?id=...)
  const id = getParam("id");

  // Always set up the shared header/footer first
  const parkData = await getParkData();
  setHeaderFooter(parkData);

  if (!id) {
    document.querySelector("#main").innerHTML =
      "<p>No visitor center specified. Please go back and select one.</p>";
    return;
  }

  const centerData = await getParkVisitorCenterDetails(id);

  if (!centerData) {
    document.querySelector("#main").innerHTML =
      "<p>Could not load visitor center data. Please try again later.</p>";
    return;
  }

  renderVisitorCenter(centerData);
}

init();
