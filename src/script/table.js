document.head.querySelector('style') || document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
    table {
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid black;
      padding: 4px;
    }
    th {
      cursor: pointer;
    }
    th:hover {
      background: yellow;
    }
  </style>`
);
document.body.querySelector('#grid') || document.body.insertAdjacentHTML(
  "afterbegin",
  `<table id="grid">
    <thead>
      <tr>
        <th data-type="number">Age</th>
        <th data-type="string">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>5</td>
        <td>John</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Pete</td>
      </tr>
      <tr>
        <td>12</td>
        <td>Ann</td>
      </tr>
      <tr>
        <td>9</td>
        <td>Eugene</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Ilya</td>
      </tr>
    </tbody>
  </table>
`
);

function tableHandle(table) {
  table.addEventListener("click", (event) => {
    if (event.target.tagName !== "TH") return;
    let th = event.target;
    // cellIndex is the number of th:
    //   0 for the first column
    //   1 for the second column, etc
    sortGrid(table, th.cellIndex, th.dataset.type);
  });
}

function sortGrid(table, colNum, type) {
  let tbody = table.querySelector("tbody");

  let rowsArray = Array.from(tbody.rows);

  // compare(a, b) compares two rows, need for sorting
  let compare;

  switch (type) {
    case "number":
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
      };
      break;
    case "string":
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
          ? 1
          : -1;
      };
      break;
  }

  // sort
  rowsArray.sort(compare);

  tbody.append(...rowsArray);
}

export default () => {
  tableHandle(grid);
};
