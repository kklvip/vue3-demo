import Cookies from 'js-cookie'

const TokenKey = 'kkl-Token'
// const UserKey = 'kkl-UserInfo'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function authorization() {
  return {
    authorization: 'bearer ' + Cookies.get(TokenKey)
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
