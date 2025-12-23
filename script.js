const openButton = document.getElementById("openLetter");
const intro = document.getElementById("intro");
const letter = document.getElementById("letter");

const pages = document.querySelectorAll(".page.typewriter");
const nextButton = document.getElementById("nextPage");

const prefersReduced =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let currentPage = 0;
let typingStarted = false;
let typingTimer = null;

function normalizeText(raw) {
  return (raw || "").replace(/\n\s+/g, "\n").trim();
}

function cachePages() {
  pages.forEach((el) => {
    if (!el.dataset.twHtml) el.dataset.twHtml = el.innerHTML;
    if (!el.dataset.twText) el.dataset.twText = normalizeText(el.innerText);
    el.innerHTML = "";
    el.classList.remove("active");
    el.style.opacity = 0;
  });
}

function setNextEnabled(enabled) {
  if (!nextButton) return;
  nextButton.disabled = !enabled;
  nextButton.style.display = enabled ? "" : "";
}

function typeText(element, text, done) {
  let i = 0;
  const speed = 65; // baja = más rápido, sube = más lento

  clearInterval(typingTimer);
  typingTimer = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typingTimer);
      typingTimer = null;
      done && done();
    }
  }, speed);
}

function showPage(index) {
  if (index < 0 || index >= pages.length) return;

  pages.forEach((p) => {
    p.classList.remove("active");
    p.style.opacity = 0;
  });

  currentPage = index;
  const el = pages[currentPage];
  el.classList.add("active");
  el.innerHTML = "";
  el.style.opacity = 1;

  const isLast = currentPage === pages.length - 1;

  // Mientras escribe, no dejar avanzar
  nextButton.disabled = true;

  if (prefersReduced) {
    el.innerHTML = el.dataset.twHtml || "";
    nextButton.disabled = isLast;
    return;
  }

  const text = el.dataset.twText || "";
  el.classList.add("typing");

  typeText(el, text, () => {
    el.classList.remove("typing");
    // restaurar HTML (firma con <span>, etc.)
    if (el.dataset.twHtml) el.innerHTML = el.dataset.twHtml;
    nextButton.disabled = isLast;
  });
}

openButton.addEventListener("click", () => {
  if (typingStarted) return;
  typingStarted = true;

  intro.classList.add("hidden");
  letter.classList.remove("hidden");

  cachePages();
  showPage(0);
});

nextButton.addEventListener("click", () => {
  if (nextButton.disabled) return;
  showPage(currentPage + 1);
});

/* Nieve ligera generada en JS (sin assets externos) */
(function createSnow() {
  if (prefersReduced) return;
  const count = 80;
  for (let i = 0; i < count; i++) {
    const flake = document.createElement("div");
    flake.className = "flake";
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const fallDur = 10 + Math.random() * 18;
    const swayDur = 3 + Math.random() * 5;

    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.left = `${left}vw`;
    flake.style.animationDuration = `${fallDur}s, ${swayDur}s`;
    flake.style.animationDelay = `${delay}s, ${delay / 2}s`;

    document.body.appendChild(flake);
  }
})();