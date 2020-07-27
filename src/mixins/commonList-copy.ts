import { computed } from 'vue';
// import {}

export default {
  name: 'homeList',
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
  setup(props) {
    console.log(props);
    let listsNew = computed(() => {
      let arr = props.lists.map(item => {
        if(item.node){
          // item.node.createdAt = this.$utils.dateDis(item.node.createdAt)
          return item.node
        }else {
          // item.createdAt = this.$utils.dateDis(item.createdAt)
          return item
        }  
      })
      return arr
    })

    let toPost = (url,hash) =>{
      let reUrl = '/post'+ url.replace(/https:\/\/juejin.im\/post/i,'') + (hash ? hash: '')
      let routeUrl = this.$router.resolve(reUrl)
      window.open(routeUrl.href, '_blank');
    }
    let changeShow = (obj, type) =>{ //鼠标移入移出时，分享图标显示隐藏
      if(type / 1 === 1){
        obj.uploadIconShow = true
        // this.$set(obj, 'uploadIconShow', true)
      }else{
        !obj.uploadBoxShow && (obj.uploadIconShow = false)
      }
    }
    let share = (obj) =>{ //显示分享框
      obj.uploadIconShow = !obj.uploadBoxShow
      // this.$set(obj, 'uploadBoxShow', !obj.uploadBoxShow)
    }
    let shareWb = (obj) =>{ // 点击分享到微薄
      let title = obj.title + '-' + obj.user.username + '- 掘金专栏';
      let href = `
        http://service.weibo.com/share/share.php?url=
        ${obj.originalUrl}&sharesource=weibo&title=${title}
        &pic=${obj.screenshot ? encodeURIComponent(obj.screenshot) : encodeURIComponent(this.defaultScreenshot)}
        &sudaref=juejin.im&display=0&retcode=6102#_loginLayer_1587971734906
      `;
      window.open(href)
    }
    return {
      listsNew,
      toPost,
      changeShow,
      share,
      shareWb
    }
  },

}