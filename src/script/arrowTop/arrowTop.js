import "./arrowTop.css";

const hasId = document.querySelector("#matrix");
document.body.innerHTML = `
  <div id="matrix"></div>
  <div id="arrowTop" hidden></div>
`;
if (!hasId) {
  for (let i = 0; i < 2000; i++) {
    console.log(i);
    matrix.innerHTML += " " + i + " ";
  }
}

arrowTop.onclick = function () {
  window.scrollTo(scrollX, 0);
  // after scrollTo, there will be a "scroll" event, so the arrow will hide automatically
};

window.addEventListener("scroll", function () {
  arrowTop.hidden = scrollY < document.documentElement.clientHeight;
});

export default () => {};
