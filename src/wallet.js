import { bufferToHex } from 'ethereumjs-util'
import { encrypt } from 'eth-sig-util'
import { mnemonicToEntropy, entropyToMnemonic } from "bip39";
import {
    ethers
} from 'ethers'

import moralis from 'moralis'
moralis.start({
    serverUrl: process.env.VUE_APP_MORALIS_SERVER_URL,
    appId: process.env.VUE_APP_MORALIS_APP_ID,
})

async function connect(commit) {
    const user = await moralis.Web3.authenticate({signingMessage:'XWallet Login'})
    if(user){
        commit('setUser', user)
        return true
    }
    return false
}

async function disconnect(commit){
    await moralis.User.logOut()
    commit('setUser', {})
}

async function handleCurrentUser(commit){
    const user = moralis.User.current()
    if(user){
        commit('setUser', user)
    }
}

async function encodeMn(mn){
    try {
        const pubkey = await ethereum.send("eth_getEncryptionPublicKey", [moralis.User.current().get('ethAddress')])
        if(pubkey){
            const emsg = bufferToHex(
                Buffer.from(JSON.stringify(
                    encrypt(
                        pubkey, 
                        { data: mnemonicToEntropy(mn)},
                        'x25519-xsalsa20-poly1305'
                    )
                ),
                    'utf8'
                )
            )
            return emsg
        }
    }catch(e){
        console.log('err', e)
    }
    return false
}

async function decodeMn(data){
    try {
        const msg = await ethereum.send("eth_decrypt", [data, bsc.addr])
        return entropyToMnemonic(msg)
    }catch(e){
        console.log('err', e)
    }
    return false

}

export default {
    connect: connect,
    disconnect: disconnect,
    handleCurrentUser: handleCurrentUser,
    encodeMn: encodeMn,
    decodeMn: decodeMn
}
