// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from "vuex"
import "../theme/index.css"
import ElementUI from "element-ui"
import wkeys from "./wkeys"
import "../src/assets/index.css"

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
/* eslint-disable no-new */

const store = new Vuex.Store({
  state: {
    mnemonic: "",
    curIndex: 1
  },
  strict: process.env.NODE_ENV !== 'production',

  mutations: {
    setMnemonic(state, words) {
      state.mnemonic = words
      wkeys.set_main_key(state.mnemonic)
    },
    setIndex(state, num) {
      state.curIndex = num
    }
  }
})



new Vue({
  el: '#app',
  components: {
    App
  },
  store: store,
  template: '<App/>'
})
