// setHeaderFooter.mjs
// This module handles updating the header and footer sections of the page
// with dynamic park data

// Import the template functions we need
// FIXED: Was importing from non-existent "somewhereYouHaveIt.mjs"
// Now correctly imports parkInfoTemplate from templates.mjs
import { parkInfoTemplate, footerTemplate } from "./templates.mjs";

/**
 * setHeaderInfo - Updates all the header elements with park data
 * This includes:
 * - Disclaimer link at the top
 * - Page title
 * - Hero banner image
 * - Hero banner text (park name, designation, states)
 * 
 * @param {Object} data - Park data object from parkData.json
 */
function setHeaderInfo(data) {
  // Update the disclaimer link at the top of the page
  // This should link to the official NPS page for the park
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;

  // Update the browser tab title
  document.querySelector("head > title").textContent = data.fullName;

  // Update the hero banner image
  // Uses the first image from the park's images array
  document.querySelector(".hero-banner > img").src = data.images[0].url;

  // Update the hero banner content (title and subtitle)
  // Uses the parkInfoTemplate to generate the HTML
  document.querySelector(".hero-banner__content").innerHTML = parkInfoTemplate(data);
}

/**
 * setFooter - Updates the footer with park contact information
 * This includes mailing address and phone number
 * 
 * @param {Object} data - Park data object from parkData.json
 */
function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

/**
 * setHeaderFooter - Main export function that updates both header and footer
 * This is called from main.js to set up the page
 * 
 * @param {Object} data - Park data object from parkData.json
 */
export default function setHeaderFooter(data) {
  setHeaderInfo(data);
  setFooter(data);
}
