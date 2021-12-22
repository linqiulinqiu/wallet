// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from "vuex"
import "../theme/index.css"
import ElementUI from "element-ui"
import wkeys from "./wkeys"
import "../src/assets/master.css"
import hisAddr from "./assets/hisAddr"
import LoadScript from "vue-plugin-load-script"

Vue.use(LoadScript)
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.loadScript("/js/chia-utils.js")

/* eslint-disable no-new */

const store = new Vuex.Store({
    state: {
        mnemonic: "",
        coin: "xch",
        addrInfo: [{}],
        user: {},
        walletNFTs: [],
        showAdd: false,
        showMn: false,
        showWa: false
    },
    mutations: {
        setCoin(state, coin) {
            state.coin = coin
        },
        setAddrInfo(state, info) {
            state.addrInfo = info
        },
        setMnemonic(state, words) {
            state.mnemonic = words
            wkeys.set_main_key(state.coin, words).then(async function () {
                const addr = await wkeys.wallet_addr(0)
                const balance = await wkeys.balances()
                state.addrVisible = true
                console.log('wallet addr 0', addr)
                console.log("balance11", balance)
            })
        },
        setShowAdd(state, boolean) {
            state.showAdd = boolean
        },
        setShowWa(state, boolean) {
            state.showWa = boolean
        },
        setShowMn(state, boolean) {
            state.showMn = boolean
        },
        setUser(state, payload) {
            state.user = payload
        },
        setWalletNFTs(state, payload) {
            state.walletNFTs = payload
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