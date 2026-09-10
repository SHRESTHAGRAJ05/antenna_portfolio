/* ============================================================
   EDIT ME: these are the only two things most people ever need
   to change to update navigation links or footer links sitewide.
   ============================================================ */
const NAV_LINKS = [
  { href: "index.html",       label: "Home" },
  { href: "everyday.html",    label: "Antennas Around You" },
  { href: "explore.html",     label: "Explore" },
  { href: "concept.html",     label: "Concept" },
  { href: "architecture.html",label: "Architecture" },
  { href: "results.html",     label: "Results" },
];

const FOOTER_LINKS = [
  { href: "#", label: "GitHub" },
  { href: "#", label: "Full report (PDF)" },
  { href: "#", label: "Contact" },
];

/* ============================================================ */

function renderNav(){
  const current = window.location.pathname.split("/").pop() || "index.html";
  const mount = document.getElementById("site-nav");
  if (!mount) return;
  mount.innerHTML = `
    <div class="wrap">
      <a class="brand" href="index.html"><span class="dot"></span>field notes / antennas</a>
      <div class="navlinks">
        ${NAV_LINKS.map(l => `<a href="${l.href}" class="${l.href === current ? 'active' : ''}">${l.label}</a>`).join("")}
      </div>
    </div>`;
}

function renderFooter(){
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <div class="wrap footer-row">
      <div class="fine mono">field notes / antennas — B.Tech project site</div>
      <div class="footer-links">
        ${FOOTER_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join("")}
      </div>
    </div>`;
}

/* Popup CTA — shown once per page load, dismissible, no page-nag on every scroll */
function initPopup(){
  if (document.body.dataset.noPopup === "true") return;
  const current = window.location.pathname.split("/").pop() || "index.html";
  if (current === "everyday.html") return; // don't advertise the page you're already on

  const popup = document.createElement("div");
  popup.id = "popup";
  popup.innerHTML = `
    <button class="popup-close" aria-label="Dismiss">×</button>
    <h4>Want to know what antennas you're surrounded with?</h4>
    <p>Your phone, earbuds, watch, car, and the cell tower down the street are all quietly using different antenna types.</p>
    <a class="btn solid" href="everyday.html">Take a look →</a>
  `;
  document.body.appendChild(popup);

  popup.querySelector(".popup-close").addEventListener("click", () => {
    popup.classList.remove("show");
  });

  setTimeout(() => popup.classList.add("show"), 1200);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
  initPopup();
});
