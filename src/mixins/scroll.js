import {throttle} from '@/libs/util'
/**
 * 公用触底事件
 */

export default {
  data() {
    return {
      _scrollingElement: null,
      _isReachBottom: false,
      reachBottomDistance: 200 // 距离底部多远触发
    }
  },
  mounted() {
    this._scrollingElement = document.scrollingElement
    window.addEventListener('scroll', throttle(this._windowScrollHandler))
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this._windowScrollHandler)
  },
  methods: {
    _windowScrollHandler() {
      let scrollHeight = this._scrollingElement.scrollHeight
      let currentHeight = this._scrollingElement.scrollTop + this._scrollingElement.clientHeight + this.reachBottomDistance
      if (currentHeight < scrollHeight && this._isReachBottom) {
        this._isReachBottom = false
      }
      if (this._isReachBottom) {
        return
      }
      if (currentHeight >= scrollHeight) {
        this._isReachBottom = true
        typeof this.getLists === 'function' && this.getLists()
      }
    }
  },
}
/* export default{
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
  beforeDestroy(){
    console.log('de');
    
    window.removeEventListener("scroll",throttle)
    window.removeEventListener("scroll",this.scrollBottom)
    window.removeEventListener("scroll",throttle(this.scrollBottom,200))
  },
  methods: {
    fn() {
      
    },
    scrollBottom() {
      console.log(1);
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
} */