// navigation.mjs
// Handles all global navigation interactivity.
// Exported as a module so it can be shared across pages via setHeaderFooter.mjs.

/**
 * mainMenuHandler - Toggles the global nav open/closed and keeps
 * aria-expanded in sync with the visible state.
 */
function mainMenuHandler(ev) {
  const globalNav = document.querySelector(".global-nav");
  globalNav.classList.toggle("show");

  // Walk up to the <button> in case the click landed on a child (svg, span…)
  const button = ev.target.closest("button");

  if (globalNav.classList.contains("show")) {
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Close Menu");
  } else {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open Menu");
  }
}

/**
 * subMenuHandler - Toggles an individual submenu open/closed and
 * rotates the arrow icon to indicate direction.
 */
function subMenuHandler(ev) {
  // From the clicked button, go up to the <li>, then find its submenu
  ev.currentTarget
    .closest("li")
    .querySelector(".global-nav__submenu")
    .classList.toggle("show");

  // Rotate the arrow so it points up when open, down when closed
  ev.currentTarget.querySelector(".icon").classList.toggle("rotate");
}

/**
 * enableNavigation - Attaches event listeners to the main menu toggle
 * and every submenu toggle button on the page.
 * Called by setHeaderFooter so it runs on every page automatically.
 */
export default function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const subMenuToggles = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );

  if (menuButton) {
    menuButton.addEventListener("click", mainMenuHandler);
  }

  subMenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", subMenuHandler);
  });
}
