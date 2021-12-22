const axios = require('axios')
const BigNumber = require('bignumber.js')
const {
    mnemonicToSeedSync,
    generateMnemonic
} = require('bip39')
const loadBls = require('@chiamine/bls-signatures')

var BLS = false

var wallet_addrs = []

const axaddr = axios.create({
    baseURL: 'https://mkaddr.onrender.com/'
})

const axexp = axios.create({
    baseURL: 'https://corsproxy.onrender.com/'
})

async function toHex(k) {
    await init()
    return BLS.Util.hex_str(k.serialize())
}

async function pk2addrs(pks) {
    const pkhexs = []
    for (var i in pks) {
        pkhexs.push(await toHex(pks[i]))
    }
    console.log(JSON.stringify(pkhexs))
    const resp = await axaddr.post('/pk2addr/' + current.prefix, {
        pks: pkhexs
    })
    return resp.data.addrs
}

const current = {
    mnemonic: '',
    port: 8444,
    prefix: 'xch',
    sk: false,
    oneCoin: new BigNumber(1e12)
}

function coin_port(prefix) {
    switch (prefix.toLowerCase()) {
        case 'xcc':
            return 9699
        default:
            return 8444
    }
}

function coin_decimals(prefix) {
    switch (prefix.toLowerCase()) {
        case 'xcc':
            return 8
        default:
            return 12
    }
}

async function set_main_key(prefix, mnemonic) {
    await init()
    current.mnemonic = mnemonic
    const seed = mnemonicToSeedSync(mnemonic)
    const sk = BLS.AugSchemeMPL.key_gen(seed)
    current.prefix = prefix.toLowerCase()
    current.port = coin_port(prefix)
    current.sk = sk
    current.oneCoin = (new BigNumber(10)).pow(coin_decimals(prefix))
    wallet_addrs = []
    return sk
}

function derive_child(path) {
    var k = current.sk
    for (var i in path) {
        k = BLS.AugSchemeMPL.derive_child_sk(k, path[i])
    }
    return k
}

function wallet_pk(idx) {
    const ckey = derive_child([12381, current.port, 2, idx])
    const pk = ckey.get_g1()
    return pk
}

function wallet_pks(from, to) {
    const res = []
    for (var i = from; i < to; i++) {
        res.push(wallet_pk(i))
    }
    return res
}

async function wallet_addr(idx) {
    while (!(idx in wallet_addrs)) {
        const from = wallet_addrs.length
        const pks = wallet_pks(from, from + 10)
        const xaddrs = await pk2addrs(pks)
        wallet_addrs = wallet_addrs.concat(xaddrs)
    }
    return wallet_addrs[idx]
}

async function addrs_info() {
    var info = []
    var addrs = wallet_addrs.slice()
    while (addrs.length > 0) {
        const nf = await axexp.post('/wl', {
            addresses: addrs.slice(0, 150)
        })
        if ('data' in nf) {
            if (nf.data.length > 0) {
                info = info.concat(nf.data)
                addrs.splice(0, nf.data.length)
            }
        }
    }
    return info
}

async function balances() {
    var sum = new BigNumber(0)
    const info = await addrs_info()
    console.log('watchlist returns', info.length, 'recs')
    for (let i in info) {
        if (info[i].balance > 0) {
            console.log('balance +', info[i].balance)
            sum = sum.plus(info[i].balance)
        }
    }
    sum = sum.dividedBy(current.oneCoin)
    console.log('wallet balance', sum.toString())
    return sum
}
async function to_puzzl_hash() {
    const addrinfo = await addrs_info()
    console.log("addr", addrinfo)

    var addr_hash = ""
    for (addrinfo.item in addrinfo) {
        var taddr = addrinfo.item.address;
        console.log("taddr", taddr)
        if ('ChiaUtils' in window) {
            addr_hash = window.ChiaUtils.puzzle_hash_to_address(taddr, current.prefix);
            console.log("addr_hash", addr_hash)
        }
    }

    return addr_hash
}

function create_mnemonic() {
    return generateMnemonic(256)
}

async function init() {
    if (!BLS) {
        BLS = await loadBls()
    }
}

export default {
    create_mnemonic: create_mnemonic,
    init: init,
    set_main_key: set_main_key,
    to_hex: toHex,
    wallet_addr: wallet_addr,
    addrs_info: addrs_info,
    balances: balances,
    to_puzzl_hash: to_puzzl_hash
}