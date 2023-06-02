const getters = {
    token: state => state.user.token,
    user: state => state.user.user,
    nickname: state => state.user.nickname,
    status: state => state.user.status,
    roles: state => state.user.roles,
    userInfo: state => state.user.userInfo,
    headImg: state => state.user.headImg
    // permission_routers: state => state.permission.routers,

  }
  export default getters
