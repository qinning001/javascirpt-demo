const container = document.createElement("div");
container.style.cssText = "height: 200vh; width: 100vh; overflow-y: scroll;";
const elem = document.createElement("div");
elem.id = "coordinate";
elem.style.cssText =
  "width: 100px; height: 100px; position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);background: #000;";
container.append(elem);
document.body.append(container);

// 基于窗口坐标
function createMessageUnderWindow(elem, html) {
  // 创建 message 元素
  let message = document.createElement("div");
  // 在这里最好使用 CSS class 来定义样式
  message.style.cssText = "position:fixed; color: red";

  // 分配坐标，不要忘记 "px"！
  let coords = elem.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}

// 获取元素的文档坐标
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

// 基于文档坐标
function createMessageUnder(elem, html) {
  let message = document.createElement("div");
  message.style.cssText = "position:absolute; color: red";

  let coords = getCoords(elem);

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}

export default () => {
  // 用法：
  // 在文档中添加 message 保持 5 秒
  let message = createMessageUnder(elem, "Hello, world!");
  // let message = createMessageUnderWindow(elem, "Hello, world!");
  document.body.append(message);
  // setTimeout(() => message.remove(), 5000);
};
