import request from '@/utils/request'
import { formatData } from '@/utils'

//后台获取列表数据
export function listadmin(val){
    return request({
        url: '/soft/findPage',
        method: 'post',
        data:formatData(val)
    })
}
//前端获取列表数据
export function listweb(val){
    return request({
        url: '/soft/list',
        method: 'post',
        data:formatData(val)
    })
}

export function getSoftById(id){
    return request({
        url:'/soft/getById',
        method:'post',
        data:formatData({id:id})
    })
}

export function getSoftById2(id){
    return request({
        url:'/soft/getById2',
        method:'post',
        data:formatData({id:id})
    })
}

//更改软件状态
export function changeStatus(id,status){
    return request({
        url: '/soft/changeStatus',
        method: 'post',
        data:formatData({id:id,status:status})
    })
}

//保存软件
export function save(data){
    return request({
        url: '/soft/save',
        method: 'post',
        data
    })
}

//删除软件
export function deleteSoft(val){
    return request({
        url: '/soft/delete',
        method: 'post',
        data:formatData({id:val})
    })
}

//前端获取分类列表数据
export function listclassityweb(){
    return request({
        url: '/soft/classity/list',
        method: 'get'
    })
}

//后端获取分类列表
export function classityFindPage(){
    return request({
        url: '/soft/classity/findPage',
        method: 'get'
    })
}




//更改软件分类状态
export function updateClassityStatus(id,status){
    return request({
        url: '/soft/classity/changeStatus',
        method: 'post',
        data:formatData({id:id,status:status})
    })
}

//删除软件分类
export function deleteClassity(id){
    return request({
        url: '/soft/classity/delete',
        method: 'post',
        data:formatData({id:id})
    })
}

//保存软件分类
export function saveClassity(data){
    return request({
        url: '/soft/classity/save',
        method: 'post',
        data
    })
}

