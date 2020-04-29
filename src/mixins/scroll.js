import {throttle} from '@/libs/util'

export default{
  data() {
    return {
      scrollTop: 0, //当前滚动位置，判断上下滚动
    }
  },
  created() {
    console.log('mixin');
  },
  mounted () {
    window.addEventListener('scroll', throttle(this.scrollBottom,200))
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollBottom)
  },
  methods: {
    scrollBottom() {
      let rect = document.body.getBoundingClientRect();
      let scrollTop = - rect.top;//滚动条距离顶部的高度
      let bodyHeight = rect.height; //当前页面的总高度
      let clientHeight = document.documentElement.clientHeight; //当前可视的页面高度
      if(this.scrollTop > scrollTop){ //判断是否上滚
        this.scrollTop = scrollTop;
        return
      }
      this.scrollTop = scrollTop;
      console.log(scrollTop + clientHeight > (bodyHeight - clientHeight/2));
      if(scrollTop + clientHeight > (bodyHeight - clientHeight/2)) {   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部 
        this.getLists();
        // this.$emit('getLists');
      }
    }
  }
}