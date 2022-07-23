(self["webpackChunkjs_project"] = self["webpackChunkjs_project"] || []).push([["main"],{

/***/ 225:
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const modulesCache = {};

(function updateModule() {
  const yaml = __webpack_require__(/*! ./whitelist.yaml */ 438);
  const files = __webpack_require__(152);
  files
    .keys()
    .filter((fileName) => {
      for (let i of yaml) {
        if (fileName.search(i) !== -1) {
          return true;
        }
      }
      return false;
    })
    .forEach((fileName) => {
      const module = files(fileName);

      // 如果模块与缓存的模块定义相同，则在热重载期间跳过该模块。
      // 比对的是文件对象，不一致就会刷新。
      if (modulesCache[fileName] === module) return;

      // 更新模块缓存，以实现高效的热重载。
      modulesCache[fileName] = module;

      try {
        module.default();
      } catch (error) {
        console.error("The file is: ", fileName);
      }
    });

  if (false) {}
})();


/***/ }),

/***/ 660:
/*!*************************************!*\
  !*** ./src/script/customPromise.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MyPromise {
  constructor(executor) {
    // executor执行器
    this.status = "pending"; // 等待状态
    this.value = null; // 成功或失败的参数
    this.fulfilledCallbacks = []; // 成功的函数队列
    this.rejectedCallbacks = []; // 失败的函数队列
    const that = this;
    function resolve(value) {
      // 成功的方法
      if (that.status === "pending") {
        that.status = "resolved";
        that.value = value;
        that.fulfilledCallbacks.forEach((myFn) => myFn(that.value)); //执行回调方法
      }
    }
    function reject(value) {
      //失败的方法
      if (that.status === "pending") {
        that.status = "rejected";
        that.value = value;
        that.rejectedCallbacks.forEach((myFn) => myFn(that.value)); //执行回调方法
      }
    }
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === "pending") {
      // 等待状态，添加回调函数到成功的函数队列
      this.fulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });
      // 等待状态，添加回调函数到失败的函数队列
      this.rejectedCallbacks.push(() => {
        onRejected(this.value);
      });
    }
    if (this.status === "resolved") {
      // 支持同步调用
      console.log("this", this);
      onFulfilled(this.value);
    }
    if (this.status === "rejected") {
      // 支持同步调用
      onRejected(this.value);
    }
  }
}

// 测试
function fn() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.6) {
        resolve(1);
      } else {
        reject(2);
      }
    }, 1000);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  fn().then(
    (res) => {
      console.log("res", res); // res 1
    },
    (err) => {
      console.log("err", err); // err 2
    }
  );
});



/***/ }),

/***/ 97:
/*!********************************!*\
  !*** ./src/script/debounce.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  // 测试
  const task = () => {
    console.log("run task");
  };

  const debounceTask = debounce(task, 1000);
  window.addEventListener("scroll", debounceTask);

  debounceTask();
  debounceTask();
  debounceTask();
});


/***/ }),

/***/ 832:
/*!*********************************!*\
  !*** ./src/script/deepClone.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function deepClone(obj, cache = new WeakMap()) {
  if (typeof obj !== "object") return obj; // 普通类型，直接返回
  if (obj === null) return obj;
  if (cache.get(obj)) return cache.get(obj); // 防止循环引用，程序进入死循环
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 找到所属原型上的constructor，所属原型上的constructor指向当前对象的构造函数
  let cloneObj = new obj.constructor();
  cache.set(obj, cloneObj); // 缓存拷贝的对象，用于处理循环引用的情况
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache); // 递归拷贝
    }
  }
  return cloneObj;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  // 测试
  const obj = { name: "Jack", address: { x: 100, y: 200 } };
  obj.a = obj; // 循环引用
  const newObj = deepClone(obj);
  console.log(newObj.address === obj.address); // false

  const obj2 = { name: "Jack", address: { x: 100, y: 200 } };
  const obj3 = JSON.parse(JSON.stringify(obj2));
  console.log(obj2.address === obj3.address);
});


/***/ }),

