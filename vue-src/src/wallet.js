import {
    ethers
} from 'ethers'
import token_abi from './token-abi.json'

const bsc = {}

async function connect(coin) {
    if (typeof window.ethereum !== 'undefined') {
        bsc.prefix = coin.toLowerCase()
        bsc.provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        await bsc.provider.send("eth_requestAccounts", [])
        if (coin == 'XCC') {
            bsc.contract_addr = '0x2077bFC955E9fBA076CA344cD72004C6c4a80a09'
        } else if (coin == 'XCH') {
            bsc.contract_addr = '0x134315EF3D11eEd8159fD1305af32119a046375A'
        } else {
            return false
        }
        bsc.signer = bsc.provider.getSigner()
        bsc.addr = await bsc.signer.getAddress()
        bsc.ctr = new ethers.Contract(bsc.contract_addr, token_abi, bsc.signer)
        return bsc.addr
    }
    return false
}

async function get_deposit_addr() {
    var xaddr = await bsc.ctr.getXinAddr()
    if (xaddr === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        xaddr = false
    } else {
        if ('ChiaUtils' in window) {
            xaddr = window.ChiaUtils.puzzle_hash_to_address(xaddr, bsc.prefix)
        }
    }
    return xaddr
}

async function get_withdraw_addr() {
    var xaddr = await bsc.ctr.getXoutAddr()
    if (xaddr === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        xaddr = false
    } else {
        if ('ChiaUtils' in window) {
            xaddr = window.ChiaUtils.puzzle_hash_to_address(xaddr, bsc.prefix)
        }
    }
    return xaddr
}

async function check_bsc() {
    const xaddr_dep = await get_deposit_addr()
    const xaddr_wdr = await get_withdraw_addr()
    const free_addrs = await bsc.ctr.getFreeXinAddrCount()
    return {
        free_xins: free_addrs.toNumber(),
        deposit_addr: xaddr_dep,
        withdraw_addr: xaddr_wdr
    }
}

async function obtain_deposit_addr(callback) {
    const bindf = bsc.ctr.filters.BindXin()
    const bnb = ethers.constants.WeiPerEther.div(2000)
    try {
        await bsc.ctr.bindXin({
            value: bnb
        })
        // eslint-disable-next-line no-unused-vars
        bsc.ctr.on(bindf, (from, _to, _amount, _evt) => {
            if (ethers.utils.getAddress(from) == ethers.utils.getAddress(bsc.addr)) {
                if (typeof (callback) == 'function') {
                    get_deposit_addr().then(callback)
                }
            }
        })
        return 'ok'
    } catch (e) {
        var text = e.message
        if ('data' in e) {
            if ('message' in e.data) {
                text = e.data.message
            }
        }
        return text
    }
}

async function bind_withdraw_addr(xaddr, callback) {
    var xhex = ''
    console.log('xaddr', xaddr)
    if ('ChiaUtils' in window) {
        xhex = window.ChiaUtils.address_to_puzzle_hash(xaddr)
    }
    if (!xhex) return false
    const bindf = bsc.ctr.filters.BindXout()
    try {
        await bsc.ctr.bindXout(xhex)
        // eslint-disable-next-line no-unused-vars
        bsc.ctr.on(bindf, (from, to, amount, evt) => {
            if (ethers.utils.getAddress(from) == ethers.utils.getAddress(bsc.addr)) {
                if (typeof (callback) == 'function') {
                    get_withdraw_addr().then(callback)
                }
            }
        })
        return 'ok'
    } catch (e) {
        var text = e.message
        if ('data' in e) {
            if ('message' in e.data) {
                text = e.data.message
            }
        }
        return text
    }
}


export default {
    bind_withdraw_addr: bind_withdraw_addr,
    connect: connect,
    check_bsc: check_bsc,
    obtain_deposit_addr: obtain_deposit_addr
}