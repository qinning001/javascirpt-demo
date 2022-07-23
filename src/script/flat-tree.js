let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 2 },
  { id: 5, name: "部门5", pid: 3 },
];

// output
[
  {
    id: 1,
    name: "部门1",
    pid: 0,
    children: [
      {
        id: 2,
        name: "部门2",
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: "部门3",
        pid: 1,
        children: [
          // 结果 ,,,
        ],
      },
    ],
  },
];

function flatToTree(items) {
  let res = [];

  let getChildren = (res, pid) => {
    for (const i of items) {
      if (i.pid === pid) {
        const newItem = { ...i, children: [] };
        res.push(newItem);
        getChildren(newItem.children, newItem.id);
      }
    }
  };
  getChildren(res, 0);
  return res;
}

function arrayToTree(list) {
  let result = [];
  let map = {};

  for (let item of list) {
    map[item.id] = { ...item, children: [] }; // 将源数组中每一个对象的id作为key，将当前对象所有属性和新增属性children作为value。

    if (item.pid === 0) {
      // 当pid为0时，添加到结果集
      let newItem = map[item.id]; // 注意！这里一定要将map[item.id] 赋值给新变量，这样newItem就和map[item.id]指向同一个内存地址了，达到数据共享
      result.push(newItem);
    } else {
      map[item.pid].children.push(map[item.id]); // 将key为当前id的对象，添加到key等于pid的对象的children中
    }
  }
  return result;
}

export default () => {
  console.log("pre Data: ", JSON.stringify(arr));
  const afterData = arrayToTree(arr);
  console.log("after Data: ", JSON.stringify(afterData));

  document.body.insertAdjacentHTML("beforeend", JSON.stringify(arr));
  document.body.insertAdjacentElement(
    "beforeend",
    document.createElement("br")
  );
  document.body.insertAdjacentHTML("beforeend", JSON.stringify(afterData));
};
