import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    showMenu: false
  },
  mutations: {
    changeShowMenu(state) {
      state.showMenu = !state.showMenu
    }
  }
})