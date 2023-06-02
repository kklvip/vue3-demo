import request from '@/utils/request'
import { formatData } from '@/utils'

//获取列表数据
export function list(){
    return request({
        url: '/banner/getList',
        method: 'get'
      })
}
//后台获取列表数据
export function listadmin(data){
  return request({
      url: '/banner/findPage',
      method: 'post',
      data:formatData(data)
    })
}
export function getById(id){
  return request({
    url:'/banner/getById',
    method:'post',
    data:formatData({id:id})
  })
}
export function save(data){
  return request({
    url:'/banner/save',
    method:'post',
    data
  })
}
export function deleteBanner(val){
  return request({
    url:'/banner/delete',
    method:'post',
    data:formatData({id:val})
  })
}
export function changeStatus(id,status){
  return request({
      url: '/banner/changeStatus',
      method: 'post',
      data:formatData({id:id,status:status})
    })
}