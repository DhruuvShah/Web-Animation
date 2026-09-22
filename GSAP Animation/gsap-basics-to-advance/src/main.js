import "./style.css";
import gsap from "gsap";

gsap.fromTo(
  ".box",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    duration: 1,
  },
);
