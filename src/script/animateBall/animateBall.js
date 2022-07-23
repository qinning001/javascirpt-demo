import "./animateBall.css";
import ballSrc from "./ball.svg";

document.body.innerHTML = `
<div id="field">
    <img width="40" height="40" id="ball">
  </div>
`;

ball.src = ballSrc;

function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction 从 0 增加到 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // 计算当前动画状态
    let progress = timing(timeFraction);

    draw(progress); // 绘制

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

function bounce(timeFraction) {
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

function quad(timeFraction) {
  return Math.pow(timeFraction, 2);
}

ball.onclick = function () {
  let height = field.clientHeight - ball.clientHeight;
  let width = 100;

  animate({
    duration: 2000,
    timing: makeEaseOut(bounce),
    draw: function (progress) {
      ball.style.top = height * progress + "px";
    },
  });

  animate({
    duration: 2000,
    timing: makeEaseOut(quad),
    draw: function (progress) {
      ball.style.left = width * progress + "px";
    },
  });
};

export default () => {};
