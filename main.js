document.addEventListener("DOMContentLoaded", function () {
  /* ---------------- FIX NAVBAR PADDING ---------------- */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const navHeight = navbar.offsetHeight;
    document.body.style.paddingTop = navHeight + "px";
  }

  /* ---------------- PRELOADER ---------------- */
  setTimeout(function () {
    const preloader = document.querySelector("#preloader");
    if (preloader) preloader.classList.add("hidden");
    document.body.classList.add("loaded");
  }, 1000);

  /* ---------------- ACTIVE NAV-LINK ---------------- */
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  /* ---------------- VIDEO PLAY/PAUSE FUNCTIONALITY ---------------- */
  const videos = document.querySelectorAll(".custom-video");
  const playButtons = document.querySelectorAll(".play-btn");

  playButtons.forEach((btn, index) => {
    const currentVideo = videos[index];

    btn.addEventListener("click", () => {
      videos.forEach((vid, i) => {
        if (vid !== currentVideo) {
          vid.pause();
          playButtons[i].innerHTML = "▶";
        }
      });

      if (currentVideo.paused) {
        currentVideo.play();
        btn.innerHTML = "⏸";
      } else {
        currentVideo.pause();
        btn.innerHTML = "▶";
      }
    });

    currentVideo.addEventListener("ended", () => {
      btn.innerHTML = "▶";
    });
  });

  /* ---------------- SECTION ANIMATIONS ---------------- */
  const sections = document.querySelectorAll("section");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------------- ABOUT TEXT FADE-IN ---------------- */
  const aboutText = document.querySelector(".about-text");
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutText.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  if (aboutText) aboutObserver.observe(aboutText);

  /* ---------------- PROFILE GLOW EFFECT ---------------- */
  const profile = document.querySelector(".profile-wrapper");
  if (profile) {
    let glow = 0;
    let direction = 1;

    setInterval(() => {
      glow += direction * 0.1;
      if (glow > 1.5 || glow < 0.5) direction *= -1;

      profile.style.boxShadow = `
        0 0 ${20 + glow * 10}px rgba(255,0,60,0.8),
        0 0 ${30 + glow * 15}px rgba(255,42,109,0.6)
      `;
    }, 100);
  }

  /* ---------------- HAMBURGER MENU ---------------- */
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("nav-links");

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinksContainer.classList.toggle("show");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinksContainer.classList.remove("show");
      });
    });
  }
});
