export default {
  name: 'homeList',
  components: {},
  props: {
    lists: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: 'home'
    },
    hasNextPage: { //是否有下一页
      type: Boolean,
      default: true
    },
  },
  computed: {
    listsNew: {
      get (){
        let arr = this.lists.map(item => {
          if(item.node){
            // item.node.createdAt = this.$utils.dateDis(item.node.createdAt)
            return item.node
          }else {
            // item.createdAt = this.$utils.dateDis(item.createdAt)
            return item
          }  
        })
        return arr
      }
    }
  },
  data () {
    return {
      scrollTop: 0, //当前滚动位置，判断上下滚动
      defaultScreenshot: "https://b-gold-cdn.xitu.io/images/weibo-share.png"
    }
  },
  created(){
  },
  methods: {
    toPost(url,hash){
      let reUrl = '/post'+ url.replace(/https:\/\/juejin.im\/post/i,'') + (hash ? hash: '')
      let routeUrl = this.$router.resolve(reUrl)
      window.open(routeUrl.href, '_blank');
    },
    changeShow (obj, type) { //鼠标移入移出时，分享图标显示隐藏
      if(type / 1 === 1){
        obj.uploadIconShow = true
        // this.$set(obj, 'uploadIconShow', true)
      }else{
        !obj.uploadBoxShow && (obj.uploadIconShow = false)
      }
    },
    share(obj) { //显示分享框
      obj.uploadIconShow = !obj.uploadBoxShow
      // this.$set(obj, 'uploadBoxShow', !obj.uploadBoxShow)
    },
    shareWb(obj) { // 点击分享到微薄
      let title = obj.title + '-' + obj.user.username + '- 掘金专栏';
      let href = `
        http://service.weibo.com/share/share.php?url=
        ${obj.originalUrl}&sharesource=weibo&title=${title}
        &pic=${obj.screenshot ? encodeURIComponent(obj.screenshot) : encodeURIComponent(this.defaultScreenshot)}
        &sudaref=juejin.im&display=0&retcode=6102#_loginLayer_1587971734906
      `;
      window.open(href)
    },
  }
}