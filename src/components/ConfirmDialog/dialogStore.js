import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const dialogStore = new Vuex.Store({
  state: {
    dialogList: []
  },

  mutations: {
    removeDialog (state, index) {
      state.dialogList.splice(index, 1)
    },
    setDialog (
      state,
      { title, text, cancelText, confirmText, resolve, reject }
    ) {
      state.dialogList.push({ title, text, cancelText, confirmText, resolve, reject })
    }
  }
})

export default dialogStore
