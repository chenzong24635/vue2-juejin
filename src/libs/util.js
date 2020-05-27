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

const dateDis = date => {
  let stime = new Date(date + '').getTime()
  // console.log(date,stime);
  let etime = Date.now()
  let dtime = etime - stime
  let year = Math.floor(dtime / (24 * 3600 * 1000 * 365))
  if (year > 0) {
    return year + '年前'
  }
  let days = Math.floor(dtime / (24 * 3600 * 1000))
  if (days > 0) {
    return days + '天前'
  }
  let hours = Math.floor(dtime / (3600 * 1000))
  if (hours > 0) {
    return hours + '小时前'
  }
  let minutes = Math.floor(dtime / (60 * 1000))
  if (minutes > 5) {
    return minutes + '分钟前'
  }
  return '刚刚'
}
export default{
  debounce,
  throttle,
  dateDis
}