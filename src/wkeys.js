const {
    mnemonicToSeedSync,
    generateMnemonic
} = require('bip39')
const loadBls = require('@chiamine/bls-signatures')

var BLS = false

async function toHex(k) {
    await init()
    return BLS.Util.hex_str(k.serialize())
}

var current_mnemonic = ""
var current_sk = false

async function set_main_key(mnemonic) {
    await init()
    current_mnemonic = mnemonic
    const seed = mnemonicToSeedSync(mnemonic)
    const sk = BLS.AugSchemeMPL.key_gen(seed)
    current_sk = sk
    const pk = sk.get_g1()
    return sk
}

function derive_child(path) {
    var k = current_sk
    for (var i in path) {
        k = BLS.AugSchemeMPL.derive_child_sk(k, path[i])
    }
    return k
}

function wallet_pk(port, idx) {
    const ckey = derive_child([12381, port, 2, idx])
    const pk = ckey.get_g1()
    return pk
}

function wallet_pks(port, from, to) {
    const res = []
    for (var i = from; i < to; i++) {
        res.push(wallet_pk(port, current_sk, i))
    }
    return res
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
    wallet_pk: wallet_pk,
    wallet_pks: wallet_pks
}