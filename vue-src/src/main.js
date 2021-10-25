import Vue from 'vue'
import Vuex from 'vuex'

import LoadScript from 'vue-plugin-load-script'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import i18n from './locales'

import App from './App.vue'

Vue.use(Vuex)
Vue.use(LoadScript)
Vue.loadScript("https://app.plotbridge.net/js/chia-utils.js")
Vue.use(ElementUI)
Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        coin: 'XCH',
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
    i18n,
    render: h => h(App),
    store: store,
}).$mount('#app')