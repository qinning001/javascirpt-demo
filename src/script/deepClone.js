// 深拷贝
function deepClone(obj, cache = new WeakMap()) {
  if (typeof obj !== "object") return obj; // 普通类型，直接返回
  if (obj === null) return obj;
  if (cache.get(obj)) return cache.get(obj); // 防止循环引用，程序进入死循环
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 找到所属原型上的constructor，所属原型上的constructor指向当前对象的构造函数
  let cloneObj = new obj.constructor();
  cache.set(obj, cloneObj); // 缓存拷贝的对象，用于处理循环引用的情况
  // 遍历不含继承的属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache); // 递归拷贝
    }
  }
  return cloneObj;
}

export default () => {
  // 测试
  const obj = { name: "Jack", address: { x: 100, y: 200 } };
  obj.a = obj; // 循环引用
  const newObj = deepClone(obj);
  console.log(newObj.address === obj.address); // false

  const obj2 = { name: "Jack", address: { x: 100, y: 200 } };
  const obj3 = JSON.parse(JSON.stringify(obj2));
  console.log(obj2.address === obj3.address);
};
