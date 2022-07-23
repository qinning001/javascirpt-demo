// 装饰一个函数,在限定时间内,调用多次时,只执行最后一次
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    // 如果之前有定时任务,把之前任务清除掉
    if (timer) {
      clearTimeout(timer);
    }
    // 首次初始化定时任务,或重新设置定时任务
    timer = setTimeout(() => {
      fn(args);
    }, delay);
  };
}

export default () => {
  // 测试
  const task = () => {
    console.log("run debounce task");
  };

  const debounceTask = debounce(task, 1000);
  // window.addEventListener("scroll", debounceTask);
  debounceTask();
  debounceTask();
  debounceTask();
};
