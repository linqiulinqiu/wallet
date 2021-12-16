const axios = require('axios')
const {
    mnemonicToSeedSync,
    generateMnemonic
} = require('bip39')
const loadBls = require('@chiamine/bls-signatures')

var BLS = false

var wallet_addrs = []

const axaddr = axios.create({
    baseURL: 'https://mkaddr.onrender.com/'
//    baseURL: 'http://localhost:5000/'
})

async function toHex(k) {
    await init()
    return BLS.Util.hex_str(k.serialize())
}

async function pk2addrs(pks){
    const pkhexs = []
    for(var i in pks){
        pkhexs.push(await toHex(pks[i]))
    }
    console.log(JSON.stringify(pkhexs))
    const resp = await axaddr.post('/pk2addr/'+current.prefix, {pks:pkhexs})
    return resp.data.addrs
}

const current = {
    mnemonic: '',
    port: 8444,
    prefix: 'xch',
    sk: false
}

function coin_port(prefix){
    switch(prefix.toLowerCase()){
        case 'xcc':
            return 9699
        default:
            return 8444
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

async function wallet_addr(idx){
    while(!(idx in wallet_addrs)){
        const from = wallet_addrs.length
        const pks = wallet_pks(from, from+10)
        const xaddrs = await pk2addrs(pks)
        wallet_addrs = wallet_addrs.append(xaddrs)
    }
    return wallet_addrs[idx]
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
    wallet_addr: wallet_addr
}
