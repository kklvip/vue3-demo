import request from '@/utils/request'
import { formatData } from '@/utils'

//前端获取列表数据
export function menusList(data){
  return request({
    url: '/menus/findPage',
    method: 'post',
    data:formatData(data)
  })
}

//前端获取列表数据
export function menusListAll(){
  return request({
    url: '/menus/list',
    method: 'get'
  })
}

//获取所有一级菜单
export function getLevel1(){
  return request({
    url: '/menus/getLevel1',
    method: 'get'
  })
}

//获取所有二级菜单
export function getLevel2(){
  return request({
    url: '/menus/getLevel2',
    method: 'get'
  })
}


//保存后端菜单
export function save(data){
  return request({
    url: '/menus/saveMenus',
    method: 'post',
    data
  })
}

//修改后端菜单状态
export function changeStatus(id,status){
  return request({
    url: '/menus/changeMenusStatus',
    method: 'post',
    data:formatData({id:id,status:status})
  })
}

//删除后端菜单
export function deleteStatus(id){
  return request({
    url: '/menus/delete',
    method: 'post',
    data:formatData({id:id})
  })
}





