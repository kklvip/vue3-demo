export function formatData(data) {
    let res = ''
    for (const i in data) {
      res += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
    }
    res = res.substr(0, res.length - 1)
    return res
  }
  // 图片加载成功
export function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image()
    image.src = url
    image.onload = function() {
      resolve(image)
    }
    image.onerror = function() {
      reject(new Error('图片加载失败：' + url))
    }
  })
}
// 将毫秒转换为分钟
export const millisecondToMinute = (time) => {
  let duration = Math.floor(time / 1000)
  let minute = Math.floor(duration / 60)
  let second = Math.floor(duration % 60)
  time =
    minute < 10
      ? second < 10
        ? `0${minute}:0${second}`
        : `0${minute}:${second}`
      : second < 10
      ? `${minute}:0${second}`
      : `${minute}:${second}`
  return time
}
// 将时间戳转换为具体的日期（参数：时间戳）
export const timestampToDate = (timestamp) => {
  let time = new Date(timestamp)

  // 获取年份
  let year = time.getFullYear()

  // 获取月份
  let month = time.getMonth() + 1
  // 对月份进行处理
  month = month < 10 ? `0${month}` : month


  // 获取日期
  let date = time.getDate()
  // 对日期进行处理
  date = date < 10 ? `0${date}` : date

  return `${year}-${month}-${date}`
}