const modulesCache = {};

(function updateModule() {
  const yaml = require("./whitelist.yaml");
  if (yaml) {
    const files = require.context("./script", true, /\.js$/);
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
          console.error(
            "The error file is: ",
            fileName,
            "\n",
            "Error is:\n",
            error
          );
        }
      });

    if (module.hot) {
      // 白名单只能增量更新
      module.hot.accept("./whitelist.yaml", () => {
        console.log("Accepting the updated whitelist.yaml!");
        updateModule();
      });
      module.hot.accept(files.id, () => {
        console.log("Accepting the updated module!");
        updateModule();
      });
    }
  }
})();
