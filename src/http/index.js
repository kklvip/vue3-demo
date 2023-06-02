// import axios from "axios"
// const $http= axios.create({
//     baseURL:"",
//     timeout:"1000"

// })
// //添加请求拦截器
// $http.interceptors.request.use(function(config){
//     config.headers.token = "11111111";
//     return config
// },function(error){
//     return Promise.reject(error)
// });

// //添加响应拦截器
// $http.interceptors.response.use(function(response){
//     return response
// },function(error){
//     return Promise.reject(error)
// })

// export default $http
import axios from 'axios';
import { ElLoading } from 'element-plus';


let loading;

const startLoading = () => {
  const options = {
    lock: true,
    text: "加载中...",
    background: 'rgba(0,0,0,0.7)'
  }
  loading = ElLoading.service(options);
}

const endLoading = () => {
  loading.close();
}

// 请求拦截
axios.interceptors.request.use((config) => {
  // 加载
  startLoading();
  return config;
})


// 响应拦截
axios.interceptors.response.use((response) => {
  // 结束loading
  endLoading();
  return response;
}, error => {
  // 结束loading
  endLoading();
  // 错误提醒
  return Promise.reject(error);
})

export default axios;