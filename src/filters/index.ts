export function $_dateDis(date: string|number) {
  let stime:number = new Date(date + '').getTime()
  let etime:number = Date.now()
  let dtime:number = etime - stime
  let year:number = Math.floor(dtime / (24 * 3600 * 1000 * 365))
  if (year > 0) {
    return year + '年前'
  }
  let days:number = Math.floor(dtime / (24 * 3600 * 1000))
  if (days > 0) {
    return days + '天前'
  }
  let hours:number = Math.floor(dtime / (3600 * 1000))
  if (hours > 0) {
    return hours + '小时前'
  }
  let minutes:number = Math.floor(dtime / (60 * 1000))
  if (minutes > 5) {
    return minutes + '分钟前'
  }
  return '刚刚'
}

export function $_toLocaleDateString(date: string|number){
  return new Date(date).toLocaleDateString()
}

export function $_read(val: string|number) {
  let size:number = 10 //每秒10字
  let time:number = val / size
  let m:number = ~~(time / 60)
  let s:number = ~~(time % 60)
  let str:string = ''
  if(m) {
    str += m + '分'
  }
  if(s){
    str += s + '秒'
  }
  return str 
}