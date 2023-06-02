import request from '@/utils/request'
import { formatData } from '@/utils'

//登录
export function userLogin(username,password){
  return request({
    url: '/user/login',
    method: 'post',
    data:formatData({username,password})
  })
}
//用户列表
export function userlist(data){
  return request({
    url: '/user/list',
    method: 'post',
    data:formatData(data)
  })
}
//重置密码
export function resetPwdApi(data){
  return request({
    url: '/user/pwdChange',
    method: 'post',
    data:formatData({tel:data.tel,password:data.password,validCode:data.validCode})
  })
}
//新增用户
export function add(data){
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}
//更新用户信息
export function update(data){
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
//更新用户信息
export function getValidCode(data){
  return request({
    url: '/user/getVerify',
    method: 'post',
    data:formatData({tel:data.tel,type:data.type,validCode:data.validCode})
  })
}
