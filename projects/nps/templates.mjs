

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
    <h3><a href="visitor-center.html?id=${center.id}">${center.name}</a></h3>
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

// =========================================================
// VISITOR CENTER DETAIL PAGE TEMPLATES
// =========================================================

/**
 * vcPageTitleTemplate - renders the page's h1
 */
export function vcPageTitleTemplate(center) {
  return `<h1 class="vc-title">
    <svg class="icon" role="presentation" focusable="false">
      <use xlink:href="/images/sprite.symbol.svg#ranger-station"></use>
    </svg>
    ${center.name}
  </h1>`;
}

/**
 * vcGeneralInfoTemplate - hero image + description paragraph
 */
export function vcGeneralInfoTemplate(center) {
  const img = center.images?.[0];
  const imgHtml = img
    ? `<img src="${img.url}" alt="${img.altText}" class="vc-hero-img">`
    : "";
  return `<section class="vc-info">
    ${imgHtml}
    <p>${center.description}</p>
  </section>`;
}

/**
 * vcDetailsBoxTemplate - reusable <details> accordion block.
 * @param {string} id       - unique id for the element
 * @param {string} iconId   - sprite icon id
 * @param {string} summary  - label shown in the summary bar
 * @param {string} content  - inner HTML (already-built string)
 */
export function vcDetailsBoxTemplate(id, iconId, summary, content) {
  return `<details name="vc-details" id="${id}">
    <summary>
      <svg class="icon" role="presentation" focusable="false">
        <use xlink:href="/images/sprite.symbol.svg#${iconId}"></use>
      </svg>
      ${summary}
    </summary>
    ${content}
  </details>`;
}

/**
 * listTemplate - generic list builder.
 * @param {Array}    data            - array of items
 * @param {Function} contentTemplate - function that turns one item into an <li> string
 */
export function listTemplate(data, contentTemplate) {
  const html = data.map(contentTemplate);
  return `<ul>${html.join("")}</ul>`;
}

/** Single image <li> for the gallery */
export function vcImageTemplate(image) {
  return `<li><img src="${image.url}" alt="${image.altText}"></li>`;
}

/** Single amenity <li> */
export function vcAmenityTemplate(amenity) {
  return `<li>${amenity}</li>`;
}

/**
 * vcAddressTemplate - builds the address content for the accordion
 */
export function vcAddressTemplate(center) {
  const addrs = center.addresses || [];
  if (!addrs.length) return "<p>No address information available.</p>";
  return addrs
    .map(
      (a) => `<address class="vc-address">
        <svg class="icon" role="presentation" focusable="false">
          <use xlink:href="/images/sprite.symbol.svg#heading-icon_map-pin"></use>
        </svg>
        <span>
          <strong>${a.type}</strong><br>
          ${a.line1}<br>
          ${a.city}, ${a.stateCode} ${a.postalCode}
        </span>
      </address>`
    )
    .join("");
}

/**
 * vcContactTemplate - builds the contact content for the accordion
 */
export function vcContactTemplate(center) {
  const phones = center.contacts?.phoneNumbers || [];
  const emails = center.contacts?.emailAddresses || [];
  const phone = phones[0]?.phoneNumber ?? "N/A";
  const email = emails[0]?.emailAddress ?? "N/A";
  return `<ul class="vc-contact-list">
    <li>
      <svg class="icon" role="presentation" focusable="false">
        <use xlink:href="/images/sprite.symbol.svg#phone"></use>
      </svg>
      <a href="tel:${phone}">${phone}</a>
    </li>
    <li>
      <svg class="icon" role="presentation" focusable="false">
        <use xlink:href="/images/sprite.symbol.svg#heading-icon_info"></use>
      </svg>
      <a href="mailto:${email}">${email}</a>
    </li>
  </ul>`;
}

/**
 * vcImageGalleryTemplate - full gallery section
 */
export function vcImageGalleryTemplate(center) {
  if (!center.images?.length) return "";
  return `<section class="vc-gallery">
    <h2>
      <svg class="icon" role="presentation" focusable="false">
        <use xlink:href="/images/sprite.symbol.svg#camera-alt"></use>
      </svg>
      Image Gallery
    </h2>
    ${listTemplate(center.images, vcImageTemplate)}
  </section>`;
}
