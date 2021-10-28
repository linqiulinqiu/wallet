import {
    ethers
} from 'ethers'
import token_abi from './token-abi.json'

const bsc = {}

async function switch_network() {
    try {
        await bsc.provider.send('wallet_switchEthereumChain', [{
            chainId: '0x61'
        }])
    } catch (switchError) {
        const ChainNotExist = 4902
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === ChainNotExist) {
            try {
                await bsc.provider.send(
                    'wallet_addEthereumChain',
                    [{
                        chainId: '0x61',
                        chainName: 'Binance Smart Chain (Testnet)',
                        nativeCurrency: {
                            name: 'TBNB',
                            symbol: 'TBNB',
                            decimals: 18
                        },
                        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
                        blockExplorerUrl: 'https://testnet.bscscan.com',
                    }])
            } catch (addError) {
                return addError
            }
        } else {
            return switchError
        }
    }
    return false
}

async function ensure_network() {
    const network = await bsc.provider.getNetwork()
    bsc.provider.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload()
            return false
        }
    })
    if (network.chainId != 97) {
        const err = await switch_network()
        if (err) return err
    }
    if (network.chainId == 97 && network.name == 'bnbt') {
        return false
    }
}
async function token_balance(bn, cached) {
    var balance = bsc.xbalance
    if(!cached||!balance){
        balance = await bsc.ctr.balanceOf(bsc.addr)
    }
    if (!bn) {
        return ethers.utils.formatUnits(balance, bsc.decimals)
    } else {
        return balance
    }
}

async function connect(coin, commit) {
    if (typeof window.ethereum !== 'undefined') {
        bsc.prefix = coin.toLowerCase()
        bsc.provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        const neterr = await ensure_network()
        if (neterr) throw neterr
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
        bsc.decimals = await bsc.ctr.decimals()
        bsc.xbalance = await token_balance(true)
        if(coin == 'XCC'){
            bsc.deposit_fee_min = ethers.utils.parseUnits("25", bsc.decimals)
            bsc.deposit_fee_rate = 30
            bsc.withdraw_fee_min = ethers.utils.parseUnits("2", bsc.decimals)
            bsc.withdraw_fee_rate = 10
        }else if(coin == 'XCH'){
            bsc.deposit_fee_min = ethers.utils.parseUnits("0.01", bsc.decimals)
            bsc.deposit_fee_rate = 30
            bsc.withdraw_fee_min = ethers.utils.parseUnits("0.001", bsc.decimals)
            bsc.withdraw_fee_rate = 10
        }
        bsc.events = {
            bindxin: bsc.ctr.filters.BindXin(),
            bindxout: bsc.ctr.filters.BindXout(),
            transfer: bsc.ctr.filters.Transfer(),
            all: "*"
        }
        const allEventListener = function (evt) {
            var check_balance = false
            const addrs = []
            if ('args' in evt) {
                for (var j in evt.args) {
                    addrs.push(evt.args[j])
                }
            }
            for (var i in addrs) {
                if (ethers.utils.isAddress(addrs[i]) && ethers.utils.getAddress(addrs[i]) == ethers.utils.getAddress(bsc.addr)) {
                    check_balance = true
                }
            }
            if (check_balance) {
                if (typeof (commit) == 'function') {
                    token_balance(true).then((xb) => {
                        bsc.xbalance = xb
                        commit('setXbalance', ethers.utils.formatUnits(xb, bsc.decimals))
                    })
                }
            }
        }
        bsc.ctr.on(bsc.events.all, allEventListener)

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
    const balance = await token_balance()
    return {
        free_xins: free_addrs.toNumber(),
        deposit_addr: xaddr_dep,
        withdraw_addr: xaddr_wdr,
        xbalance: balance
    }
}


async function obtain_deposit_addr(callback) {
    const bnb = ethers.constants.WeiPerEther.div(2000)
    try {
        // eslint-disable-next-line no-unused-vars
        const bindListener = function (from, to, amount, evt) {
            if (ethers.utils.getAddress(from) == ethers.utils.getAddress(bsc.addr)) {
                if (typeof (callback) == 'function') {
                    get_deposit_addr().then(callback)
                }
                bsc.ctr.off(bsc.events.bindxin, bindListener)
            }
        }
        bsc.ctr.on(bsc.events.transfer, bindListener)
        await bsc.ctr.bindXin({
            value: bnb
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
    try {
        // eslint-disable-next-line no-unused-vars
        const bindListener = function (from, to, amount, evt) {
            if (ethers.utils.getAddress(from) == ethers.utils.getAddress(bsc.addr)) {
                if (typeof (callback) == 'function') {
                    get_withdraw_addr().then(callback)
                }
                bsc.ctr.off(bsc.events.bindxout, bindListener)
            }
        }
        bsc.ctr.on(bsc.events.bindxout, bindListener)
        await bsc.ctr.bindXout(xhex)
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


async function token_burn(amount_str, callback) {
    const bamount = ethers.utils.parseUnits(amount_str, bsc.decimals)
    const balance = await token_balance(true)
    if (bamount.lte(balance)) {
        // eslint-disable-next-line no-unused-vars
        const transListener = function (from, to, amount, evt) {
            if (ethers.utils.getAddress(from) == ethers.utils.getAddress(bsc.addr) && amount.eq(bamount)) {
                if (typeof (callback) == 'function') {
                    callback()
                }
                bsc.ctr.off(bsc.events.transfer, transListener)
            }
        }
        bsc.ctr.on(bsc.events.transfer, transListener)
        await bsc.ctr.burn(bamount)
        return 'ok'
    } else {
        return 'Insufficient token balance'
    }
}

function after_fee(mode, amount){
    const fees = {}
    amount = ethers.utils.parseUnits(amount, bsc.decimals)
    if(mode=='deposit'){
        fees.min = bsc.deposit_fee_min
        fees.rate = bsc.deposit_fee_rate
    }else if (mode=='withdraw'){
        fees.min = bsc.withdraw_fee_min
        fees.rate = bsc.withdraw_fee_rate
        if(amount.gt(bsc.xbalance)){
            return "fund"
        }
    }else{
        return "mode"
    }
    var fee = amount.mul(fees.rate).div(10000)
    if(fee.lt(fees.min)) fee = fees.min
    if(amount.lte(fee)) return false
    return ethers.utils.formatUnits(amount.sub(fee), bsc.decimals)
}

export default {
    after_fee: after_fee,
    bind_withdraw_addr: bind_withdraw_addr,
    connect: connect,
    check_bsc: check_bsc,
    obtain_deposit_addr: obtain_deposit_addr,
    token_balance: token_balance,
    token_burn: token_burn
}
