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

async function getWalletNFTs(){
    const options = { token_address: '0x7530Afda6A44857b2bC37971Eb302c0E6cBF0B49' }
    const nfts = await moralis.Web3API.account.getNFTsForContract(options)
    return nfts
}

async function encodeMn(mn){
    try {
        const params = [moralis.User.current().get('ethAddress')]
        const pubkey = await ethereum.request({method:"eth_getEncryptionPublicKey", params:params})
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
        const msg = await ethereum.request({method:"eth_decrypt", params:[data, bsc.addr]})
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
    getWalletNFTs: getWalletNFTs,
    encodeMn: encodeMn,
    decodeMn: decodeMn
}
