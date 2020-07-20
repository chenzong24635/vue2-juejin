function debounce(fn, delay = 500) {
  let timer = null;
  return function (args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function throttle(fn, delay = 500) {
  let timer = null;
  return function (args) {
    if(timer)return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay)
  }
}

export default{
  debounce,
  throttle,
}