const hasTree = document.body.querySelector("#tree");
hasTree ||
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
    .tree span:hover {
      font-weight: bold;
    }

    .tree span {
      cursor: pointer;
    }
  </style>`
  );
hasTree ||
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
  <ul class="tree" id="tree">
    <li>Animals
      <ul>
        <li>Mammals
          <ul>
            <li>Cows</li>
            <li>Donkeys</li>
            <li>Dogs</li>
            <li>Tigers</li>
          </ul>
        </li>
        <li>Other
          <ul>
            <li>Snakes</li>
            <li>Birds</li>
            <li>Lizards</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>Fishes
      <ul>
        <li>Aquarium
          <ul>
            <li>Guppy</li>
            <li>Angelfish</li>
          </ul>
        </li>
        <li>Sea
          <ul>
            <li>Sea trout</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
`
  );
if (!hasTree) {
  for (let li of tree.querySelectorAll("li")) {
    let span = document.createElement("SPAN");
    li.prepend(span);
    span.append(span.nextSibling); // move the text node into span
  }
}

function treeHandle(elem) {
  elem.onclick = (event) => {
    if (event.target.tagName !== "SPAN") return;
    const ul = event.target.parentNode.querySelector("ul");
    if (ul === null) return;

    ul.hidden = !ul.hidden;
  };
}

export default () => {
  treeHandle(tree);
};
