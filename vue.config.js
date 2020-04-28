const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/main.less')]
    }
  },
  devServer: {
    proxy: {
      /* '/v1/topicList': {
        target: 'https://web-api.juejin.im/query',
        changeOrigin: true,
      }, */
      '/v1/topicList': {/* topic */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/auth/type': {
        target: 'https://juejin.im',
        changeOrigin: true,
      },
      '/v1/get_tag_entry': { /* tag */
        target: 'https://timeline-merger-ms.juejin.im',
        changeOrigin: true,
      },
    }
  },  
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
