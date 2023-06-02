import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getter'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    phoneFlag:null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  },
  getters,
  plugins:[createPersistedState()]
})



