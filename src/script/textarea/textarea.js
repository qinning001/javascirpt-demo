import "./textarea.css";

document.body.innerHTML = `
<ul>
<li>点击下面的这个 div 来进行编辑。</li>
<li>按 Enter 键或者通过 blur 来保存结果。</li>
</ul>

允许输入 HTML。

<div id="view" class="view">Text</div>
`;

let area = null;
let view = document.getElementById("view");

view.onclick = () => {
  editStart();
};

function editStart(event) {
  // 创建 textarea 对象
  area = document.createElement("textarea");
  area.className = "edit";
  area.value = view.innerHTML;

  // 绑定 enter 按键
  area.onkeydown = (event) => {
    if (event.key === "Enter") {
      this.blur();
    }
  };

  area.onblur = (event) => {
    editEnd();
  };

  // 替换 view
  view.replaceWith(area);
  area.focus();
}

function editEnd() {
  view.innerHTML = area.value;
  area.replaceWith(view);
}

export default () => {};
