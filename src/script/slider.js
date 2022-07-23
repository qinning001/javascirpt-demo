document.querySelector("#slider") ||
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
      .slider {
        border-radius: 5px;
        background: #E0E0E0;
        background: linear-gradient(left top, #E0E0E0, #EEEEEE);
        width: 310px;
        height: 15px;
        margin: 5px;
      }
      
      .thumb {
        width: 10px;
        height: 25px;
        border-radius: 3px;
        position: relative;
        left: 10px;
        top: -5px;
        background: blue;
        cursor: pointer;
      }
    </style>`
  );
document.body.innerHTML = `
<div id="slider" class="slider">
<div class="thumb"></div>
</div>`;

let thumb = slider.querySelector(".thumb");

thumb.onmousedown = function (event) {
  event.preventDefault(); // prevent selection start (browser action)

  let shiftX = event.clientX - thumb.getBoundingClientRect().left;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  function onMouseMove(event) {
    let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

    // the pointer is out of slider => lock the thumb within the bounaries
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = slider.offsetWidth - thumb.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumb.style.left = newLeft + "px";
  }

  function onMouseUp() {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  }
};

thumb.ondragstart = function () {
  return false;
};

export default () => {};
