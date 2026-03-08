

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

/**
 * alertTemplate - Generates HTML for an alert item
 * @param {Object} alert - Alert object containing category, title, and description
 * @returns {string} HTML string for an alert list item
 */
export function alertTemplate(alert) {
  let alertType = "";
  // most of the alerts are one word and line up with the icons nicely. "Park Closure" is the exception
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }
  return `<li class="alert">
  <svg class="icon" focusable="false" aria-hidden="true">
    <use xlink:href="/images/sprite.symbol.svg#alert-${alertType}"></use>
  </svg>
  <div>
    <h3 class="alert-${alertType}">${alert.title}</h3>
    <p>${alert.description}</p>
  </div></li>`;
}

/**
 * visitorCenterTemplate - Generates HTML for a visitor center item
 * @param {Object} center - Visitor center object containing name, description, and directionsInfo
 * @returns {string} HTML string for a visitor center list item
 */
export function visitorCenterTemplate(center) {
  return `<li class="visitor-center">
    <h3>${center.name}</h3>
    <p>${center.description}</p>
    <p><strong>Directions:</strong> ${center.directionsInfo}</p>
  </li>`;
}

/**
 * activityTemplate - Generates HTML for an activity item
 * @param {Object} activity - Activity object containing name
 * @returns {string} HTML string for an activity list item
 */
export function activityTemplate(activity) {
  return `<li class="activity">
    <h3>${activity.name}</h3>
  </li>`;
}
