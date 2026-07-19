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

const galleryTriggers = [...document.querySelectorAll(".gallery-trigger")];

if (galleryTriggers.length) {
  const labels = {
    ro: {
      close: "Închide galeria",
      previous: "Imaginea precedentă",
      next: "Imaginea următoare",
    },
    hu: {
      close: "Galéria bezárása",
      previous: "Előző kép",
      next: "Következő kép",
    },
    en: {
      close: "Close gallery",
      previous: "Previous image",
      next: "Next image",
    },
  };
  const lang = document.documentElement.lang?.slice(0, 2) || "ro";
  const text = labels[lang] || labels.ro;
  const groups = new Map();
  let activeGroup = [];
  let activeIndex = 0;
  let lastFocusedElement;

  galleryTriggers.forEach((trigger) => {
    const groupName = trigger.dataset.gallery || "default";
    if (!groups.has(groupName)) groups.set(groupName, []);
    groups.get(groupName).push(trigger);
  });

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <div class="lightbox-panel">
      <button class="lightbox-button lightbox-close" type="button" aria-label="${text.close}">×</button>
      <button class="lightbox-button lightbox-prev" type="button" aria-label="${text.previous}">‹</button>
      <div class="lightbox-image-wrap">
        <img class="lightbox-image" alt="">
      </div>
      <button class="lightbox-button lightbox-next" type="button" aria-label="${text.next}">›</button>
    </div>
  `;
  document.body.append(lightbox);

  const image = lightbox.querySelector(".lightbox-image");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const prevButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");

  const showImage = (index) => {
    if (!activeGroup.length) return;
    activeIndex = (index + activeGroup.length) % activeGroup.length;
    const trigger = activeGroup[activeIndex];
    const img = trigger.querySelector("img");
    const captionText = trigger.dataset.caption || img?.alt || "";
    image.src = trigger.href;
    image.alt = img?.alt || captionText;
    const hasMultipleImages = activeGroup.length > 1;
    prevButton.hidden = !hasMultipleImages;
    nextButton.hidden = !hasMultipleImages;
  };

  const openLightbox = (trigger) => {
    const groupName = trigger.dataset.gallery || "default";
    activeGroup = groups.get(groupName) || [trigger];
    activeIndex = activeGroup.indexOf(trigger);
    lastFocusedElement = document.activeElement;
    showImage(activeIndex);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus({ preventScroll: true });
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    image.removeAttribute("src");
    lastFocusedElement?.focus?.({ preventScroll: true });
  };

  galleryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(trigger);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", () => showImage(activeIndex - 1));
  nextButton.addEventListener("click", () => showImage(activeIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
  });
}
