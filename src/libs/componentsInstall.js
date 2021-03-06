// require.context(src, bool, reg)
/**
 * @parmas {String} src 读取文件的路径
 * @parmas {Boolean} bool 是否遍历文件的子目录  
 * @parmas {RegExp} reg 匹配文件的正则  
 */

export default {
  install(Vue) {
    // 批量注册公用组件
    const components = require.context('@/components/common', true, /\.vue$/)
    components.keys().map(path => {
      // console.log(path);
      const fileName = path.replace(/(.*\/)*([^.]+).*/ig, "$2"); // 获取组件文件名
      Vue.component(fileName, components(path).default || components(path))
    })
  }
}
