(function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const yearEl = document.getElementById("year");

  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Burger toggle
  function setMenu(open) {
    if (!navMenu || !hamburgerBtn) return;
    navMenu.classList.toggle("open", open);
    burgerBtn.setAttribute("aria-expanded", String(open));
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("open");
      setMenu(!isOpen);
    });
  }

  // Close menu when click link (mobile)
  if (navMenu) {
    navMenu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      if (window.matchMedia("(max-width: 760px)").matches) setMenu(false);
    });
  }

  // Close on outside click (mobile)
  document.addEventListener("click", (e) => {
    if (!navMenu || !hamburgerBtn) return;
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    const inside = navMenu.contains(e.target) || hamburgerBtn.contains(e.target);
    if (!inside) setMenu(false);
  });

  // Escape closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  // Active nav based on body[data-page]
  const page = document.body.getAttribute("data-page");
  const links = document.querySelectorAll(".nav-link[data-link]");
  links.forEach((l) => {
    l.classList.toggle("active", l.getAttribute("data-link") === page);
  });

  // Gallery tilt (optional)
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -8;
      const ry = ((x / r.width) - 0.5) * 10;
      el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    });
  });

  // Contact form (only runs on contact.html)
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formNote) {
        formNote.textContent = "";
        formNote.style.color = "";
      }

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const subject = String(data.get("subject") || "").trim();
      const message = String(data.get("message") || "").trim();

      const fail = (msg) => {
        if (!formNote) return;
        formNote.textContent = msg;
        formNote.style.color = "#ffb4b4";
      };

      if (name.length < 2) return fail("Nama minimal 2 karakter.");
      if (!isEmail(email)) return fail("Format email belum valid.");
      if (subject.length < 3) return fail("Subjek minimal 3 karakter.");
      if (message.length < 10) return fail("Pesan minimal 10 karakter.");

      form.reset();
      if (formNote) {
        formNote.textContent = "Pesan terkirim (simulasi). Nanti bisa disambungkan ke backend/email service.";
        formNote.style.color = "#a7ffcc";
      }
    });
  }
})();
