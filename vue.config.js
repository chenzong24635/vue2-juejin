const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProduction = process.env.NODE_ENV === 'production'
// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios'

}
const cdn = {
  // 开发环境
  dev: {
    css: [
    ],
    js: []
  },
  // 生产环境
  build: {
    css: [
    ],
    js: [
      "//cdn.bootcss.com/vue/2.6.11/vue.min.js",
      "//cdn.bootcss.com/vuex/3.1.3/vuex.min.js",
      "//cdn.bootcss.com/vue-router/3.1.6/vue-router.min.js",
      "//cdn.bootcss.com/axios/0.19.2/axios.min.js"
    ]
  }
}

module.exports = {
  publicPath: process.env.BASE_URL,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/css/main.less'),
        path.resolve(__dirname, 'src/assets/css/common.less'),
      ]
    }
  },
  // configureWebpack: {
  //   externals: {
  //     'vue': 'Vue',
  //     'vuex': 'Vuex',
  //     'vue-router': 'VueRouter',
  //     'axios': 'axios',
  //   },
  // },
  configureWebpack: config => {
    if (isProduction) {
      // externals里的模块不打包
      Object.assign(config, {
        externals
      })
      // 开启gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      if (process.env.npm_config_report) {
        // 打包后模块大小分析//npm run build --report
        config.plugins.push(new BundleAnalyzerPlugin())
      }
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack(config) {
    // 对vue-cli内部的 webpack 配置进行更细粒度的修改
    config.optimization.minimizer('terser').tap((args) => {
        // 去除生产环境console
        args[0].terserOptions.compress.drop_console = true
        return args
    })

    // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
    config.plugin('html').tap(args => {
        if (process.env.NODE_ENV === 'production') {
            args[0].cdn = cdn.build
        }
        if (process.env.NODE_ENV === 'development') {
            args[0].cdn = cdn.dev
        }
        return args
    })

    //SVG封装  
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
  },
  devServer: {
    proxy: {
      '/login/oauth/access_token': {
        /* auth */
        target: 'https://github.com',
        changeOrigin: true,
      },
      // '/api/user/login': {/* auth login1 */
      //   target: 'http://juejin.ncgame.cc',
      //   changeOrigin: true,
      // },
      // '/auth/type/phoneNumber': {/* auth login */
      //   target: 'https://juejin.im',
      //   changeOrigin: true,
      // },
      '/v1/topicList': {
        /* topics */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/pinList/topic': {
        /* topic 列表 */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/topic': {
        /* topic 话题信息 参加人*/
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/auth/type': {
        target: 'https://juejin.im',
        changeOrigin: true,
      },
      '/v1/auth/login': {
        target: 'https://juejin.im',
        changeOrigin: true,
      },
      '/v1/getDetailData': {
        /* post 文章内容 */
        target: 'https://post-storage-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get_multi_user': {
        /* post 关于作者 */
        target: 'https://lccro-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/comments/entry': {
        /* post 关于作者 */
        target: 'https://comment-wrapper-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get_entry_by_self': {
        /* user 专栏 */
        target: 'https://timeline-merger-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getUserList': {
        /* user 沸点 */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get_related_entry': {
        /* post 侧边相关文章 */
        target: 'https://timeline-merger-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getRecommendEntryByTagIds': {
        /* post 底部相关推荐 */
        target: 'https://post-storage-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get_tag_entry': {
        /* tag */
        target: 'https://timeline-merger-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/tag': {
        /* tag tagDetail */
        target: 'https://gold-tag-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/tags': {
        /* tag subscribe */
        target: 'https://gold-tag-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getListByLastTime': {
        /* books */
        target: 'https://xiaoce-timeline-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getNavList': {
        /* books-navs */
        target: 'https://xiaoce-timeline-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get': {
        /* book */
        target: 'https://xiaoce-cache-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getListSection': {
        /* book 目录 */
        target: 'https://xiaoce-cache-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getListBuy': {
        /* book buyer */
        target: 'https://xiaoce-cache-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v2/getCityList': {
        /* event-city */
        target: 'https://event-storage-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v2/getEventList': {
        /* event-list */
        target: 'https://event-storage-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getHotRecommendList': {
        /* pins hot */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/pinList/topic': {
        /* pins list2 */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getByID': {
        /* pin 内容 */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/comments': {
        /* pin 评论 */
        target: 'https://hot-topic-comment-wrapper-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/reply': {
        /* pin 评论的恢复 */
        target: ' https://hot-topic-comment-wrapper-ms.juejin.im',
        changeOrigin: true,
      },

    }
  },
  productionSourceMap: false,

}