// 观察者模式和发布订阅模式最大的区别就是发布订阅模式有个事件调度中心。
// 观察者模式由具体目标调度，每个被订阅的目标里面都需要有对观察者的处理，这种处理方式比较直接粗暴，但是会造成代码的冗余。
// 而发布订阅模式中统一由调度中心进行处理，订阅者和发布者互不干扰，消除了发布者和订阅者之间的依赖。这样一方面实现了解耦，还有就是可以实现更细粒度的一些控制。比如发布者发布了很多消息，但是不想所有的订阅者都接收到，就可以在调度中心做一些处理，类似于权限控制之类的。还可以做一些节流操作。

// 观察者模式是不是发布订阅模式
// --------------

// 网上关于这个问题的回答，出现了两极分化，有认为发布订阅模式就是观察者模式的，也有认为观察者模式和发布订阅模式是真不一样的。

// 其实我不知道发布订阅模式是不是观察者模式，就像我不知道辨别模式的关键是设计意图还是设计结构（理念），虽然《JavaScript设计模式与开发实践》一书中说了`分辨模式的关键是意图而不是结构`。

// 如果以结构来分辨模式，发布订阅模式相比观察者模式多了一个中间件订阅器，所以发布订阅模式是不同于观察者模式的；如果以意图来分辨模式，他们都是`实现了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新`，那么他们就是同一种模式，发布订阅模式是在观察者模式的基础上做的优化升级。


//定义一家猎人工会
//主要功能包括任务发布大厅(topics)，以及订阅任务(subscribe)，发布任务(publish)
let HunterUnion = {
  type: "hunt",
  topics: Object.create(null),
  subscribe: function (topic, fn) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(fn);
  },
  publish: function (topic, money) {
    if (!this.topics[topic]) return;
    for (let fn of this.topics[topic]) {
      fn(money);
    }
  },
};

//定义一个猎人类
//包括姓名，级别
function Hunter(name, level) {
  this.name = name;
  this.level = level;
}
//猎人可在猎人工会发布订阅任务
Hunter.prototype.subscribe = function (topic, fn) {
  console.log(
    this.level + "猎人" + this.name + "订阅了狩猎" + topic + "的任务"
  );
  HunterUnion.subscribe(topic, fn);
};
Hunter.prototype.publish = function (topic, money) {
  console.log(
    this.level + "猎人" + this.name + "发布了狩猎" + topic + "的任务"
  );
  HunterUnion.publish(topic, money);
};

//猎人工会走来了几个猎人
let hunterMing = new Hunter("小明", "黄金");
let hunterJin = new Hunter("小金", "白银");
let hunterZhang = new Hunter("小张", "黄金");
let hunterPeter = new Hunter("Peter", "青铜");

//小明，小金，小张分别订阅了狩猎tiger的任务
hunterMing.subscribe("tiger", function (money) {
  console.log("小明表示：" + (money > 200 ? "" : "不") + "接取任务");
});
hunterJin.subscribe("tiger", function (money) {
  console.log("小金表示：接取任务");
});
hunterZhang.subscribe("tiger", function (money) {
  console.log("小张表示：接取任务");
});
//Peter订阅了狩猎sheep的任务
hunterPeter.subscribe("sheep", function (money) {
  console.log("Peter表示：接取任务");
});

//Peter发布了狩猎tiger的任务
hunterPeter.publish("tiger", 198);

export default () => {}

//猎人们发布(发布者)或订阅(观察者/订阅者)任务都是通过猎人工会(调度中心)关联起来的，他们没有直接的交流。`

