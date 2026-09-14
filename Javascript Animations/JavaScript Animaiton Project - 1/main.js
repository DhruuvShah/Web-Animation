document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const animated = document.querySelectorAll(".animate-up");
  setTimeout(() => {
    overlay.classList.add("done");
    setTimeout(() => animated.forEach((el) => el.classList.add("done"), 500));
  }, 300);
});
