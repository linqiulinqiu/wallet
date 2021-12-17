import wkeys from "../wkeys.js"
import {
    mapState
} from "vuex"

async function getAdds() {
    let addrinfo = []
    const addr = await wkeys.wallet_addr(0)
    console.log('wallet_addr', addr)
    const bal = -1
    //    const bal = await wkeys.balances()
    //    console.log("wallet_balance", bal)
    addrinfo = [{
        address: addr,
        balance: bal
    }]
    console.log("addrinfo", addrinfo)
    return addrinfo
}
export default {
    getAdds: getAdds
}