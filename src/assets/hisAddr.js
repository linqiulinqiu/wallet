import wkeys from "../wkeys.js"
import {
    mapState
} from "vuex"
import {ethers} from 'ethers'
async function getAdds() {
    let addrinfo = []

    addrinfo = wkeys.addrs_info()

    console.log("addrinfo1", addrinfo)
    return addrinfo
}
async function getTotalb() {
    
}
export default {
    getAdds: getAdds
}