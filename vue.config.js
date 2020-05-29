const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/*.less')]
    }
  },
  devServer: {
    proxy: {
      '/login/oauth/access_token': {/* auth */
        target: 'https://github.com',
        changeOrigin: true,
      },
      '/auth/type/phoneNumber': {/* auth login */
        target: 'https://juejin.im',
        changeOrigin: true,
      },
      '/v1/topicList': {/* topics */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/pinList/topic': {/* topic 列表 */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/topic': {/* topic 话题信息 参加人*/
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
      '/v1/getDetailData': { /* post 文章内容 */
        target: 'https://post-storage-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get_multi_user': { /* post 关于作者 */
        target: 'https://lccro-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get_entry_by_self': { /* user 专栏 */
        target: 'https://timeline-merger-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getUserList': { /* user 沸点 */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get_related_entry': { /* post 侧边相关文章 */
        target: 'https://timeline-merger-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getRecommendEntryByTagIds': { /* post 底部相关推荐 */
        target: 'https://post-storage-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get_tag_entry': { /* tag */
        target: 'https://timeline-merger-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/tag': { /* tag tagDetail */
        target: 'https://gold-tag-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/tags': { /* tag subscribe */
        target: 'https://gold-tag-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getListByLastTime': { /* books */
        target: 'https://xiaoce-timeline-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getNavList': { /* books-navs */
        target: 'https://xiaoce-timeline-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/get': { /* book */
        target: 'https://xiaoce-cache-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getListSection': { /* book 目录 */
        target: 'https://xiaoce-cache-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getListBuy': { /* book buyer */
        target: 'https://xiaoce-cache-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v2/getCityList': { /* event-city */
        target: 'https://event-storage-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v2/getEventList': { /* event-list */
        target: 'https://event-storage-api-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getHotRecommendList': { /* pins hot */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/pinList/topic': { /* pins list2 */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/getByID': { /* pin 赞数 */
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/comments': { /* pin 评论 */
        target: 'https://hot-topic-comment-wrapper-ms.juejin.im',
        changeOrigin: true,
      },
      '/v1/reply': { /* pin 评论的恢复 */
        target: ' https://hot-topic-comment-wrapper-ms.juejin.im',
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
