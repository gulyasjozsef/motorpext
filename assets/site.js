const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navDropdown = document.querySelector(".nav-dropdown");
const navTrigger = document.querySelector(".nav-trigger");

const updateHeaderState = () => {
  if (!siteHeader) return;
  const offset = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  siteHeader.classList.toggle("is-scrolled", offset > 12);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = siteHeader.classList.toggle("is-menu-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Închide meniul" : "Deschide meniul");
  if (!isOpen) {
    navDropdown?.classList.remove("is-open");
    navTrigger?.setAttribute("aria-expanded", "false");
  }
});

navTrigger?.addEventListener("click", () => {
  const isOpen = navDropdown.classList.toggle("is-open");
  navTrigger.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  if (!siteHeader?.contains(event.target)) {
    siteHeader?.classList.remove("is-menu-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    navDropdown?.classList.remove("is-open");
    navTrigger?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  const linkUrl = new URL(link.href);
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  const linkPath = linkUrl.pathname.replace(/\/index\.html$/, "/");
  if (linkPath === currentPath && !linkUrl.hash) {
    link.setAttribute("aria-current", "page");
  }

  link.addEventListener("click", () => {
    siteHeader?.classList.remove("is-menu-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    navDropdown?.classList.remove("is-open");
    navTrigger?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".media-card img").forEach((image) => {
  image.addEventListener("error", () => {
    image.setAttribute("hidden", "");
  });
});
