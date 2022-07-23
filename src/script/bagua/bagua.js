import "./bagua.css";
document.body.innerHTML = `
<p>Click on a table cell to edit it. Press OK or CANCEL when you finish.</p>

<table id="bagua-table">
  <tr>
    <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
  </tr>
  <tr>
    <td class="nw"><strong>Northwest</strong>
      <br>Metal
      <br>Silver
      <br>Elders
    </td>
    <td class="n"><strong>North</strong>
      <br>Water
      <br>Blue
      <br>Change
    </td>
    <td class="ne"><strong>Northeast</strong>
      <br>Earth
      <br>Yellow
      <br>Direction
    </td>
  </tr>
  <tr>
    <td class="w"><strong>West</strong>
      <br>Metal
      <br>Gold
      <br>Youth
    </td>
    <td class="c"><strong>Center</strong>
      <br>All
      <br>Purple
      <br>Harmony
    </td>
    <td class="e"><strong>East</strong>
      <br>Wood
      <br>Blue
      <br>Future
    </td>
  </tr>
  <tr>
    <td class="sw"><strong>Southwest</strong>
      <br>Earth
      <br>Brown
      <br>Tranquility
    </td>
    <td class="s"><strong>South</strong>
      <br>Fire
      <br>Orange
      <br>Fame
    </td>
    <td class="se"><strong>Southeast</strong>
      <br>Wood
      <br>Green
      <br>Romance
    </td>
  </tr>

</table>`;

let table = document.getElementById('bagua-table');
let editingTd;

table.onclick = (event) => {
  // 找到td元素
  let target = event.target.closest('.edit-cancel,.edit-ok,td');

  if (!table.contains(target)) return;

  if (target.className == 'edit-cancel') {
    finishTdEdit(editingTd.elem, false);
  } else if (target.className == 'edit-ok') {
    finishTdEdit(editingTd.elem, true);
  } else if (target.nodeName == 'TD') {
    if (editingTd) return; // 已经存在

    makeTdEditable(target);
  }
}

function makeTdEditable(td) {

  editingTd = {
    elem: td,
    data: td.innerHTML
  };

  td.classList.add('edit-td'); // td is in edit state, CSS also styles the area inside

  let textArea = document.createElement('textarea');
  textArea.style.width = td.clientWidth + 'px';
  textArea.style.height = td.clientHeight + 'px';
  textArea.className = 'edit-area';

  textArea.value = td.innerHTML;
  td.innerHTML = '';
  td.appendChild(textArea);
  textArea.focus();

  td.insertAdjacentHTML("beforeEnd",
    '<div class="edit-controls"><button class="edit-ok">OK</button><button class="edit-cancel">CANCEL</button></div>'
  );
}

function finishTdEdit(td, isOk) {
  if (isOk) {
    td.innerHTML = td.firstChild.value;
  } else {
    td.innerHTML = editingTd.data;
  }
  td.classList.remove('edit-td');
  editingTd = null;
}

export default () => {};
