// 排序

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

export default () => {
  // 对数字进行排序，简写
  const arr = [3, 2, 4, 1, 5];
  arr.sort((a, b) => {
    return a - b;
  });
  console.log(arr); // [1, 2, 3, 4, 5]

  // 对字母进行排序
  const arr1 = ["b", "c", "a", "e", "d"];
  arr1.sort((a, b) => {
    if (a > b) return 1;
    // a < b 时,会将a排序在b前面
    else if (a < b) return -1;
    else return 0;
  });
  console.log(arr1); // ['a', 'b', 'c', 'd', 'e']
  // 冒泡
  console.log(bubbleSort([2, 3, 1, 5, 4]), 3332233); // [1, 2, 3, 4, 5]
};
