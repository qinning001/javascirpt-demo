// 节流
// 装饰一个函数,在delay时间内,调用多次时,只执行第一次
function throttle(fn, delay) {
  let last = 0; // 上次触发时间
  return (...args) => {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn(args);
    }
  };
}

export default () => {
  // 测试
  const task = () => {
    console.log("run throttle task");
  };
  const throttleTask = throttle(task, 1000);
  // window.addEventListener("scroll", throttleTask);

  throttleTask();
  throttleTask();
  throttleTask();
};
