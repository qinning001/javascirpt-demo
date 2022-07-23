import qs from "qs";

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

export default () => {
  // 测试
  const user = getParams("http://www.baidu.com?user=%E9%98%BF%E9%A3%9E&age=16");
  console.log(user); // { user: '阿飞', age: '16' }

  const user1 = qs.parse(
    "http://www.baidu.com?user=%E9%98%BF%E9%A3%9E&age=16".split("?")[1]
  );
  console.log(user1);
};
