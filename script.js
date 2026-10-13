
"use strict";

/* =========================================================
   ARIEL — CREATIVE PORTFOLIO SYSTEM
========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector)
];

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initReveal();
  initProjectFilter();
  initProjectModal();
  initCursor();
  initClock();
  initCertificateViewer();
  initMusic();
});

/* PRELOADER */

function initPreloader() {
  const preloader = $("#preloader");
  const percent = $("[data-loader-percent]");
  const bar = $(".preloader-line span");

  if (!preloader) return;

  let progress = 0;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finish = () => {
    preloader.classList.add("loaded");
    document.body.classList.add("page-ready");
    window.setTimeout(() => preloader.remove(), 700);
  };

  if (reducedMotion) {
    if (percent) percent.textContent = "100%";
    if (bar) bar.style.width = "100%";
    finish();
    return;
  }

  const interval = window.setInterval(() => {
    progress += Math.floor(Math.random() * 13) + 5;
    progress = Math.min(progress, 100);

    if (percent) percent.textContent = `${progress}%`;
    if (bar) bar.style.width = `${progress}%`;

    if (progress >= 100) {
      window.clearInterval(interval);
      window.setTimeout(finish, 250);
    }
  }, 100);

  // Prevent the loading screen from remaining forever.
  window.addEventListener("load", () => {
    window.clearInterval(interval);
    if (percent) percent.textContent = "100%";
    if (bar) bar.style.width = "100%";
    window.setTimeout(finish, 150);
  }, { once: true });

  window.setTimeout(() => {
    window.clearInterval(interval);
    finish();
  }, 2500);
}

/* NAVBAR */

function initNavbar() {
  const navbar = $(".navbar");
  const links = $$(".nav-link");
  const sections = links
    .map(link => $(link.getAttribute("href")))
    .filter(Boolean);

  const updateNavbar = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    }

    let currentId = "home";

    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 160) {
        currentId = section.id;
      }
    });

    links.forEach(link => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();
}

/* MOBILE MENU */

function initMobileMenu() {
  const menuButton = $(".mobile-menu");
  const navigation = $(".navigation");

  if (!menuButton || !navigation) return;

  const closeMenu = () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  $$(".nav-link", navigation).forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", event => {
    if (
      navigation.classList.contains("open") &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) closeMenu();
  });
}

/* SMOOTH SCROLL */

function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();
        return;
      }

      const target = $(href);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    });
  });
}

/* REVEAL ON SCROLL */

function initReveal() {
  const elements = $$(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -25px 0px"
  });

  elements.forEach(element => observer.observe(element));
}

/* PROJECT FILTER */

function initProjectFilter() {
  const filterButtons = $$(".filter-button");
  const cards = $$(".project-card");

  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      filterButtons.forEach(item => {
        item.classList.toggle("active", item === button);
      });

      cards.forEach(card => {
        const categories = (card.dataset.category || "").split(/\s+/);
        const visible = filter === "all" || categories.includes(filter);

        card.classList.toggle("is-hidden", !visible);
      });
    });
  });
}

/* PROJECT DETAILS MODAL */

