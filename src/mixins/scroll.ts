import { ref, onMounted, onBeforeUnmount } from 'vue';
import { debounce } from '../libs/util';

export default function scroll(){
    let scrollTop = ref(0)
    // 滚到底时值 +1， watch监听是否改变，
    let isBottom = ref(0)
    let scrollBottom = debounce(() => {
      let rect = document.body.getBoundingClientRect();
      let _scrollTop = -rect.top; // 滚动条距离顶部的高度
      let _bodyHeight = rect.height; // 当前页面的总高度
      let _clientHeight = document.documentElement.clientHeight; // 当前可视的页面高度
      if (scrollTop.value > _scrollTop) { // 判断是否上滚
        scrollTop.value = _scrollTop;
        return
      }
      scrollTop.value = _scrollTop;
      if (_scrollTop + _clientHeight > (_bodyHeight - _clientHeight / 1.5)) { // 距离顶部+当前高度 >=文档总高度 即代表滑动到底部
        isBottom.value++
      }
    })
    onMounted(()=>{
      window.addEventListener('scroll', scrollBottom)
    })

    onBeforeUnmount(()=>{
      window.removeEventListener('scroll', scrollBottom)
    })
    return {
      isBottom
    }
}
