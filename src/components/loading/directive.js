import LoadingComponent from './index.vue'
// 使用 Vue.extend构造组件子类

// 定义一个名为loading的指令
export default{
  install(Vue){
    const LoadingContructor = Vue.extend(LoadingComponent)
    Vue.directive('loading', {
      /**
       * 只调用一次，在指令第一次绑定到元素时调用，可以在这里做一些初始化的设置
       * @param {*} el 指令要绑定的元素
       * @param {*} binding 指令传入的信息，包括 {name:'指令名称', value: '指令绑定的值',arg: '指令参数 v-bind:text 对应 text'}
       */
      bind(el, binding) {
        const instance = new LoadingContructor({
          el: document.createElement('div'),
          data: {
            text: '加载中。。。',
          }
        })
        el.appendChild(instance.$el)
        el.instance = instance
        Vue.nextTick(() => {
          el.instance.visible = binding.value
        })
      },
      /**
       * 所在组件的 VNode 更新时调用
       * @param {*} el
       * @param {*} binding
       */
      update(el, binding) {
        // 通过对比值的变化判断loading是否显示
        if (binding.oldValue !== binding.value) {
          el.instance.visible = binding.value
        }
      },
      /**
       * 只调用一次，在 指令与元素解绑时调用
       * @param {*} el
       */
      unbind(el) {
        const mask = el.instance.$el
        if (mask.parentNode) {
          mask.parentNode.removeChild(mask)
        }
        el.instance.$destroy()
        el.instance = undefined
      }
    })
  }
}
