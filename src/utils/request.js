import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'
import { getToken,removeToken } from '@/utils/auth'
import { apiUrl } from '@/utils/config'

const service = axios.create({
    baseURL: apiUrl,
    timeout: 20000 // request timeout
  })

service.interceptors.request.use(config => {
  config.headers.Authorization = 'Basic kkl'
  if (store.getters.token) {
    if(getToken()!=undefined){
      config.headers.Authorization = 'bearer' + ' ' + getToken()
    }else{
      config.headers.Authorization = 'Basic kkl'
    }
  }
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

service.interceptors.response.use(
    response => {
      if (response.data.status === false) {
        ElMessage.error(response.data.msg)
      }
      if (response.data.code === 1001) {
        store.dispatch('LogOut').then(() => {
          Window.location.href="/#/login"
        })
      }
      return Promise.resolve(response)
    },
    () => {
      removeToken()
      ElMessageBox.alert("通信异常，请等待或重新登录","提示",{
        confirmButtonText:'确定',
        type:'warning',
        center:true,
        callback:()=>{
          window.location.href="/#/login"
        }
      })
    }
)
export default service
