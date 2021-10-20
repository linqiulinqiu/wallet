import Vue from 'vue'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        coin:'XCH',
        baddr: false,
        free_xins: 0,
        xbalance: 0,
        deposit_addr: false,
        withdraw_addr: false
    },
    mutations: {
        setBaddr(state, baddr) {
            state.baddr = baddr
        },
        setFreeXins(state, cnt) {
            state.free_xins = cnt
        },
        setDepositAddr(state, addr) {
            state.deposit_addr = addr
        },
        setCoin(state, coin) {
            state.coin = coin
        }
    }
})

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
