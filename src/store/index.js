import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import wilayah from './wilayah'
import dapil from './dapil'
import hasil from './hasil'
import tabulasi from './tabulasi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    wilayah,
    dapil,
    hasil,
    tabulasi
  }
})
