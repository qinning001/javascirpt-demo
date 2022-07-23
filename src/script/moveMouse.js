const hasMouse = document.body.querySelector("#mouse");
hasMouse ||
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
      #mouse {
        display: inline-block;
        cursor: pointer;
        margin: 0;
      }

      #mouse:focus {
        outline: 1px dashed black;
      }
    </style>`
  );

document.body.innerHTML = String.raw`
<p>用鼠标点击以下老鼠，并使用键盘的方向键移动它。</p>
<pre id="mouse">
 _   _
(q\_/p)
 /. .\
=\_t_/=   __
 /   \   (
((   ))   )
/\) (/\  /
\  Y  /-'
 nn^nn
</pre>

`;
mouse.tabIndex = 0;

mouse.onclick = function () {
  this.style.left = this.getBoundingClientRect().left + "px";
  this.style.top = this.getBoundingClientRect().top + "px";

  this.style.position = "fixed";
};

mouse.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowLeft":
      this.style.left = parseInt(this.style.left) - this.offsetWidth + "px";
      return false;
    case "ArrowUp":
      this.style.top = parseInt(this.style.top) - this.offsetHeight + "px";
      return false;
    case "ArrowRight":
      this.style.left = parseInt(this.style.left) + this.offsetWidth + "px";
      return false;
    case "ArrowDown":
      this.style.top = parseInt(this.style.top) + this.offsetHeight + "px";
      return false;
  }
};
export default () => {};
