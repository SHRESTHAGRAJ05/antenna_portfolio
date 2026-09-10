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
  const path = window.location.pathname;
  const current = path.split("/").pop() || "index.html";
  const inAntennas = path.includes("/antennas/");
  const mount = document.getElementById("site-nav");
  if (!mount) return;
  const brandHref = inAntennas ? "../index.html" : "index.html";
  mount.innerHTML = `
    <div class="wrap">
      <a class="brand" href="${brandHref}"><span class="dot"></span>field notes / antennas</a>
      <div class="navlinks">
        ${NAV_LINKS.map(l => {
          const href = inAntennas ? "../" + l.href : l.href;
          // topic pages live under /antennas/, discovered via "Antennas Around You"
          const isActive = inAntennas ? l.href === "everyday.html" : l.href === current;
          return `<a href="${href}" class="${isActive ? 'active' : ''}">${l.label}</a>`;
        }).join("")}
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

/* NOTE: the old auto-popup that nagged on every page load has been removed.
   "Antennas Around You" is now a normal, intentional nav destination —
   see the "Explore" card on the homepage and the nav bar link. */

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
});
