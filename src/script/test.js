export default () => {
  console.log("1");
  setTimeout(() => {
    console.log("2");
    new Promise((resolve) => {
      console.log("3");
      resolve();
    }).then(() => {
      console.log("4");
    });
  }, 0);
  new Promise((resolve) => {
    console.log("5");
    resolve();
  }).then(() => {
    console.log("6");
  });
  setTimeout(() => {
    console.log("7");
  }, 0);
  setTimeout(() => {
    console.log("8");
    new Promise((resolve) => {
      console.log("9");
      resolve();
    }).then(() => {
      console.log("10");
    });
  }, 0);
  new Promise((resolve) => {
    console.log("11");
    resolve();
  }).then(() => {
    console.log("12");
  });
  console.log("13");
};
