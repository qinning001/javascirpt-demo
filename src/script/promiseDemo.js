// // 三个状态：PENDING、FULFILLED、REJECTED
// const PENDING = "PENDING";
// const FULFILLED = "FULFILLED";
// const REJECTED = "REJECTED";

// class Promise {
//   constructor(executor) {
//     // 默认状态为 PENDING
//     this.status = PENDING;
//     // 存放成功状态的值，默认为 undefined
//     this.value = undefined;
//     // 存放失败状态的值，默认为 undefined
//     this.reason = undefined;

//     // 调用此方法就是成功
//     let resolve = (value) => {
//       // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
//       if (this.status === PENDING) {
//         this.status = FULFILLED;
//         this.value = value;
//       }
//     };

//     // 调用此方法就是失败
//     let reject = (reason) => {
//       // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
//       if (this.status === PENDING) {
//         this.status = REJECTED;
//         this.reason = reason;
//       }
//     };

//     try {
//       // 立即执行，将 resolve 和 reject 函数传给使用者
//       executor(resolve, reject);
//     } catch (error) {
//       // 发生异常时执行失败逻辑
//       reject(error);
//     }
//   }

//   // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
//   then(onFulfilled, onRejected) {
//     console.log(this.status,1111);
//     if (this.status === FULFILLED) {
//       onFulfilled(this.value);
//     }

//     if (this.status === REJECTED) {
//       onRejected(this.reason);
//     }
//   }
// }

// const PENDING = "PENDING";
// const FULFILLED = "FULFILLED";
// const REJECTED = "REJECTED";

// class Promise {
//   constructor(executor) {
//     this.status = PENDING;
//     this.value = undefined;
//     this.reason = undefined;
//     // 存放成功的回调
//     this.onResolvedCallbacks = [];
//     // 存放失败的回调
//     this.onRejectedCallbacks = [];

//     let resolve = (value) => {
//       console.log(this.onResolvedCallbacks, this.onRejectedCallbacks);
//       if (this.status === PENDING) {
//         this.status = FULFILLED;
//         this.value = value;
//         // 依次将对应的函数执行
//         this.onResolvedCallbacks.forEach((fn) => fn());
//       }
//     };

//     let reject = (reason) => {
//       if (this.status === PENDING) {
//         this.status = REJECTED;
//         this.reason = reason;
//         // 依次将对应的函数执行
//         this.onRejectedCallbacks.forEach((fn) => fn());
//       }
//     };

//     try {
//       executor(resolve, reject);
//     } catch (error) {
//       reject(error);
//     }
//   }

//   then(onFulfilled, onRejected) {
//     if (this.status === FULFILLED) {
//       onFulfilled(this.value);
//     }

//     if (this.status === REJECTED) {
//       onRejected(this.reason);
//     }

//     if (this.status === PENDING) {
//       // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
//       this.onResolvedCallbacks.push(() => {
//         onFulfilled(this.value);
//       });

//       // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
//       this.onRejectedCallbacks.push(() => {
//         onRejected(this.reason);
//       });
//     }
//   }
// }

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = x.then;
      if (typeof then === "function") {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          x,
          (y) => {
            // 根据 promise 的状态决定是成功还是失败
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(x);
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      // ======新增逻辑======
      // promise.resolve 是具备等待功能的。
      // 如果 value 是一个promise，那我们的库中应该也要实现一个递归解析
      if (value instanceof Promise) {
        // 递归解析
        return value.then(resolve, reject);
      }

      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    //解决 onFufilled，onRejected 没有传值的问题
    //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    // 每次调用 then 都返回一个新的 promise  Promise/A+ 2.2.7
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        //Promise/A+ 2.2.2
        //Promise/A+ 2.2.4 --- setTimeout
        setTimeout(() => {
          try {
            //Promise/A+ 2.2.7.1
            let x = onFulfilled(this.value);
            // x可能是一个proimise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            //Promise/A+ 2.2.7.2
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        //Promise/A+ 2.2.3
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  static resolve(data) {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

Promise.prototype.catch = function (errCallback) {
  return this.then(null, errCallback);
};

Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      return Promise.resolve(callback()).then(() => value);
    },
    (reason) => {
      return Promise.resolve(callback()).then(() => {
        throw reason;
      });
    }
  );
};

Promise.all = function (values) {
  if (!Array.isArray(values)) {
    const type = typeof values;
    return new TypeError(`TypeError: ${type} ${values} is not iterable`);
  }

  return new Promise((resolve, reject) => {
    let resultArr = [];
    let orderIndex = 0;
    const processResultByKey = (value, index) => {
      resultArr[index] = value;
      if (++orderIndex === values.length) {
        resolve(resultArr);
      }
    };
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (value && typeof value.then === "function") {
        value.then((value) => {
          processResultByKey(value, i);
        }, reject);
      } else {
        processResultByKey(value, i);
      }
    }
  });
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 一起执行就是for循环
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i];
      if (val && typeof val.then === "function") {
        val.then(resolve, reject);
      } else {
        // 普通值
        resolve(val);
      }
    }
  });
};

export default () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("成功");
    }, 1000);
  })
    .then(
      (data) => {
        console.log("success", data);
        return 3;
      },
      (err) => {
        console.log("faild", err);
      }
    )
    .then((num) => {
      console.log("success again", num);
    });
};
