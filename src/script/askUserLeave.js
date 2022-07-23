document.querySelector("#contents") ||
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
    #contents {
      padding: 5px;
      border: 1px green solid;
    }
  </style>`
  );
document.body.innerHTML = `
<fieldset id="contents">
  <legend>#contents</legend>
  <p>
    How about to read <a href="https://wikipedia.org">Wikipedia</a> or visit <a href="https://w3.org"><i>W3.org</i></a> and learn about modern standards?
  </p>
</fieldset>`;

function userLeaveHandle(elem) {
  elem.onclick = (event) => {
    function handleLink(href) {
      let isLeaving = confirm(`Leave for ${href}?`);
      if (!isLeaving) return false;
    }

    let target = event.target.closest("a");

    if (target && elem.contains(target)) {
      return handleLink(target.getAttribute("href"));
    }
  };
}

export default () => {
  userLeaveHandle(contents);
};
