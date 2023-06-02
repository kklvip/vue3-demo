//本地
export const apiUrl = 'http://localhost:8082'
export const imgHost = "http://localhost:8000"
export const socketUrl = 'ws://localhost:8082'

//临时服务器
// export const apiUrl = 'http://test.kkl-z.cn'
// export const imgHost = "http://img.kkl-z.cn"
// export const socketUrl = 'api.kkl-z.cn'

//服务器
// export const apiUrl = 'http://api.kkl-z.cn'
// export const imgHost = "http://img.kkl-z.cn"
// export const socketUrl = 'ws://api.kkl-z.cn'

//默认头像
export const defaultHead = "/head/default_head.png"
// 图片上传地址
export const imgUpload = apiUrl+'/file/upload'
export const fileUpload = apiUrl+'/file/upload'
// 限制图片
export function limitImage(type) {
  return type.indexOf('jpeg') !== -1 || type.indexOf('gif') !== -1 || type.indexOf('png') !== -1
}
export function limitSize(type){
  if(type=="image"){
    return 10
  }else if(type=="video"){
    return 2048
  }else if(type=="soft"){
    return 2048
  }else{
    return 10
  }
}

//限制软件
export function limitSoft(type) {
  return type.indexOf('exe') !== -1 || type.indexOf('zip') !== -1 || type.indexOf('dmg') !== -1|| type.indexOf('rar') !== -1 ||type.indexOf('7z') !== -1 
}


/**
 * 
 * @param {
 * 0:头像
 * 1:博客
 * 2:笔记
 * 3:软件图片
 * 4:软件
 * 5:电影图片
 * 6:电影视频
 * 7:轮播图
 * } type 
 * @returns 
 */
export function imgUploadType(type) {
  return {
    type
  }
}
