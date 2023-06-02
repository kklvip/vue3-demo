import request from '@/utils/request'
import { formatData } from '@/utils'

//前端获取列表数据
export function listweb(val){
    return request({
        url: '/movie/list',
        method: 'post',
        data:formatData(val)
    })
}
//后台获取列表数据
export function listadmin(val){
    return request({
        url: '/movie/findPage',
        method: 'post',
        data:formatData(val)
    })
}
//前台获取分类列表数据
export function movieClassityList(){
    return request({
        url: '/movie/classity/list',
        method: 'get'
    })
}
//前台获取分类列表数据
export function movieClassityFindpage(val){
    return request({
        url: '/movie/classity/findPage',
        method: 'post',
        data:formatData(val)
    })
}
//获取单个视频
export function getById(id){
    return request({
        url: '/movie/getById',
        method: 'post',
        data:formatData({id:id})
    })
}

export function updateViews(val){
    return request({
      url:'/movie/updateViews',
      method:'post',
      data:formatData({id:val})
    })
  }

//获取单个视频
export function changeStatus(id,status){
    return request({
        url: '/movie/changeStatus',
        method: 'post',
        data:formatData({id:id,status:status})
    })
}

//更改分类状态
export function updateClassityStatus(id,status){
    return request({
        url: '/movie/updateClassityStatus',
        method: 'post',
        data:formatData({id:id,status:status})
    })
}

//获取单个视频
export function save(data){
    return request({
        url: '/movie/save',
        method: 'post',
        data
    })
}
//删除电影
export function deleteMovie(val){
    return request({
        url: '/movie/delete',
        method: 'post',
        data:formatData({id:val})
    })
}

//保存视频分类
export function saveClassity(data){
    return request({
        url: '/movie/saveClassity',
        method: 'post',
        data
    })
}

//删除视频分类
export function deleteClassity(id){
    return request({
        url: '/movie/deleteClassity',
        method: 'post',
        data:formatData({id:id})
    })
}




