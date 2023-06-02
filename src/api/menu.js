import request from '@/utils/request'
import { formatData } from '@/utils'

//前端获取列表数据
export function listweb(){
    return request({
        url: '/menu/list',
        method: 'get'
      })
}
//后台获取列表数据
export function listAdmin(val){
  return request({
      url: '/menu/findPage',
      method: 'post',
      data:formatData(val)
    })
}
//上移
export function up(data){
  return request({
      url: '/menu/up',
      method: 'post',
      data:formatData(data)
    })
}
//下移
export function down(data){
  return request({
      url: '/menu/down',
      method: 'post',
      data:formatData(data)
    })
}
//新增或者保存
export function save(data){
  return request({
      url: '/menu/save',
      method: 'post',
      data
    })
}
//下移
export function updateStatus(data){
  return request({
      url: '/menu/updateStatus',
      method: 'post',
      data:formatData(data)
    })
}
//删除
export function deletemenu(id){
  return request({
    url:"/menu/delete",
    method:"post",
    data:formatData({id:id})
  })
}


