import {
    ethers
} from 'ethers'
import token_abi from './token-abi.json'

const bsc = {}

const b_chainId = '0x38'
const b_chainName = 'BSC Mainnet'
const b_chainNetName = 'bnb'
const b_chainNCSymbol = 'BNB'
const b_chainRpcUrl = 'https://bsc-dataseed.binance.org'
const b_chainExplorerUrl = 'https://bscscan.com'
const b_xcc_address = '0x0243FB40dDED3b4622004035D4871AA1541dB8B4'
const b_xch_address = '0x38A715E494a2E470b7812C948C3D4867C097771C'


// const b_chainId = '0x61'
// const b_chainName = 'BSC Testnet'
// const b_chainNetName = 'bnbt'
// const b_chainNCSymbol = 'TBNB'
// const b_chainRpcUrl = 'https://bsc-dataseed.binance.org'
// const b_chainExplorerUrl = 'https://bscscan.com'
// const b_xcc_address = '0xA9F7B1a5C36DC79dd0541E50776ec98FcE0edF10'
// const b_xch_address = '0xC556C6B9d6D8443a9505DE3E17cd88B717cFd9CF'

async function switch_network() {
    try {
        await bsc.provider.send('wallet_switchEthereumChain', [{
            chainId: b_chainId
        }])
    } catch (switchError) {
        const ChainNotExist = 4902
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === ChainNotExist) {
            try {
                await bsc.provider.send(
                    'wallet_addEthereumChain',
                    [{
                        chainId: b_chainId,
                        chainName: b_chainName,
                        nativeCurrency: {
                            name: b_chainNCSymbol,
                            symbol: b_chainNCSymbol,
                            decimals: 18
                        },
                        rpcUrl: b_chainRpcUrl,
                        blockExplorerUrl: b_chainExplorerUrl
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
    if (network.chainId != parseInt(b_chainId)) {
        const err = await switch_network()
        if (err) return err
    }
    if (network.chainId == parseInt(b_chainId) && network.name == b_chainNetName) {
        return false
    }
}
async function token_balance(bn, cached) {
    var balance = bsc.xbalance
    if (!cached || !balance) {
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
            bsc.contract_addr = b_xcc_address
        } else if (coin == 'XCH') {
            bsc.contract_addr = b_xch_address
        } else {
            return false
        }
        bsc.signer = bsc.provider.getSigner()
        bsc.addr = await bsc.signer.getAddress()
        bsc.ctr = new ethers.Contract(bsc.contract_addr, token_abi, bsc.signer)
        bsc.decimals = await bsc.ctr.decimals()
        bsc.xbalance = await token_balance(true)
        if (coin == 'XCC') {
            bsc.deposit_fee_min = ethers.utils.parseUnits("20", bsc.decimals)
            bsc.deposit_fee_rate = 30
            bsc.withdraw_fee_min = ethers.utils.parseUnits("2", bsc.decimals)
            bsc.withdraw_fee_rate = 10
        } else if (coin == 'XCH') {
            bsc.deposit_fee_min = ethers.utils.parseUnits("0.01", bsc.decimals)
            bsc.deposit_fee_rate = 30
            bsc.withdraw_fee_min = ethers.utils.parseUnits("0.001", bsc.decimals)
            bsc.withdraw_fee_rate = 10
        }

        commit("setFreeXins", (await bsc.ctr.getFreeXinAddrCount()).toNumber())
        commit("setDepositAddr", await get_deposit_addr())
        commit("setWithdrawAddr", await get_withdraw_addr())
        commit("setXbalance", await token_balance())
        commit("setCoin", coin)
        commit("setBaddr", bsc.addr)

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
        bsc.ctr.on(bsc.events.bindxin, bindListener)
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
    if ('ChiaUtils' in window) {
        xhex = window.ChiaUtils.address_to_puzzle_hash(xaddr)
    }
    if (!xhex) return false
    if (!bsc.prefix || xaddr.substr(0, 3) != bsc.prefix.toLowerCase()) {
        return 'bad type'
    }
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

function after_fee(mode, amount) {
    const fees = {}
    amount = ethers.utils.parseUnits(amount.toString(), bsc.decimals)
    if (mode == 'deposit') {
        fees.min = bsc.deposit_fee_min
        fees.rate = bsc.deposit_fee_rate
    } else if (mode == 'withdraw') {
        fees.min = bsc.withdraw_fee_min
        fees.rate = bsc.withdraw_fee_rate
        if (amount.gt(bsc.xbalance)) {
            return "fund"
        }
    } else {
        return "mode"
    }
    var fee = amount.mul(fees.rate).div(10000)
    if (fee.lt(fees.min)) fee = fees.min
    if (amount.lte(fee)) return false
    return ethers.utils.formatUnits(amount.sub(fee), bsc.decimals)
}

function get_contract_addr() {
    if ('contract_addr' in bsc) {
        return bsc.contract_addr
    } else {
        return false
    }
}

async function add_token(){
    const added = await bsc.provider.send(
        'wallet_watchAsset',
        {
            type: 'ERC20',
            options: {
                address: bsc.contract_addr,
                symbol: 'P'+bsc.coin,
                decimals: bsc.decimals,
                image: 'https://app.plotbridge.net/images/chiveslogo.png'
            }
        }
    )
    return added
}

export default {
    add_token: add_token,
    after_fee: after_fee,
    bind_withdraw_addr: bind_withdraw_addr,
    connect: connect,
    check_bsc: check_bsc,
    get_contract_addr: get_contract_addr,
    obtain_deposit_addr: obtain_deposit_addr,
    token_balance: token_balance,
    token_burn: token_burn
}
