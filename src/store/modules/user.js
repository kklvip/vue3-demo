import { userLogin } from '@/api/user'
import { getUserInfo } from '@/api/public'
import { loadImageAsync } from '@/utils'
import { imgHost, defaultHead } from '@/utils/config'
import { getToken,setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    user: null,
    status: '',
    token: getToken(),
    name: '',
    userInfo: '',
    roles: '',
    headImg:''
  },
  mutations: {
      SET_TOKEN: (state, token) => {
        state.token = token
      },
      SET_USER: (state, user) => {
        state.user = user
      },
      SET_STATUS: (state, status) => {
        state.status = status
      },
      SET_NAME: (state, name) => {
        state.name = name
      },
      SET_AVATAR: (state, avatar) => {
        state.userInfo.headImg = avatar
      },
      SET_ROLES: (state, roles) => {
        state.roles = roles
      },

      SET_USERINFO: (state, info) => {
        state.userInfo = info
      }
  },
  actions: {
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        userLogin(username, userInfo.password).then(response => {
          if(response){
            const data = response.data
            if(data.code=="200"){
              commit('SET_TOKEN', data.data)
              setToken(data.data)
            }
            resolve(data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({commit}){
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          if(data.code=="200"){
            commit('SET_USERINFO',data.data)
            commit('SET_USER',true)
            commit('SET_ROLES',data.data.roles)
            loadImageAsync(imgHost+data.data.headImg).then(() => {
              // console.log('头像加载成功')
            }).catch((error) => {
              console.log(error)
              commit('SET_AVATAR', defaultHead)
            })
            commit('SET_AVATAR', data.data.headImg)
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_USER',null)
        commit('SET_ROLES','')
        commit('SET_TOKEN','')
        removeToken()
        resolve()
      })
    },
  }
}
export default user
