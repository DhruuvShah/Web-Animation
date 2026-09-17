document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const animated = document.querySelectorAll(".animate-up");
  setTimeout(() => {
    overlay.classList.add("done");
    setTimeout(() => animated.forEach((el) => el.classList.add("done"), 500));
  }, 300);

  const p2ColLeft = document.getElementById("p2ColLeft");
  const p2ColRight = document.getElementById("p2ColRight");
  const cardAccount = document.getElementById("cardAccount");
  const cardRevops = document.getElementById("cardRevops");
  const cardFunnel = document.getElementById("cardFunnel");

  if (!p2ColLeft) return;

  let state = "funnel";
  let busy = false;
  const EASE = "cubic-bezier(.4,0,.2,1)";
  const FLIP_MS = 700;
  const FADE_MS = 200;

  const getH = (el) => el.getBoundingClientRect().height;

  function morphCols(LA, LB, rA, rB, ms, cb) {
    const t0 = performance.now();
    const eio = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    (function tick(now) {
      const p = Math.min((now - t0) / ms, 1),
        e = eio(p);

      p2ColLeft.style.flexGrow = LA + (LB - LA) * e;
      p2ColRight.style.flexGrow = rA + (rB - rA) * e;

      p < 1 ? requestAnimationFrame(tick) : cb?.();
    })(t0);
  }

  function flipCards(pairs, ms = FLIP_MS, cb) {
    if (typeof ms === "function") {
      cb = ms;
      ms = FLIP_MS;

      pairs.forEach(({ card, startH }) => {
        card.style.flex = "none";
        card.style.height = startH + "px";
      });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          pairs.forEach(({ card, endH }) => {
            card.style.transition = `height ${ms} ${EASE}`;
            card.style.height = endH + "px";
          });

          setTimeout(() => {
            pairs.forEach(({ card }) => {
              card.style.transition = "";
              card.style.height = "";
              card.style.flex = "";
            });
            cb?.();
          }, ms + 20);
        }),
      );
    }

    
  }
});
