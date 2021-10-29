import Vue from 'vue'
import Vuex, { Module } from 'vuex'

import Auth from './modules/auth'
import Quantity from './modules/quantity'
Vue.use(Vuex)

const createStore = () => { 
  return new Vuex.Store({
  state: {},
  modules: {
    Auth,
    Quantity
  }
})
}
export default createStore