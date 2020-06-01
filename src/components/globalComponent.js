export default {
  install(Vue) {
    // 批量注册公用组件
    const components = require.context('@/components/common', false, /\.vue$/)
    components.keys().map(path => {
      const fileName = path.replace(/(.*\/)*([^.]+).*/ig, "$2"); // 获取组件文件名
      Vue.component(fileName, components(path).default || components(path))
    })
  }
}

// import Vue from 'vue' // 引入vue

// // 处理首字母大写 abc => Abc
// function changeStr(str){
//     return str.charAt(0).toUpperCase() + str.slice(1)
// }

// /*
//     require.context(arg1,arg2,arg3)
//         arg1 - 读取文件的路径
//         arg2 - 是否遍历文件的子目录
//         arg3 - 匹配文件的正则
//     关于这个Api的用法，建议小伙伴们去查阅一下，用途也比较广泛
// */
// const requireComponent = require.context('.', true, /\.vue$/)
// console.log('requireComponent.keys():',requireComponent.keys())  // 打印
// requireComponent.keys().forEach(fileName => {
//     const config = requireComponent(fileName)
//     console.log('config:',config)  // 打印
//     const componentName = changeStr(
//         fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')   // ./child1.vue => child1
//     )
//     console.log(componentName);
//     Vue.component(componentName, config.default || config) // 动态注册该目录下的所有.vue文件
// })
