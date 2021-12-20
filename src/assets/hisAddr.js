import wkeys from "../wkeys.js"
import {
    mapState
} from "vuex"

async function getAdds() {
    let addrinfo = []
    for (let i = 0; i < 10; i++) {
        let item = {}
        item.address = await wkeys.wallet_addr(i)
        item.balance = -1
        // item.time = 2021
        addrinfo.push(item)
    }
    // const addr = await wkeys.wallet_addr(0)
    // console.log('wallet_addr', addr)
    // const bal = -1
    // const bal = await wkeys.balances()
    // console.log("wallet_balance", bal)
    // addrinfo = [{
    //     address: addr,
    //     balance: bal
    // }]
    console.log("addrinfo1", addrinfo)
    return addrinfo
}
export default {
    getAdds: getAdds
}