function initProjectModal() {
  const modal = $(".project-modal");

  if (!modal) return;

  const closeButton = $(".modal-close", modal);
  const overlay = $(".modal-overlay", modal);
  const image = $("[data-modal-image]", modal);
  const title = $("[data-modal-title]", modal);
  const description = $("[data-modal-description]", modal);
  const year = $("[data-modal-year]", modal);
  const tags = $("[data-modal-tags]", modal);
  const role = $("[data-modal-role]", modal);
  const status = $("[data-modal-status]", modal);
  const projectLink = $("[data-modal-link]", modal);

  let lastFocusedElement = null;

  const openModal = card => {
    lastFocusedElement = document.activeElement;

    const projectTitle = card.dataset.title || "Untitled Project";
    const projectImage = card.dataset.image || "";
    const projectDescription =
      card.dataset.description || "Project details coming soon.";
    const projectTags = (card.dataset.tags || "")
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);

    if (image) {
      image.src = projectImage;
      image.alt = projectTitle;
    }

    if (title) title.textContent = projectTitle;
    if (description) description.textContent = projectDescription;
    if (year) year.textContent = card.dataset.year || "2026";
    if (role) role.textContent = card.dataset.role || "Developer";
    if (status) status.textContent = card.dataset.status || "In Development";

    if (tags) {
      tags.replaceChildren();

      projectTags.forEach(tag => {
        const element = document.createElement("span");
        element.textContent = tag;
        tags.appendChild(element);
      });
    }

    if (projectLink) {
      const href = card.dataset.link || "#";
      projectLink.href = href;
      projectLink.style.display = href === "#" ? "none" : "inline-flex";
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (closeButton) closeButton.focus();
  };

  const closeModal = () => {
    if (!modal.classList.contains("open")) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  $$(".project-card").forEach(card => {
    const openButtons = $$(".project-open", card);
    const preview = $(".project-preview", card);

    openButtons.forEach(button => {
      button.addEventListener("click", () => openModal(card));
    });

    if (preview) {
      preview.addEventListener("click", () => openModal(card));
      preview.style.cursor = "pointer";
    }
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

/* CUSTOM CURSOR */

function initCursor() {
  const cursor = $(".cursor");
  const ring = $(".cursor-ring");

  if (!cursor || !ring) return;

  if (window.matchMedia("(pointer: coarse)").matches) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  document.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.transform =
      `translate3d(${mouseX - 2.5}px, ${mouseY - 2.5}px, 0)`;

    document.body.classList.add("cursor-ready");
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.transform =
      `translate3d(${ringX - 14}px, ${ringY - 14}px, 0)`;

    requestAnimationFrame(animateRing);
  };

  animateRing();

  document.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-ready");
  });

  document.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-ready");
  });
}

/* DIGITAL CLOCK */

