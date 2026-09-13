const lerp = (a, b, n) => (1 - n) * a + n * b;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

// Cursor Animation

const cursor = document.querySelector(".cursor");

let mouseX = 9999;
let mouseY = 9999;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let cx = mouseX,
  cy = mouseY,
  cursorLastX = mouseX,
  cursorLastY = mouseY;

function animate() {
//   // Move the cursor towards the real cursor a little each frame -> the "lage"
  cx = lerp(cx, mouseX, 0.18);
  cy = lerp(cy, mouseY, 0.18);

//   // Speed + direction from how far the mouse moved since last frame
  const vx = mouseX - cursorLastX;
  const vy = mouseY - cursorLastY;
  cursorLastX = mouseX;
  cursorLastY = mouseY;
  const speed = clamp(Math.hypot(vx, vy), 0, 40);
  const stretch = 1 + speed / 60;
  const angle = Math.atan2(vx, vy) * (180 / Math.PI);

  cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) rotate(${angle}deg) scale(${stretch}) scaleY(${1 / (stretch * 0.4 + 0.6)})`;

  requestAnimationFrame(animate);
}
animate();

// Pointer Field Animation

const title = document.getElementById("hero-title");

// Split each word into one <span class="ch"> per character
title.querySelectorAll(".word").forEach((word) => {
  const text = word.textContent;
  word.textContent = "";
  [...text].forEach((ch) => {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = ch;
    word.appendChild(span);
  });
});

const chars = [...title.querySelectorAll(".ch")];
const state = chars.map(() => ({ x: 0, y: 0, tx: 0, ty: 0 }));
let rects = [];

// Measure each character's center once, and again on resize - never inside the animation loop, it's expensive
function measure() {
  rects = chars.map((el) => {
    const r = el.getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  });
}
measure();
window.addEventListener("resize", measure);

const RADIUS = 320;
const STRENGTH = 42;

function animate2() {
  for (let i = 0; i < chars.length; i++) {
    const r = rects[i];
    const d = dist(mouseX, mouseY, r.cx, r.cy);

    if (d < RADIUS) {
      const falloff = 1 - d / RADIUS; // 1 = right at the cursor, 0 = at the edge
      const angle = Math.atan2(r.cy - mouseY, r.cx - mouseX);
      state[i].tx = Math.cos(angle) * falloff * STRENGTH;
      state[i].ty = Math.sin(angle) * falloff * STRENGTH;
    } else {
      state[i].tx = 0;
      state[i].ty = 0;
    }

    state[i].x = lerp(state[i].x, state[i].tx, 0.14);
    state[i].y = lerp(state[i].y, state[i].ty, 0.14);
    chars[i].style.transform =
      `translate3d(${state[i].x}px, ${state[i].y}px, 0)`;
  }
  requestAnimationFrame(animate2);
}
animate2();

// Image Trail Effect

const zone = document.querySelector("[data-trail-zone]");
const layer = document.getElementById("trail-layer");

const images = [
  "./assets/phanto-blood.webp",
  "./assets/battle-tendency.webp",
  "./assets/stardust-crusaders.webp",
  "./assets/diamon-is-unbreakable.webp",
  "./assets/golden-wind.webp",
  "./assets/stone-oceans.webp",
  "./assets/steel-ball-run.webp",
  "./assets/jojolion.webp",
  "./assets/the-jojolands.webp",
];

// Pre-create a fixed pool of elements and reuse them - cheaper than creating a new <img> on every mousemove
const POOL_SIZE = images.length;
const pool = [];
for (let i = 0; i < POOL_SIZE; i++) {
  const el = document.createElement("div");
  el.className = "trail-item";
  const img = document.createElement("img");
  img.src = images[i % images.length];
  img.addEventListener("error", () => {
    img.src = images[0];
  }, { once: true });
  el.appendChild(img);
  layer.appendChild(el);
  pool.push(el);
}

let poolIndex = 0;
let lastX = null,
  lastY = null;
let inside = false;

zone.addEventListener("mouseenter", () => {
  inside = true;
});
zone.addEventListener("mouseleave", () => {
  inside = false;
  lastX = null;
  lastY = null;
});

window.addEventListener("mousemove", (e) => {
  if (!inside) return;
  if (lastX == null) {
    lastX = e.clientX;
    lastY = e.clientY;
  }

  // Match the spawn distance to the larger cards so consecutive images stay readable.
  if (dist(e.clientX, e.clientY, lastX, lastY) < 220) return;
  lastX = e.clientX;
  lastY = e.clientY;

  const el = pool[poolIndex % POOL_SIZE];
  poolIndex++;
  const rot = (Math.random() * 16 - 8).toFixed(1);

  el.classList.remove("show");
  el.style.transition = "none";
  el.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 190}px, 0) scale(.6) rotate(${rot}deg)`;
  void el.offsetWidth; // force reflow so the transition restarts cleanly

  el.style.transition = "";
  requestAnimationFrame(() => {
    el.classList.add("show");
    el.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 190}px, 0) scale(1) rotate(${rot}deg)`;
  });

  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => {
    el.classList.remove("show");
    el.style.transform += " scale(0.8)";
  }, 820);
});