/***/ 205:
/*!*********************************!*\
  !*** ./src/script/getParams.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qs */ 129);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_0__);


function getParams(url) {
  const res = {};
  if (url.includes("?")) {
    const str = url.split("?")[1];
    const arr = str.split("&");
    arr.forEach((item) => {
      const key = item.split("=")[0];
      const val = item.split("=")[1];
      res[key] = decodeURIComponent(val); // 解码
    });
  }
  return res;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  // 测试
  const user = getParams("http://www.baidu.com?user=%E9%98%BF%E9%A3%9E&age=16");
  console.log(user); // { user: '阿飞', age: '16' }

  const user1 = qs__WEBPACK_IMPORTED_MODULE_0___default().parse("http://www.baidu.com?user=%E9%98%BF%E9%A3%9E&age=16");
  console.log(user1);
});


/***/ }),

/***/ 167:
/*!*******************************!*\
  !*** ./src/script/inherit.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Parent(name) {
  this.name = name;
}
Parent.prototype.eat = function () {
  console.log(this.name + " is eating");
};

function Child(name, age) {
  Parent.call(this, name); // 构造函数继承
  this.age = age;
}
Child.prototype = new Parent(); // 原型链继承
Child.prototype.contructor = Child;
Child.prototype.study = function () {
  console.log(this.name + " is studying");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  // 测试
  let child = new Child("xiaoming", 16);
  console.log(child.name); // xiaoming
  child.eat(); // xiaoming is eating
  child.study(); // xiaoming is studying
  console.log(child.age);
});


/***/ }),

/***/ 10:
/*!****************************!*\
  !*** ./src/script/sort.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// sort排序

// 对数字进行排序，简写
const arr = [3, 2, 4, 1, 5];
arr.sort((a, b) => a - b);
console.log(arr); // [1, 2, 3, 4, 5]

// 对字母进行排序
const arr1 = ["b", "c", "a", "e", "d"];
arr1.sort((a, b) => {
  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0;
});
console.log(arr1); // ['a', 'b', 'c', 'd', 'e']

// 冒泡排序

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    // 从第一个元素开始，比较相邻的两个元素，前者大就交换位置
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let num = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = num;
      }
    }
    // 每次遍历结束，都能找到一个最大值，放在数组最后
  }
  return arr;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  //测试
  console.log(bubbleSort([2, 3, 1, 5, 4]),3332233); // [1, 2, 3, 4, 5]
});


/***/ }),

/***/ 783:
/*!********************************!*\
  !*** ./src/script/throttle.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function throttle(fn, delay) {
  let last = 0; // 上次触发时间
  return (...args) => {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  // 测试
  const task = () => {
    console.log("run task");
  };
  const throttleTask = throttle(task, 1000);
  window.addEventListener("scroll", throttleTask);

  throttleTask();
  throttleTask();
  throttleTask();
});


/***/ }),

/***/ 152:
/*!*********************************************!*\
  !*** ./src/script/ sync nonrecursive \.js$ ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./customPromise.js": 660,
	"./debounce.js": 97,
	"./deepClone.js": 832,
	"./getParams.js": 205,
	"./inherit.js": 167,
	"./sort.js": 10,
	"./throttle.js": 783
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 152;

/***/ }),

