document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
.src {
    display: flex;
}

.dropabled {
    flex: 1;
}

.txt {
    color: green;
}

.img {
    width: 100px;
    height: 100px;
    border: 1px solid gray;
}

.target {
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    border: 1px solid gray;
    color: red;
}
</style>
`
);

document.body.innerHTML = `
<div class="src">
        <div class="dragabled">
            <div class="txt" id="txt">
                所有的文字都可拖拽。
                <p draggable="true">此段文字设置了属性draggable="true"</p>  
            </div>
            <div class="url" id="url">
                <a href="https://juejin.cn/post/6941194115392634888" target="_blank">我是url:https://juejin.cn/post/6941194115392634888</a>
            </div>
            <img class="img" id="tupian1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgiV-0c4xJmN5k9rZxxWQ8pvLncX62DuG5XikZwfUN7gz9SHCr7JmRKnMI0LGfilwwk0&usqp=CAU" alt="图片1" />
            <img class="img" id="tupian2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSATydu-JWg-iZmNbmBG50-btlqsNNLn3V0cjQstgD3-bS4pE1q03C21znZlwGcdoCF1tk&usqp=CAU" alt="图片2" />
        </div>
        <div id='target' class="dropabled target">Drop Here</div>
    </div>
`;

var dragSrc = document.getElementById("txt");
var target = document.getElementById("target");

dragSrc.ondragstart = handle_start;
dragSrc.ondrag = handle_drag;
dragSrc.ondragend = handle_end;

function handle_start(e) {
  console.log("dragstart-在元素开始被拖动时候触发");
}

function handle_drag() {
  console.log("drag-在元素被拖动时候反复触发");
}

function handle_end() {
  console.log("dragend-在拖动操作完成时触发");
}

target.ondragenter = handle_enter;
target.ondragover = handle_over;
target.ondragleave = handle_leave;

target.ondrop = handle_drop;

function handle_enter(e) {
  console.log("handle_enter-当元素进入目的地时触发");
  // 阻止浏览器默认行为
  e.preventDefault();
}

function handle_over(e) {
  console.log("handle_over-当元素在目的地时触发");
  // 阻止浏览器默认行为
  e.preventDefault();
}

function handle_leave(e) {
  console.log("handle_leave-当元素离开目的地时触发");
  // 阻止浏览器默认行为
  // e.preventDefault()
}

function handle_drop(e) {
  console.log("handle_drop-当元素在目的地放下时触发");
  var t = Date.now();
  target.innerHTML = "";
  target.append(t + "-拖放触发的事件。");
  e.preventDefault();
}

export default () => {};
