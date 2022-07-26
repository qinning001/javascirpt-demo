document.head.insertAdjacentHTML(
  "afterend",
  `
  <style>
  .circle {
    transition-property: width, height, margin-left, margin-top;
    transition-duration: 2s;
    position: fixed;
    transform: translateX(-50%) translateY(-50%);
    background-color: red;
    border-radius: 50%;
  }
  </style>
`
);

document.body.innerHTML = `
<button id="button">showCircle(150, 150, 100)</button>
`;

function showCircle(cx, cy, radius) {
  let div = document.createElement("div");
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + "px";
  div.style.top = cy + "px";
  div.className = "circle";
  document.body.append(div);

  setTimeout(() => {
    div.style.width = radius * 2 + "px";
    div.style.height = radius * 2 + "px";
  }, 0);
}
export default () => {
  button.onclick = () => {
    showCircle(150, 150, 100);
  };
};
