import "./style.css";
import gsap from "gsap";

gsap.to(".box", {
  x: 900,
  duration: 1.5,
  delay: 0.3,
  ease: "power3.out",
  stagger: -0.4,
});
