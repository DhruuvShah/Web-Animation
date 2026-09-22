import './style.css'
import gsap from "gsap";


gsap.to(".box", {
  x: 300,        // move 300px right
  rotation: 360, // spin a full turn
  duration: 2,   // over 2 seconds
  ease: "power2.out"
});