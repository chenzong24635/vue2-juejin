export function debounce(fn:Function, delay:number = 500) {
  let timer = null;
  return function (args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function throttle(fn:Function, delay:number = 500) {
  let timer = null;
  return function (args) {
    if(timer)return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay)
  }
}


