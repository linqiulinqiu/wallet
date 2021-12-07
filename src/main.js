import Vue from 'vue'
import Vuex from 'vuex'

import LoadScript from 'vue-plugin-load-script'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import VueClipboard from 'vue-clipboard2'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "../theme/index.css"

import i18n from './locales'

import App from './App.vue'

Vue.use(Vuex)
Vue.use(LoadScript)
Vue.loadScript("https://app.plotbridge.net/js/chia-utils.js")
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.component('pulse-loader', PulseLoader)
Vue.config.productionTip = false

function queryCoin() {
    var coinHash = location.hash.substr(1);
    var curCoin = ""
    if (coinHash == "XCC" || coinHash == "XCH" || coinHash == "HDD") {
        curCoin = coinHash;
    } else {
        var sel = location.hash.substr(1);
        if (sel == null) curCoin = "";
        const coinMap = {
            xch: "XCH",
            xcc: "XCC",
            hdd: "HDD",
            chia: "XCH",
            chives: "XCC",
            HDDcoin: "HDD",
            hddcoin: "HDD",
        };
        const coin = coinMap[sel.toLowerCase()];
        if (!coin || coin.length == 0 || coin == null) {
            curCoin = "";
        } else {
            curCoin = coin;
        }
    }
    return curCoin
}


const store = new Vuex.Store({
    state: {
        coin: queryCoin(),
        baddr: false,
        free_xins: -1,
        xbalance: -1,
        xsupply: 0,
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
        setWithdrawAddr(state, addr) {
            state.withdraw_addr = addr
        },
        setXbalance(state, xb) {
            state.xbalance = xb
        },
        setXsupply(state, xs) {
            state.xsupply = xs
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