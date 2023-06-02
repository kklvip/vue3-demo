import request from '@/utils/request'
import { formatData } from '@/utils' 

export function getRoleslist(){
  return request({
    url: '/menus/roles',
    method: 'get',
  })
}

export function getRolesByOne(id){
  return request({
    url: '/menus/getRolesByOne',
    method: 'post',
    data:formatData({id:id})
  })
}


export function saveRoles(data){
  return request({
    url: '/menus/saveRoles',
    method: 'post',
    data
  })
}
export function deleteRoles(id){
  return request({
    url: '/menus/deleteRoles',
    method: 'post',
    data:formatData({id:id})
  })
}

export function changeRolesStatus(id,status){
  return request({
    url: '/menus/changeRolesStatus',
    method: 'post',
    data:formatData({id:id,status:status})
  })
}

//修改角色信息
export function modifyRoles(data){
  return request({
    url: '/menus/modifyRoles',
    method: 'post',
    data:formatData(data)
  })
}

//修改角色信息
export function modifyRoleShip(data){
  return request({
    url: '/menus/modifyRoleShip',
    method: 'post',
    data:data
  })
}






