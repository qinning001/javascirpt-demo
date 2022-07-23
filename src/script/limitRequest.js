const axios = require("axios");
function fetch(url) {
  // 模拟接口请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .request(url)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }, 1000);

    // setTimeout(() => {
    //   resolve();
    // }, 10000);
  });
}

/**
 * 接口请求最大并发量控制
 * @param { Array } urls 接口请求地址数组集合
 * @param { Number } max 最大并发量
 * @param { Function } callback 回调函数
 */
function maxRequestLimit(arr, max, callback) {
  // 如果没有传入urls或max则不继续执行
  if (!arr || !max) return;

  // 当请求地址数组集合长度为0，则执行回调函数（如果有的话），并结束后续执行
  if (arr.length === 0) {
    if (callback) callback();
    return;
  }

  let fetchArr = [], // 存储并发max的promise数组
    i = 0;

  function toFetch() {
    // 所有的请求都受理，则返回一个resolve
    if (i === arr.length) {
      return Promise.resolve();
    }

    // 取出第i个url， 放入fetch里面 , 每取一次i++
    let one = fetch(arr[i++]);

    //将当前的promise存入并发数组中
    fetchArr.push(one);

    // 当promise执行完毕后，从数组删除
    one.then(
      (res) => {
        fetchArr.splice(fetchArr.indexOf(one), 1);
      },
      (err) => {
        fetchArr.splice(fetchArr.indexOf(one), 1);
      }
    );

    let p = Promise.resolve();

    // 当并行数量达到最大后,用race来处理当前fetchArr中的promise, 当有一个promise时,会立即触发递归。
    if (fetchArr.length >= max) {
      p = Promise.race(fetchArr);
    }
    // 当并行数量没有到达最大时,执行下一个请求
    return p.then(
      () => {
        toFetch();
      },
      () => {
        toFetch();
      }
    );
  }

  // arr循环完后， 现在fetchArr里面剩下的promise对象， 使用all等待所有的都完成之后执行callback
  toFetch()
    .then(() => Promise.all(fetchArr))
    .then(() => callback());
}

export default () => {
  // 测试
  maxRequestLimit(
    [
      "https://segmentfault.com/a/1190000038413073",
      "https://www.baidu.com/",
      "https://segmentfault.com/a/1190000038413073",
      "https://www.baidu.com/",
      "https://segmentfault.com/a/1190000038413073",
      "https://www.baidu.com/",
      "https://segmentfault.com/a/1190000038413073",
      "https://segmentfault.com/a/1190000038413073",
      "https://segmentfault.com/a/1190000038413073",
    ],
    3,
    () => {
      console.log("fetch end");
    }
  );
};
