import "./style.css";
import { animate, stagger, createTimeline } from "animejs";

// const logoImage = document.querySelector(".logo");
// const dont = document.querySelector(".dont");
// const rotate = document.querySelector(".rotate");

// animate(".box", {
//   x: { from: 100, to: 400 },
//   rotate: "1turn",
//   duration: 1500,
//   ease: "outExpo",
//   loop: true,
//   alternate: true,
//   autoplay: false,
// });

// animate(".ball", {
//   y: 300,
//   opacity: 0,
//   duration: 10000,
//   ease: "outExpo",
// });

// dont.addEventListener("click", () => {
// 	animate(dont, { x: "+=50", duration: 300 });
// });

// rotate.addEventListener("click", () => {
// 	animate(logoImage, {
// 		rotate: "+=90",
// 		duration: 500,
// 		ease: "outExpo",
// 	});
// });

// animate(".box", {
//   opacity: {
//     from: 0,
//     to: 1,
//     duration: 400,
//   },
//   y: {
//     from: 800,
//     duration: 800,
//     ease: "outElastic",
//   },
//   duration: 500,
// });

// animate(".box", {
//   opacity: [0, 1],
//   y: [40, 0],
//   delay: stagger(100, {from: "last"}),
//   // scale: stagger([1, 0.1]),
// });

// animate(".stagger-item", {
// 	opacity: [0, 1],
// 	y: [20, 0],
// 	delay: stagger(80, { from: "center" }),
// 	ease: "outQuad",
// });

// animate(".box", {
//   x: [
//     { to: 100 },
//     { to: 100, duration: 500 },
//     { to: 500 },
//     { to: 500, duration: 500 },
//     { to: 0 },
//   ],
//   // delay: stagger(100, { from: "random" }),
//   delay: 500,
//   duration: 500,
// });

const tl = createTimeline({});

tl.add(".box0", {
  x: 600,
  duration: 800,
  ease: "inOutCubic",
})
  .add(".box1", {
    x: 600,
    duration: 800,
    ease: "inOutCubic",
  },"-=500")
  .add(".box2", {
    x: 600,
    duration: 800,
    ease: "inOutCubic",
  })
  .add(".box3", {
    x: 600,
    duration: 800,
    ease: "inOutCubic",
  });