function initClock() {
  const clock = $("[data-clock]");

  if (!clock) return;

  const updateClock = () => {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  updateClock();
  window.setInterval(updateClock, 1000);
}

/* =========================================================
   CERTIFICATE VIEWER
   Click a certificate to enlarge it.
   Close using X, backdrop, or Escape.
========================================================= */

function initCertificateViewer() {
  const lightbox = $("#certificateLightbox");
  const lightboxImage = $("#certificateLightboxImage");
  const lightboxTitle = $("#certificateLightboxTitle");

  if (!lightbox || !lightboxImage || !lightboxTitle) return;

  const closeButtons = $$("[data-certificate-close]", lightbox);
  const openButtons = $$("[data-certificate-open]");
  const closeButton = $(".certificate-lightbox-close", lightbox);

  let lastFocusedElement = null;
  let currentImagePath = "";

  const openCertificate = button => {
    const imagePath = button.dataset.image;
    const title = button.dataset.title || "Certificate";

    if (!imagePath) {
      console.error("Certificate image path is missing.");
      return;
    }

    lastFocusedElement = document.activeElement;
    currentImagePath = imagePath;

    lightboxTitle.textContent = title;
    lightboxImage.alt = title;
    lightboxImage.src = imagePath;

    lightboxImage.onerror = () => {
      console.error(`Certificate image could not be loaded: ${currentImagePath}`);
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "Certificate image not found. Check the image path.";
      lightboxTitle.textContent = `${title} — IMAGE NOT FOUND`;
    };

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (closeButton) closeButton.focus();
  };

  const closeCertificate = () => {
    if (!lightbox.classList.contains("open")) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    // Keep the image loaded until the closing animation is complete.
    window.setTimeout(() => {
      if (!lightbox.classList.contains("open")) {
        lightboxImage.removeAttribute("src");
      }
    }, 250);

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      openCertificate(button);
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", closeCertificate);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeCertificate();
    }

    if (event.key === "Tab" && lightbox.classList.contains("open")) {
      const focusable = $$(
        'button, a[href], input, [tabindex]:not([tabindex="-1"])',
        lightbox
      ).filter(element => !element.disabled);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

/* =========================================================
   MUSIC PLAYER
   Images are cover art, NOT audio files.
   Add actual audio files and set their paths below.
========================================================= */

function initMusic() {
  const audio = $("#audioPlayer");
  const playButton = $(".music-play");
  const previousButton = $("[data-music-prev]");
  const nextButton = $("[data-music-next]");
  const progress = $("#musicProgress");
  const volume = $("#musicVolume");
  const title = $("#musicTitle");
  const artist = $("#musicArtist");
  const cover = $("#musicCover");
  const coverIndex = $("#coverIndex");
  const currentTime = $("#currentTime");
  const duration = $("#duration");
  const playlistTracks = $$(".playlist-track");

  if (!audio || !playButton || !playlistTracks.length) return;

  // Put your real audio files at these paths.
  // Example: assets/audio/song-one.mp3
  const tracks = [
    {
      title: "Shut It Down",
      artist: "Drake",
      cover: "shutitdown.webp",
      source: "assets/audio/shutitdown.mp3"
    },
    {
      title: "Jatuh Hati",
      artist: "Raisa",
      cover: "jatuhhati.webp",
      source: "assets/audio/jatuhhati.mp3"
    },
    {
      title: "thanK you alMee",
      artist: "Taylor Swift",
      cover: "thankyoualmee.webp",
      source: "assets/audio/thankyoualmee.mp3"
    }
  ];

  let activeIndex = 0;

  const formatTime = seconds => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);

    return `${minutes}:${String(remainder).padStart(2, "0")}`;
  };

  const updatePlayIcon = playing => {
    const icon = $("i", playButton);

    if (icon) {
      icon.className = playing
        ? "fa-solid fa-pause"
        : "fa-solid fa-play";
    }

    playButton.setAttribute(
      "aria-label",
      playing ? "Pause music" : "Play music"
    );
  };

  const updateTrackUI = () => {
    const track = tracks[activeIndex];

    if (title) title.textContent = track.title;
    if (artist) artist.textContent = track.artist;
    if (cover) {
      cover.src = track.cover;
      cover.alt = `${track.title} cover`;
    }
    if (coverIndex) {
      coverIndex.textContent = String(activeIndex + 1).padStart(2, "0");
    }

    playlistTracks.forEach((button, index) => {
      const isActive = index === activeIndex;
      button.classList.toggle("active", isActive);

      const icon = $(".track-play i", button);
      if (icon) {
        icon.className = isActive && !audio.paused
          ? "fa-solid fa-pause"
          : "fa-solid fa-play";
      }
    });
  };

  const loadTrack = (index, autoplay = false) => {
    activeIndex = (index + tracks.length) % tracks.length;

    const track = tracks[activeIndex];

    audio.src = track.source;
    audio.load();

    if (progress) progress.value = "0";
    if (currentTime) currentTime.textContent = "0:00";
    if (duration) duration.textContent = "0:00";

    updateTrackUI();
    updatePlayIcon(false);

    if (autoplay) {
      playTrack();
    }
  };

  const playTrack = async () => {
    if (!audio.src) loadTrack(activeIndex);

    try {
      await audio.play();
      updatePlayIcon(true);
      updateTrackUI();
    } catch (error) {
      updatePlayIcon(false);
      updateTrackUI();

      console.warn(
        "Audio could not play. Check that the audio file exists:",
        tracks[activeIndex].source,
        error
      );
    }
  };

  const pauseTrack = () => {
    audio.pause();
    updatePlayIcon(false);
    updateTrackUI();
  };

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  });

  previousButton?.addEventListener("click", () => {
    loadTrack(activeIndex - 1, true);
  });

  nextButton?.addEventListener("click", () => {
    loadTrack(activeIndex + 1, true);
  });

  playlistTracks.forEach((button, index) => {
    button.addEventListener("click", () => {
      loadTrack(index, true);
    });
  });

  audio.addEventListener("timeupdate", () => {
    if (progress && Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = String((audio.currentTime / audio.duration) * 100);
    }

    if (currentTime) {
      currentTime.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    if (duration) duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("ended", () => {
    loadTrack(activeIndex + 1, true);
  });

  audio.addEventListener("play", () => {
    updatePlayIcon(true);
    updateTrackUI();
  });

  audio.addEventListener("pause", () => {
    updatePlayIcon(false);
    updateTrackUI();
  });

  audio.addEventListener("error", () => {
    updatePlayIcon(false);
    console.warn(
      `Audio file not found or unsupported: ${tracks[activeIndex].source}`
    );
  });

  progress?.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = (Number(progress.value) / 100) * audio.duration;
    }
  });

  volume?.addEventListener("input", () => {
    audio.volume = Number(volume.value);
  });

  audio.volume = volume ? Number(volume.value) : 0.8;

  loadTrack(0, false);
}
