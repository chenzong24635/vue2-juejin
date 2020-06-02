<template>
  <ul class="lists">
    <li @click.stop="linkTo(item)" class="list" v-for="item in listsNew" :key="item.entity.id">
      <img :src="item.entity.icon" alt="" class="list-avatar">
      <div class="list-cnt">
        <div class="cnt-box">
          <p class="list-username" v-html="item.highlight.username || item.entity.username"></p>
        </div>
        <p class="list-count">
          <span v-if="item.entity.subscribersCount" >{{item.entity.subscribersCount}}关注 · </span>
          <span v-if="item.entity.entryCount" >{{item.entity.entryCount}}文章</span>
        </p>
      </div>
      <focus-button></focus-button>
    </li>
  </ul>
</template>
<script>
import {mapActions} from 'vuex'

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
  computed: {
    listsNew: {
      get (){
        let arr = this.lists.map(item => {
          if(item.node){
            return item.node
          }else {
            return item
          }  
        })
        return arr
      }
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    ...mapActions([
      'showLoginModel'
    ]),
    linkTo(item) {
      let routeUrl = this.$router.resolve(`/tag/${item.entity.id}`)
      window.open(routeUrl.href, '_blank');
    }
  }
}
</script>
<style scoped lang="less">
@import '../../assets/css/search.less';

/deep/ .list-count{
  color: #2e3135;
  font-size: 14px;
  opacity: 1;
}
</style>
