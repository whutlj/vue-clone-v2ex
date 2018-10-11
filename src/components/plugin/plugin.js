const MyPlugin = {};
MyPlugin.install = (Vue, Option) => {
  // 全局方法
  Vue.allMethod = (val) => {
    console.log(`全局方法执行： ${val}`);
  };
  // 自定义指令的钩子函数，bind、inserted、update、componentUpdated、unbind
  // 钩子函数的参数 el、binding、vnode、oldValue
  Vue.directive('lj', {
    bind(el, binding, vnode, oldValue) {
      console.log(`当前绑定元素${el}`);
      const { value } = binding;
      console.log(`值为:${value}`);
    }
  });

  // 注入组件
  // Vue.mixin({
  //   created() {
  //     console.log(`插件注入插件：${Option.name}`);
  //   }
  // });

  // 添加实例方法
  Vue.prototype.$lj = (tag) => {
    console.log(`李杰：${tag}`);
  };
};

export default MyPlugin;
