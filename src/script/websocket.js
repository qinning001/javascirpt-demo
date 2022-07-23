document.body.innerHTML = `
<!-- 消息表单 -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- 带有消息的 div -->
<div id="messages"></div>
`;

let socket = new WebSocket("ws://127.0.0.1:8765/");

// 从表单发送消息
document.forms.publish.onsubmit = function () {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// 收到消息 —— 在 div#messages 中显示消息
socket.onmessage = function (event) {
  let message = event.data;

  let messageElem = document.createElement("div");
  messageElem.textContent = message;
  document.getElementById("messages").prepend(messageElem);
};
export default () => {};
