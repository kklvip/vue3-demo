import request from '@/utils/request'
import { formatData } from '@/utils'

//前端获取列表数据
export function listweb(val){
    return request({
        url: '/blog/list',
        method: 'post',
        data:formatData(val)
      })
}
//后台获取列表数据
export function list(val){
  return request({
      url: '/blog/findPage',
      method: 'post',
      data:formatData(val)
    })
}
export function getBlogById(id){
  return request({
    url:'/blog/getById',
    method:'post',
    data:formatData({id:id})
  })
}

export function getBlogById2(id){
  return request({
    url:'/blog/getById2',
    method:'post',
    data:formatData({id:id})
  })
}
export function updateViews(val){
  return request({
    url:'/blog/updateViews',
    method:'post',
    data:formatData({id:val})
  })
}
export function save(data){
  return request({
    url:'/blog/save',
    method:'post',
    data
  })
}
export function deleteBlog(val){
  return request({
    url:'/blog/delete',
    method:'post',
    data:formatData({id:val})
  })
}
export function changeStatus(id,status){
  return request({
      url: '/blog/changeStatus',
      method: 'post',
      data:formatData({id:id,status:status})
    })
}
//blog分类后台获取
export function classityFindPage(data){
  return request({
    url:'/blog/classity/findPage',
    method:'post',
    data:formatData(data)
  })
}
//blog分类直接获取
export function getBlogClassity(){
  return request({
    url:'/blog/classity/list',
    method:'get'
  })
}
//更新博客分类的状态
export function updateClassityStatus(id,status){
  return request({
    url:'/blog/classity/changeStatus',
    method:'post',
    data:formatData({id:id,status:status})
  })
}
export function deleteBlogClassity(val){
  return request({
    url:'/blog/classity/delete',
    method:'post',
    data:formatData({id:val})
  })
}
export function classitySave(data){
  return request({
    url:'/blog/classity/save',
    method:'post',
    data
  })
}