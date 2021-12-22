import { bufferToHex } from 'ethereumjs-util'
import { encrypt } from 'eth-sig-util'
import { mnemonicToEntropy, entropyToMnemonic } from "bip39";
import {
    ethers
} from 'ethers'

import nftABI from './nft-abi.json'
const nftContract = {
    address: '0x9D3Ad767916bebDc0b1d5Af4476326D32823bCb5'
}

import moralis from 'moralis'
moralis.start({
    serverUrl: process.env.VUE_APP_MORALIS_SERVER_URL,
    appId: process.env.VUE_APP_MORALIS_APP_ID,
})


async function connect(commit) {
    const user = await moralis.Web3.authenticate({signingMessage:'XWallet Login'})
    if(user){
        commit('setUser', user)
        nftContract.web3 = await moralis.enableWeb3();
        nftContract.obj = new web3.eth.Contract(nftABI, nftContract.address);
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
    const options = { token_address: nftContractAddr }
    const nfts = await moralis.Web3API.account.getNFTsForContract(options)
    return nfts
}

async function mintWalletNFT(name,mn){
    const ekey = await encodeMn(mn)
    const options = {
        chain: 'bsc testnet',
        address: nftContract.address,
        abi: nftABI,
        function_name: 'getMintFee',
        params: {}
    }
    const fee = await moralis.executeFunction(options)
    options.params.value = fee
    options.function_name = 'mintItem'
    options.params.itemName = name
    options.params.xkey = ekey
    const receipt = await moralis.executeFunction(options)
    console.log('mint receipt', receipt)
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
        const params = [data, moralis.User.current().get('ethAddress')]
        const msg = await ethereum.request({method:"eth_decrypt", params:params})
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
    mintWalletNFT: mintWalletNFT,
    encodeMn: encodeMn,
    decodeMn: decodeMn
}
