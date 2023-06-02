import request from '@/utils/request'
import { formatData } from '@/utils'

//后台获取列表数据
export function listadmin(val){
    return request({
        url: '/note/findPage',
        method: 'post',
        data:formatData(val)
      })
}
//前端获取列表数据
export function listweb(val){
    return request({
        url: '/note/list',
        method: 'post',
        data:formatData(val)
      })
}
export function changeStatus(id,status){
  return request({
    url: '/note/changeStatus',
    method: 'post',
    data:formatData({id:id,status:status})
  })
}
export function updateViews(val){
  return request({
    url:'/note/updateViews',
    method:'post',
    data:formatData({id:val})
  })
}  
export function save(data){
  return request({
    url:'/note/save',
    method:'post',
    data
  })
}
export function deleteNote(val){
  return request({
    url:'/note/delete',
    method:'post',
    data:formatData({id:val})
  })
}
export function getNoteById(id){
  return request({
    url:'/note/getById',
    method:'post',
    data:formatData({id:id})
  })
}

export function getNoteById2(id){
  return request({
    url:'/note/getById2',
    method:'post',
    data:formatData({id:id})
  })
}

//Note分类分页获取
export function getNoteClassityList(data){
  return request({
    url:'/note/classity/findPage',
    method:'post',
    // data:formatData({id:id})
    data:formatData(data)
  })
}

//Note分类直接获取
export function getNoteClassity(){
  return request({
    url:'/note/classity/list',
    method:'get'
  })
}
export function classitySave(data){
  return request({
    url:'/note/classity/save',
    method:'post',
    data
  })
}
  
export function deleteNoteClassity(val){
  return request({
    url:'/note/classity/delete',
    method:'post',
    data:formatData({ids:val})
  })
}
//更新笔记分类的状态
export function updateClassityStatus(id,status){
  return request({
    url:'/note/classity/changeStatus',
    method:'post',
    data:formatData({id:id,status:status})
  })
}