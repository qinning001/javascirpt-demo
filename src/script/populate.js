document.body.innerHTML = `
<h1>Scroll me</h1>
`;

function populate() {
  while (true) {
    let windowRelativeBottom =
      document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom > document.documentElement.clientHeight + 10)
      break;
    if (document.documentElement.offsetHeight > 2000) break;
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}

window.addEventListener("scroll", populate);

export default () => {
  populate(); // init document
};
