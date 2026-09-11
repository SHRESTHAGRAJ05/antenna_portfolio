/* ============================================================
   EDIT ME: these are the only two things most people ever need
   to change to update navigation links or footer links sitewide.
   `group` splits the nav into EXPLORE vs MY PROJECT so visitors
   always know which "mode" of the site they're in.
   ============================================================ */
const NAV_LINKS = [
  { href: "index.html",       label: "Home",                 group: "home" },
  { href: "everyday.html",    label: "Antennas Around You",  group: "explore" },
  { href: "explore.html",     label: "Explore Basics",       group: "explore" },
  { href: "concept.html",     label: "Design Concept",       group: "project" },
  { href: "architecture.html",label: "Architecture",         group: "project" },
  { href: "results.html",     label: "Results",              group: "project" },
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

  let lastGroup = null;
  const linksHtml = NAV_LINKS.map(l => {
    const href = inAntennas ? "../" + l.href : l.href;
    const isActive = inAntennas ? l.href === "everyday.html" : l.href === current;
    const divider = (l.group !== lastGroup && lastGroup !== null)
      ? `<span class="nav-divider"><span class="nav-divider-label mono">${l.group === 'project' ? 'My Project' : 'Explore'}</span></span>`
      : "";
    lastGroup = l.group;
    return `${divider}<a href="${href}" class="${isActive ? 'active' : ''}" data-group="${l.group}">${l.label}</a>`;
  }).join("");

  mount.innerHTML = `
    <div class="wrap">
      <a class="brand" href="${brandHref}"><span class="dot"></span>field notes / antennas</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false"><span></span></button>
      <div class="navlinks" id="navlinks">${linksHtml}</div>
    </div>`;

  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("navlinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });
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

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
});
