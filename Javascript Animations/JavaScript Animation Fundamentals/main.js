for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 — because `let`
}