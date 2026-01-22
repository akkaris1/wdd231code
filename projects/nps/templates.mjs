// templates.mjs
// This file contains all the HTML template functions used to generate
// dynamic content on the page

/**
 * parkInfoTemplate - Generates the hero banner title and subtitle
 * This was missing and is needed by setHeaderFooter.mjs
 * @param {Object} info - Park data object containing name, designation, and states
 * @returns {string} HTML string for the hero banner content
 */
export function parkInfoTemplate(info) {
  return `
    <a href="#" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

/**
 * mediaCardTemplate - Creates a card with image, title, and description
 * Used for the three info blocks (Current Conditions, Fees, Visitor Centers)
 * @param {Object} info - Contains link, image, name, and description
 * @returns {string} HTML string for a media card
 */
export function mediaCardTemplate(info) {
  return `<div class="media-card">
    <a href="${info.link}">
      <img src="${info.image}" alt="${info.name}" class="media-card__img">
      <h3 class="media-card__title">${info.name}</h3>
    </a>
    <p>${info.description}</p>
  </div>`;
}

/**
 * Helper function to find the mailing address from addresses array
 * @param {Array} addresses - Array of address objects
 * @returns {Object} The mailing address object
 */
function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}

/**
 * Helper function to find the voice phone number from phone numbers array
 * Uses optional chaining (?.) and nullish coalescing (??) for safety
 * @param {Array} numbers - Array of phone number objects
 * @returns {string} The voice phone number or empty string if not found
 */
function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice?.phoneNumber ?? "";
}

/**
 * footerTemplate - Generates the footer with contact information
 * @param {Object} info - Park data containing addresses and contact info
 * @returns {string} HTML string for the footer section
 */
export function footerTemplate(info) {
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
