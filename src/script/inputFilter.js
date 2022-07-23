document.body.innerHTML = `
<input id="inputFilter" placeholder="请输入手机号" type="tel">
`;
function checkPhoneKey(key) {
  return (
    (key >= "0" && key <= "9") ||
    [
      "+",
      "(",
      ")",
      "-",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Backspace",
    ].includes(key)
  );
}
export default () => {
  inputFilter.onkeydown = (event) => {
    return checkPhoneKey(event.key);
  };
};
