// 鼠标快速划过不显示内容
// 鼠标停留显示内容
document.querySelector("#elem") ||
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
      .hours {
        color: red;
      }

      .minutes {
        color: green;
      }
      
      .seconds {
        color: blue;
      }
      
      .clock {
        border: 1px dashed black;
        padding: 5px;
        display: inline-block;
        background: yellow;

      }
      
      #tooltip {
        position: absolute;
        padding: 10px 20px;
        border: 1px solid #b3c9ce;
        border-radius: 4px;
        text-align: center;
        font: italic 14px/1.3 sans-serif;
        color: #333;
        background: #fff;
        z-index: 100000;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
      }
    </style>`
  );
document.body.innerHTML = `
<div id="elem" class="clock">
  <span class="hours">12</span> :
  <span class="minutes">30</span> :
  <span class="seconds">00</span>
</div>

<div id="tooltip" hidden>Tooltip</div>`;
class HoverIntent {
  constructor({
    sensitivity = 0.1, // 灵敏度，速度小于 0.1px/ms 意味着“悬停在一个元素上”
    interval = 100, // 每 100 毫秒测量一次鼠标速度
    elem,
    over,
    out,
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // 确保“this”是事件处理程序中的对象。
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // 在时间测量函数中（从 setInterval 调用）
    this.trackSpeed = this.trackSpeed.bind(this);

    elem.addEventListener("mouseover", this.onMouseOver);

    elem.addEventListener("mouseout", this.onMouseOut);
  }

  onMouseOver(event) {
    if (this.isOverElement) {
      // 如果我们超过了元素，则忽略该事件
      // 因为已经在测量速度
      return;
    }

    this.isOverElement = true;

    // 每次鼠标移动后，我们将检查距离 
    // 在前一个和当前鼠标坐标之间
    // 如果小于灵敏度，则速度慢

    this.prevX = event.pageX;
    this.prevY = event.pageY;
    this.prevTime = Date.now();

    elem.addEventListener("mousemove", this.onMouseMove);
    this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
  }

  onMouseOut(event) {
    // 如果离开元素
    if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
      this.isOverElement = false;
      this.elem.removeEventListener("mousemove", this.onMouseMove);
      clearInterval(this.checkSpeedInterval);
      if (this.isHover) {
        // 如果在元素上有一个停止
        this.out.call(this.elem, event);
        this.isHover = false;
      }
    }
  }

  onMouseMove(event) {
    this.lastX = event.pageX;
    this.lastY = event.pageY;
    this.lastTime = Date.now();
  }

  trackSpeed() {
    let speed;

    if (!this.lastTime || this.lastTime == this.prevTime) {
      // 光标没有移动
      speed = 0;
    } else {
      speed =
        Math.sqrt(
          Math.pow(this.prevX - this.lastX, 2) +
            Math.pow(this.prevY - this.lastY, 2)
        ) /
        (this.lastTime - this.prevTime);
    }

    if (speed < this.sensitivity) {
      clearInterval(this.checkSpeedInterval);
      this.isHover = true;
      this.over.call(this.elem, event);
    } else {
      // 速度快，记住新坐标和以前的坐标一样
      this.prevX = this.lastX;
      this.prevY = this.lastY;
      this.prevTime = this.lastTime;
    }
  }

  destroy() {
    elem.removeEventListener("mousemove", this.onMouseMove);
    elem.removeEventListener("mouseover", this.onMouseOver);
    elem.removeEventListener("mouseout", this.onMouseOut);
  }
}

export default () => {
  // 一个简单的工具提示
  let tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.innerHTML = "Tooltip";

  // 该对象将跟踪鼠标，并调用 over/out
  new HoverIntent({
    elem,
    over() {
      tooltip.style.left = elem.getBoundingClientRect().left + "px";
      tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + "px";
      document.body.append(tooltip);
    },
    out() {
      tooltip.remove();
    },
  });
};
