import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.set(".image-div img", {
  clipPath: "inset(33% 28% 28% 32%)",
  scale: 1.4,
});

gsap.to(".image-div img", {
  clipPath: "inset(0% 0% 0% 0%)",
  scale: 1,
  scrollTrigger: {
    trigger: ".scroll-element",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
  },
});

// const obj = {
//   value: 0,
// };

// const counter = document.querySelector(".loader-count h2");
// gsap.to(obj, {
//   value: 100,
//   duration: 1.7,
//   ease: "none",
//   onUpdate: () => {
//     counter.textContent = `${Math.round(obj.value)}%`;
//   },
//   onComplete: () => {
//     gsap.to(counter, {
//       opacity: 0,
//       duration: 1.2,
//       ease: "power3.out",
//       onComplete: () => {
//         tl.play();
//       },
//     });
//   },
// });

// const tl = gsap.timeline({ paused: true });

// gsap.set([".heading h1", ".sub-heading p"], {
//   yPercent: 110,
// });

// tl.to(".loader", {
//   yPercent: 100,
//   duration: 1.2,
//   ease: "expo.out",
// })
//   .from(
//     ".hero-bg img",
//     {
//       scale: 1.5,
//       duration: 1.3,
//       ease: "expo.out",
//     },
//     "-=1.1",
//   )
//   .to(
//     ".heading h1",
//     {
//       yPercent: 0,
//       duration: 1.1,
//       ease: "power3.out",
//     },
//     "-=0.9",
//   ).to(
//     ".sub-heading p",
//     {
//       yPercent: 0,
//       duration: 1.1,
//       ease: "power3.out",
//     },
//     "-=0.8",
//   );