/***/ 654:
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 438:
/*!****************************!*\
  !*** ./src/whitelist.yaml ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = ["getParams","sort"];

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__(225)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBLG9EQUFvRDtBQUNwRCxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0Y7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7QUN0QkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1QkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0Ly4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdC8uL3NyYy9zY3JpcHQvY3VzdG9tUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0Ly4vc3JjL3NjcmlwdC9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0Ly4vc3JjL3NjcmlwdC9kZWVwQ2xvbmUuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdC8uL3NyYy9zY3JpcHQvZ2V0UGFyYW1zLmpzIiwid2VicGFjazovL2pzX3Byb2plY3QvLi9zcmMvc2NyaXB0L2luaGVyaXQuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdC8uL3NyYy9zY3JpcHQvc29ydC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0Ly4vc3JjL3NjcmlwdC90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0Ly4vc3JjL3NjcmlwdHxzeW5jfG5vbnJlY3Vyc2l2ZXwvLmpzJCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0L2lnbm9yZWR8RDpcXEZyb250XFxqc19wcm9qZWN0XFxub2RlX21vZHVsZXNcXG9iamVjdC1pbnNwZWN0fC4vdXRpbC5pbnNwZWN0Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vZHVsZXNDYWNoZSA9IHt9O1xyXG5cclxuKGZ1bmN0aW9uIHVwZGF0ZU1vZHVsZSgpIHtcclxuICBjb25zdCB5YW1sID0gcmVxdWlyZShcIi4vd2hpdGVsaXN0LnlhbWxcIik7XHJcbiAgY29uc3QgZmlsZXMgPSByZXF1aXJlLmNvbnRleHQoXCIuL3NjcmlwdFwiLCBmYWxzZSwgL1xcLmpzJC8pO1xyXG4gIGZpbGVzXHJcbiAgICAua2V5cygpXHJcbiAgICAuZmlsdGVyKChmaWxlTmFtZSkgPT4ge1xyXG4gICAgICBmb3IgKGxldCBpIG9mIHlhbWwpIHtcclxuICAgICAgICBpZiAoZmlsZU5hbWUuc2VhcmNoKGkpICE9PSAtMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pXHJcbiAgICAuZm9yRWFjaCgoZmlsZU5hbWUpID0+IHtcclxuICAgICAgY29uc3QgbW9kdWxlID0gZmlsZXMoZmlsZU5hbWUpO1xyXG5cclxuICAgICAgLy8g5aaC5p6c5qih5Z2X5LiO57yT5a2Y55qE5qih5Z2X5a6a5LmJ55u45ZCM77yM5YiZ5Zyo54Ot6YeN6L295pyf6Ze06Lez6L+H6K+l5qih5Z2X44CCXHJcbiAgICAgIC8vIOavlOWvueeahOaYr+aWh+S7tuWvueixoe+8jOS4jeS4gOiHtOWwseS8muWIt+aWsOOAglxyXG4gICAgICBpZiAobW9kdWxlc0NhY2hlW2ZpbGVOYW1lXSA9PT0gbW9kdWxlKSByZXR1cm47XHJcblxyXG4gICAgICAvLyDmm7TmlrDmqKHlnZfnvJPlrZjvvIzku6Xlrp7njrDpq5jmlYjnmoTng63ph43ovb3jgIJcclxuICAgICAgbW9kdWxlc0NhY2hlW2ZpbGVOYW1lXSA9IG1vZHVsZTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbW9kdWxlLmRlZmF1bHQoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIGZpbGUgaXM6IFwiLCBmaWxlTmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICBpZiAobW9kdWxlLmhvdCkge1xyXG4gICAgLy8g55m95ZCN5Y2V5Y+q6IO95aKe6YeP5pu05pawXHJcbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vd2hpdGVsaXN0LnlhbWxcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkFjY2VwdGluZyB0aGUgdXBkYXRlZCB3aGl0ZWxpc3QueWFtbCFcIik7XHJcbiAgICAgIHVwZGF0ZU1vZHVsZSgpO1xyXG4gICAgfSk7XHJcbiAgICBtb2R1bGUuaG90LmFjY2VwdChmaWxlcy5pZCwgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkFjY2VwdGluZyB0aGUgdXBkYXRlZCBtb2R1bGUhXCIpO1xyXG4gICAgICB1cGRhdGVNb2R1bGUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufSkoKTtcclxuIiwiY2xhc3MgTXlQcm9taXNlIHtcclxuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xyXG4gICAgLy8gZXhlY3V0b3LmiafooYzlmahcclxuICAgIHRoaXMuc3RhdHVzID0gXCJwZW5kaW5nXCI7IC8vIOetieW+heeKtuaAgVxyXG4gICAgdGhpcy52YWx1ZSA9IG51bGw7IC8vIOaIkOWKn+aIluWksei0peeahOWPguaVsFxyXG4gICAgdGhpcy5mdWxmaWxsZWRDYWxsYmFja3MgPSBbXTsgLy8g5oiQ5Yqf55qE5Ye95pWw6Zif5YiXXHJcbiAgICB0aGlzLnJlamVjdGVkQ2FsbGJhY2tzID0gW107IC8vIOWksei0peeahOWHveaVsOmYn+WIl1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICBmdW5jdGlvbiByZXNvbHZlKHZhbHVlKSB7XHJcbiAgICAgIC8vIOaIkOWKn+eahOaWueazlVxyXG4gICAgICBpZiAodGhhdC5zdGF0dXMgPT09IFwicGVuZGluZ1wiKSB7XHJcbiAgICAgICAgdGhhdC5zdGF0dXMgPSBcInJlc29sdmVkXCI7XHJcbiAgICAgICAgdGhhdC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoYXQuZnVsZmlsbGVkQ2FsbGJhY2tzLmZvckVhY2goKG15Rm4pID0+IG15Rm4odGhhdC52YWx1ZSkpOyAvL+aJp+ihjOWbnuiwg+aWueazlVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHtcclxuICAgICAgLy/lpLHotKXnmoTmlrnms5VcclxuICAgICAgaWYgKHRoYXQuc3RhdHVzID09PSBcInBlbmRpbmdcIikge1xyXG4gICAgICAgIHRoYXQuc3RhdHVzID0gXCJyZWplY3RlZFwiO1xyXG4gICAgICAgIHRoYXQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGF0LnJlamVjdGVkQ2FsbGJhY2tzLmZvckVhY2goKG15Rm4pID0+IG15Rm4odGhhdC52YWx1ZSkpOyAvL+aJp+ihjOWbnuiwg+aWueazlVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBleGVjdXRvcihyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gIH1cclxuICB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0dXMgPT09IFwicGVuZGluZ1wiKSB7XHJcbiAgICAgIC8vIOetieW+heeKtuaAge+8jOa3u+WKoOWbnuiwg+WHveaVsOWIsOaIkOWKn+eahOWHveaVsOmYn+WIl1xyXG4gICAgICB0aGlzLmZ1bGZpbGxlZENhbGxiYWNrcy5wdXNoKCgpID0+IHtcclxuICAgICAgICBvbkZ1bGZpbGxlZCh0aGlzLnZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIOetieW+heeKtuaAge+8jOa3u+WKoOWbnuiwg+WHveaVsOWIsOWksei0peeahOWHveaVsOmYn+WIl1xyXG4gICAgICB0aGlzLnJlamVjdGVkQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIG9uUmVqZWN0ZWQodGhpcy52YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3RhdHVzID09PSBcInJlc29sdmVkXCIpIHtcclxuICAgICAgLy8g5pSv5oyB5ZCM5q2l6LCD55SoXHJcbiAgICAgIGNvbnNvbGUubG9nKFwidGhpc1wiLCB0aGlzKTtcclxuICAgICAgb25GdWxmaWxsZWQodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zdGF0dXMgPT09IFwicmVqZWN0ZWRcIikge1xyXG4gICAgICAvLyDmlK/mjIHlkIzmraXosIPnlKhcclxuICAgICAgb25SZWplY3RlZCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIOa1i+ivlVxyXG5mdW5jdGlvbiBmbigpIHtcclxuICByZXR1cm4gbmV3IE15UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjYpIHtcclxuICAgICAgICByZXNvbHZlKDEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdCgyKTtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gIGZuKCkudGhlbihcclxuICAgIChyZXMpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJyZXNcIiwgcmVzKTsgLy8gcmVzIDFcclxuICAgIH0sXHJcbiAgICAoZXJyKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyXCIsIGVycik7IC8vIGVyciAyXHJcbiAgICB9XHJcbiAgKTtcclxufVxyXG5cclxuIiwiZnVuY3Rpb24gZGVib3VuY2UoZm4sIGRlbGF5KSB7XHJcbiAgbGV0IHRpbWVyO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICB9XHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgLy8g5rWL6K+VXHJcbiAgY29uc3QgdGFzayA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwicnVuIHRhc2tcIik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVib3VuY2VUYXNrID0gZGVib3VuY2UodGFzaywgMTAwMCk7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZGVib3VuY2VUYXNrKTtcclxuXHJcbiAgZGVib3VuY2VUYXNrKCk7XHJcbiAgZGVib3VuY2VUYXNrKCk7XHJcbiAgZGVib3VuY2VUYXNrKCk7XHJcbn07XHJcbiIsImZ1bmN0aW9uIGRlZXBDbG9uZShvYmosIGNhY2hlID0gbmV3IFdlYWtNYXAoKSkge1xyXG4gIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSByZXR1cm4gb2JqOyAvLyDmma7pgJrnsbvlnovvvIznm7TmjqXov5Tlm55cclxuICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gb2JqO1xyXG4gIGlmIChjYWNoZS5nZXQob2JqKSkgcmV0dXJuIGNhY2hlLmdldChvYmopOyAvLyDpmLLmraLlvqrnjq/lvJXnlKjvvIznqIvluo/ov5vlhaXmrbvlvqrnjq9cclxuICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkgcmV0dXJuIG5ldyBEYXRlKG9iaik7XHJcbiAgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIG5ldyBSZWdFeHAob2JqKTtcclxuXHJcbiAgLy8g5om+5Yiw5omA5bGe5Y6f5Z6L5LiK55qEY29uc3RydWN0b3LvvIzmiYDlsZ7ljp/lnovkuIrnmoRjb25zdHJ1Y3RvcuaMh+WQkeW9k+WJjeWvueixoeeahOaehOmAoOWHveaVsFxyXG4gIGxldCBjbG9uZU9iaiA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcclxuICBjYWNoZS5zZXQob2JqLCBjbG9uZU9iaik7IC8vIOe8k+WtmOaLt+i0neeahOWvueixoe+8jOeUqOS6juWkhOeQhuW+queOr+W8leeUqOeahOaDheWGtVxyXG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICBjbG9uZU9ialtrZXldID0gZGVlcENsb25lKG9ialtrZXldLCBjYWNoZSk7IC8vIOmAkuW9kuaLt+i0nVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY2xvbmVPYmo7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICAvLyDmtYvor5VcclxuICBjb25zdCBvYmogPSB7IG5hbWU6IFwiSmFja1wiLCBhZGRyZXNzOiB7IHg6IDEwMCwgeTogMjAwIH0gfTtcclxuICBvYmouYSA9IG9iajsgLy8g5b6q546v5byV55SoXHJcbiAgY29uc3QgbmV3T2JqID0gZGVlcENsb25lKG9iaik7XHJcbiAgY29uc29sZS5sb2cobmV3T2JqLmFkZHJlc3MgPT09IG9iai5hZGRyZXNzKTsgLy8gZmFsc2VcclxuXHJcbiAgY29uc3Qgb2JqMiA9IHsgbmFtZTogXCJKYWNrXCIsIGFkZHJlc3M6IHsgeDogMTAwLCB5OiAyMDAgfSB9O1xyXG4gIGNvbnN0IG9iajMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iajIpKTtcclxuICBjb25zb2xlLmxvZyhvYmoyLmFkZHJlc3MgPT09IG9iajMuYWRkcmVzcyk7XHJcbn07XHJcbiIsImltcG9ydCBxcyBmcm9tIFwicXNcIjtcclxuXHJcbmZ1bmN0aW9uIGdldFBhcmFtcyh1cmwpIHtcclxuICBjb25zdCByZXMgPSB7fTtcclxuICBpZiAodXJsLmluY2x1ZGVzKFwiP1wiKSkge1xyXG4gICAgY29uc3Qgc3RyID0gdXJsLnNwbGl0KFwiP1wiKVsxXTtcclxuICAgIGNvbnN0IGFyciA9IHN0ci5zcGxpdChcIiZcIik7XHJcbiAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBpdGVtLnNwbGl0KFwiPVwiKVswXTtcclxuICAgICAgY29uc3QgdmFsID0gaXRlbS5zcGxpdChcIj1cIilbMV07XHJcbiAgICAgIHJlc1trZXldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbCk7IC8vIOino+eggVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICAvLyDmtYvor5VcclxuICBjb25zdCB1c2VyID0gZ2V0UGFyYW1zKFwiaHR0cDovL3d3dy5iYWlkdS5jb20/dXNlcj0lRTklOTglQkYlRTklQTMlOUUmYWdlPTE2XCIpO1xyXG4gIGNvbnNvbGUubG9nKHVzZXIpOyAvLyB7IHVzZXI6ICfpmL/po54nLCBhZ2U6ICcxNicgfVxyXG5cclxuICBjb25zdCB1c2VyMSA9IHFzLnBhcnNlKFwiaHR0cDovL3d3dy5iYWlkdS5jb20/dXNlcj0lRTklOTglQkYlRTklQTMlOUUmYWdlPTE2XCIpO1xyXG4gIGNvbnNvbGUubG9nKHVzZXIxKTtcclxufTtcclxuIiwiZnVuY3Rpb24gUGFyZW50KG5hbWUpIHtcclxuICB0aGlzLm5hbWUgPSBuYW1lO1xyXG59XHJcblBhcmVudC5wcm90b3R5cGUuZWF0ID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiIGlzIGVhdGluZ1wiKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIENoaWxkKG5hbWUsIGFnZSkge1xyXG4gIFBhcmVudC5jYWxsKHRoaXMsIG5hbWUpOyAvLyDmnoTpgKDlh73mlbDnu6fmib9cclxuICB0aGlzLmFnZSA9IGFnZTtcclxufVxyXG5DaGlsZC5wcm90b3R5cGUgPSBuZXcgUGFyZW50KCk7IC8vIOWOn+Wei+mTvue7p+aJv1xyXG5DaGlsZC5wcm90b3R5cGUuY29udHJ1Y3RvciA9IENoaWxkO1xyXG5DaGlsZC5wcm90b3R5cGUuc3R1ZHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgaXMgc3R1ZHlpbmdcIik7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICAvLyDmtYvor5VcclxuICBsZXQgY2hpbGQgPSBuZXcgQ2hpbGQoXCJ4aWFvbWluZ1wiLCAxNik7XHJcbiAgY29uc29sZS5sb2coY2hpbGQubmFtZSk7IC8vIHhpYW9taW5nXHJcbiAgY2hpbGQuZWF0KCk7IC8vIHhpYW9taW5nIGlzIGVhdGluZ1xyXG4gIGNoaWxkLnN0dWR5KCk7IC8vIHhpYW9taW5nIGlzIHN0dWR5aW5nXHJcbiAgY29uc29sZS5sb2coY2hpbGQuYWdlKTtcclxufTtcclxuIiwiLy8gc29ydOaOkuW6j1xyXG5cclxuLy8g5a+55pWw5a2X6L+b6KGM5o6S5bqP77yM566A5YaZXHJcbmNvbnN0IGFyciA9IFszLCAyLCA0LCAxLCA1XTtcclxuYXJyLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuY29uc29sZS5sb2coYXJyKTsgLy8gWzEsIDIsIDMsIDQsIDVdXHJcblxyXG4vLyDlr7nlrZfmr43ov5vooYzmjpLluo9cclxuY29uc3QgYXJyMSA9IFtcImJcIiwgXCJjXCIsIFwiYVwiLCBcImVcIiwgXCJkXCJdO1xyXG5hcnIxLnNvcnQoKGEsIGIpID0+IHtcclxuICBpZiAoYSA+IGIpIHJldHVybiAxO1xyXG4gIGVsc2UgaWYgKGEgPCBiKSByZXR1cm4gLTE7XHJcbiAgZWxzZSByZXR1cm4gMDtcclxufSk7XHJcbmNvbnNvbGUubG9nKGFycjEpOyAvLyBbJ2EnLCAnYicsICdjJywgJ2QnLCAnZSddXHJcblxyXG4vLyDlhpLms6HmjpLluo9cclxuXHJcbmZ1bmN0aW9uIGJ1YmJsZVNvcnQoYXJyKSB7XHJcbiAgbGV0IGxlbiA9IGFyci5sZW5ndGg7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW4gLSAxOyBpKyspIHtcclxuICAgIC8vIOS7juesrOS4gOS4quWFg+e0oOW8gOWni++8jOavlOi+g+ebuOmCu+eahOS4pOS4quWFg+e0oO+8jOWJjeiAheWkp+WwseS6pOaNouS9jee9rlxyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW4gLSAxIC0gaTsgaisrKSB7XHJcbiAgICAgIGlmIChhcnJbal0gPiBhcnJbaiArIDFdKSB7XHJcbiAgICAgICAgbGV0IG51bSA9IGFycltqXTtcclxuICAgICAgICBhcnJbal0gPSBhcnJbaiArIDFdO1xyXG4gICAgICAgIGFycltqICsgMV0gPSBudW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOavj+asoemBjeWOhue7k+adn++8jOmDveiDveaJvuWIsOS4gOS4quacgOWkp+WAvO+8jOaUvuWcqOaVsOe7hOacgOWQjlxyXG4gIH1cclxuICByZXR1cm4gYXJyO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICAvL+a1i+ivlVxyXG4gIGNvbnNvbGUubG9nKGJ1YmJsZVNvcnQoWzIsIDMsIDEsIDUsIDRdKSwzMzMyMjMzKTsgLy8gWzEsIDIsIDMsIDQsIDVdXHJcbn07XHJcbiIsImZ1bmN0aW9uIHRocm90dGxlKGZuLCBkZWxheSkge1xyXG4gIGxldCBsYXN0ID0gMDsgLy8g5LiK5qyh6Kem5Y+R5pe26Ze0XHJcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgaWYgKG5vdyAtIGxhc3QgPiBkZWxheSkge1xyXG4gICAgICBsYXN0ID0gbm93O1xyXG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgLy8g5rWL6K+VXHJcbiAgY29uc3QgdGFzayA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwicnVuIHRhc2tcIik7XHJcbiAgfTtcclxuICBjb25zdCB0aHJvdHRsZVRhc2sgPSB0aHJvdHRsZSh0YXNrLCAxMDAwKTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aHJvdHRsZVRhc2spO1xyXG5cclxuICB0aHJvdHRsZVRhc2soKTtcclxuICB0aHJvdHRsZVRhc2soKTtcclxuICB0aHJvdHRsZVRhc2soKTtcclxufTtcclxuIiwidmFyIG1hcCA9IHtcblx0XCIuL2N1c3RvbVByb21pc2UuanNcIjogNjYwLFxuXHRcIi4vZGVib3VuY2UuanNcIjogOTcsXG5cdFwiLi9kZWVwQ2xvbmUuanNcIjogODMyLFxuXHRcIi4vZ2V0UGFyYW1zLmpzXCI6IDIwNSxcblx0XCIuL2luaGVyaXQuanNcIjogMTY3LFxuXHRcIi4vc29ydC5qc1wiOiAxMCxcblx0XCIuL3Rocm90dGxlLmpzXCI6IDc4M1xufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDE1MjsiLCIvKiAoaWdub3JlZCkgKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=