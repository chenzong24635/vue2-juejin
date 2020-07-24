<template>
  <ul class="lists">
    <li @click.stop="linkTo(item)" class="list" v-for="item in listsNew" :key="item.entity.id">
      <img :src="item.entity.avatarLarge || 'https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg'" alt="" class="list-avatar">
      <div class="list-cnt">
        <div class="cnt-box">
          <p class="list-username" v-html="item.highlight.username || item.entity.username"></p>
          <p class="list-job">{{item.highlight.jobTitle || item.entity.jobTitle}}</p>
          <p v-if="item.highlight.company || item.entity.company" class="list-company">@{{item.highlight.company || item.entity.company}}</p>
        </div>
        <p  class="list-count">
          <span v-if="item.entity.postedPostsCount">{{item.entity.postedPostsCount}}个专栏 · </span>
          <span v-if="item.entity.followersCount">{{item.entity.followersCount}}个关注者</span>
        </p>
      </div>
      <focus-button></focus-button>
    </li>
  </ul>
</template>
<script>
import {mapActions} from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: '',
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
    let listsNew = computed(()=>{
      let arr = props.lists.map(item => {
        if(item.node){
          return item.node
        }else {
          return item
        }  
      })
      return arr
    }) 
    let router = useRouter()
    function linkTo(item) {
      let routeUrl = router.resolve(`/user/${item.entity.id}`)
      window.open(routeUrl.href, '_blank');
    }
    return {
      listsNew,
      linkTo
    }
  },

  methods: {
    ...mapActions([
      'showLoginModel'
    ]),
  }
}
</script>
<style scoped lang="less">
@import '../../assets/css/search.less';

</style>
