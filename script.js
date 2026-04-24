const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const countdown = document.querySelector("[data-countdown]");
const countdownDays = document.querySelector("[data-countdown-days]");
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-label", "Open navigation");
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const activateLink = () => {
  const current = sections
    .map((section) => ({
      id: section.id,
      top: Math.abs(section.getBoundingClientRect().top - 130),
    }))
    .sort((a, b) => a.top - b.top)[0];

  if (!current) return;

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
  });
};

const updateCountdown = () => {
  if (!countdown || !countdownDays) return;

  const targetTime = new Date(countdown.dataset.countdown).getTime();
  const remaining = targetTime - Date.now();
  const days = Math.max(0, Math.ceil(remaining / 86_400_000));
  countdownDays.textContent = String(days);
};

window.addEventListener("scroll", () => {
  updateHeader();
  activateLink();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    body.classList.remove("nav-open");
  }
});

updateHeader();
activateLink();
updateCountdown();
