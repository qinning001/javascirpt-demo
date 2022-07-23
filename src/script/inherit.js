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
export default () => {
  // 测试
  let child = new Child("xiaoming", 16);
  console.log(child.name); // xiaoming
  child.eat(); // xiaoming is eating
  child.study(); // xiaoming is studying
  console.log(child.age); //16
};
