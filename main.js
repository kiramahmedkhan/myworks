(function () {
  const body = document.body;
  body.classList.add("loading");
  let loaderHidden = false;

  function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;
    document.getElementById("site-loader")?.classList.add("is-hidden");
    body.classList.remove("loading");
  }

  window.addEventListener("load", function () {
    window.setTimeout(hideLoader, 350);
  });

  document.addEventListener("DOMContentLoaded", function () {
    window.setTimeout(hideLoader, 900);

    if (window.lucide) {
      window.lucide.createIcons();
    }

    const header = document.querySelector("[data-site-header]");
    const progress = document.getElementById("scroll-progress");
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");

    function updateChrome() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const amount = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (progress) progress.style.width = amount + "%";
      if (header) header.classList.toggle("is-scrolled", doc.scrollTop > 20);
    }

    updateChrome();
    window.addEventListener("scroll", updateChrome, { passive: true });

    function setNavIcon(name) {
      if (!navToggle) return;
      const icon = navToggle.querySelector("svg, i");
      if (icon) icon.outerHTML = '<i data-lucide="' + name + '"></i>';
      if (window.lucide) window.lucide.createIcons();
    }

    navToggle?.addEventListener("click", function () {
      const isOpen = nav?.classList.toggle("is-open");
      header?.classList.toggle("is-open", Boolean(isOpen));
      body.classList.toggle("nav-open", Boolean(isOpen));
      navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
      setNavIcon(isOpen ? "x" : "menu");
    });

    nav?.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        header?.classList.remove("is-open");
        body.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");
        setNavIcon("menu");
      });
    });

    const rotator = document.querySelector(".role-rotator span");
    const roleSource = document.querySelector(".role-rotator")?.dataset.roles;
    if (rotator && roleSource) {
      const roles = roleSource.split("|");
      let roleIndex = 0;
      let charIndex = 0;
      let removing = false;

      function typeRole() {
        const current = roles[roleIndex];
        rotator.textContent = removing ? current.slice(0, charIndex - 1) : current.slice(0, charIndex + 1);
        charIndex += removing ? -1 : 1;

        if (!removing && charIndex === current.length) {
          removing = true;
          window.setTimeout(typeRole, 1200);
          return;
        }

        if (removing && charIndex === 0) {
          removing = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }

        window.setTimeout(typeRole, removing ? 42 : 72);
      }

      typeRole();
    }

    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (dot && ring && finePointer) {
      let mouseX = 0;
      let mouseY = 0;
      let ringX = 0;
      let ringY = 0;

      window.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
      });

      function cursorLoop() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
        window.requestAnimationFrame(cursorLoop);
      }

      cursorLoop();

      document.querySelectorAll("a, button, .magnetic, iframe").forEach(function (item) {
        item.addEventListener("mouseenter", function () {
          ring.classList.add("is-hovering");
        });
        item.addEventListener("mouseleave", function () {
          ring.classList.remove("is-hovering");
        });
      });
    }

    document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
      const images = Array.from(gallery.querySelectorAll("img"));
      if (!images.length) return;
      let index = 0;
      images[0].classList.add("is-active");
      if (images.length === 1) return;

      window.setInterval(function () {
        images[index].classList.remove("is-active");
        index = (index + 1) % images.length;
        images[index].classList.add("is-active");
      }, 2200);
    });

    document.querySelectorAll('a[aria-disabled="true"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
      });
    });

    if (window.gsap) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReducedMotion) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        window.gsap.utils.toArray(".reveal-up").forEach(function (element) {
          window.gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true
            }
          });
        });

        const driftImage = document.querySelector("[data-drift-image] img");
        if (driftImage) {
          window.gsap.fromTo(driftImage, { y: -42, scale: 0.96 }, {
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-section",
              start: "top bottom",
              end: "center center",
              scrub: true
            }
          });
        }
      } else {
        document.querySelectorAll(".reveal-up").forEach(function (element) {
          element.style.opacity = "1";
          element.style.transform = "none";
        });
      }
    } else {
      document.querySelectorAll(".reveal-up").forEach(function (element) {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
    }
  });
})();
