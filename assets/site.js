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
  menuToggle.setAttribute("aria-label", isOpen ? menuToggle.dataset.labelClose : menuToggle.dataset.labelOpen);
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

const heroSlider = document.querySelector("[data-hero-slider]");

if (heroSlider) {
  const slides = [...heroSlider.querySelectorAll(".home-hero-slide")];
  const panels = [...heroSlider.querySelectorAll("[data-hero-panel]")];
  const dots = [...heroSlider.querySelectorAll("[data-hero-dot]")];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intervalMs = 6500;
  let activeIndex = 0;
  let slideTimer;

  const setActiveSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
    });

    panels.forEach((panel, index) => {
      const isActive = index === activeIndex;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });
  };

  const stopAutoSlide = () => {
    if (slideTimer) {
      window.clearInterval(slideTimer);
      slideTimer = undefined;
    }
  };

  const startAutoSlide = () => {
    if (prefersReducedMotion || slides.length < 2 || document.hidden) return;
    stopAutoSlide();
    slideTimer = window.setInterval(() => {
      setActiveSlide(activeIndex + 1);
    }, intervalMs);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveSlide(index);
      startAutoSlide();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  startAutoSlide();
}
