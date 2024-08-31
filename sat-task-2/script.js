// document.body.addEventListener("load", (e) => {
//   const hidden = document.querySelector(".timezone");
//   console.log(hidden);
//   hidden.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
// });

const hidden = document.querySelector(".timezone");
hidden.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
