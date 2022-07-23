document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
    .tooltip {
      position: fixed;
      padding: 10px 20px;
      border: 1px solid #b3c9ce;
      border-radius: 4px;
      text-align: center;
      font: italic 14px/1.3 sans-serif;
      color: #333;
      background: #fff;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
    }
  </style>`
);
document.body.innerHTML = `
<p>LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa</p>
<p>LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa</p>

<button data-tooltip="the tooltip is longer than the element">Short button</button>
<button data-tooltip="HTML<br>tooltip">One more button</button>

<p>Scroll the page to make buttons appear on the top, check if the tooltips show up correctly.</p>`;

function tooltipHandle() {
  let tooltipElem;

  document.onmouseover = (event) => {
    let target = event.target;

    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) return;

    tooltipElem = document.createElement("div");
    tooltipElem.className = "tooltip";
    tooltipElem.innerHTML = tooltipHtml;
    document.body.append(tooltipElem);

    let coords = target.getBoundingClientRect();

    // x坐标计算：左上角+（目标元素宽度-生成元素宽度）/ 2
    // 最小为 0，不然会从左边超出屏幕
    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0; 

    // y坐标计算：左上角 - 生成元素高度 - 5
    // 如果小于 0，会从上面超出元素，需要把生成元素放在目标元素下面
    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) {
      top = coords.top + target.offsetHeight + 5;
    }

    tooltipElem.style.left = left + "px";
    tooltipElem.style.top = top + "px";
  };
  document.onmouseout = (event) => {
    if (tooltipElem) {
      tooltipElem.remove();
      tooltipElem = null;
    }
  };
}
export default () => {
  tooltipHandle();
};
