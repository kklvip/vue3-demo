import request from '@/utils/request'
import { formatData } from '@/utils'
export function getUserInfo(){
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function userRoles(){
  return request({
    url: '/user/roles',
    method: 'get',
  })
}
export function userSave(data){
  return request({
    url: '/user/save',
    method: 'post',
    data
  })
}

export function publicInfo(){
  return request({
    url: '/user/public/info',
    method: 'get'
  })
}
export function getRegion(){
  return request({
    url: '/utils/region/list',
    method: 'get'
  })
}


export function getProvince(){
  return request({
    url: '/utils/region/get/province',
    method: 'post'
  })
}

export function getCity(id){
  return request({
    url: '/utils/region/get/city',
    method: 'post',
    data:formatData({id:id})
  })
}

export function getCounty(id){
  return request({
    url: '/utils/region/get/county',
    method: 'post',
    data:formatData({id:id})
  })
}