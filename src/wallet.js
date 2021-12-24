import { bufferToHex } from 'ethereumjs-util'
import { encrypt } from 'eth-sig-util'
import { mnemonicToEntropy, entropyToMnemonic } from "bip39";
import {
    ethers
} from 'ethers'

import nftABI from './nft-abi.json'
const nftContract = {
    address: '0x9707dFD37F7130A0DE09eCB07FCf84D036cefbDa',
    provider: new ethers.providers.Web3Provider(window.ethereum)
}

import moralis from 'moralis'
moralis.start({
    serverUrl: process.env.VUE_APP_MORALIS_SERVER_URL,
    appId: process.env.VUE_APP_MORALIS_APP_ID,
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connect(commit) {
    const user = await moralis.Web3.authenticate({signingMessage:'XWallet Login'})
    if(user){
        commit('setUser', user)
        await nftContract.provider.send('eth_requestAccounts',[])
        nftContract.obj = new ethers.Contract(nftContract.address, nftABI, nftContract.provider.getSigner())
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
    const options = { token_address: nftContract.address, chain:'bsc testnet' }
    const nfts = await moralis.Web3API.account.getNFTsForContract(options)
    if('result' in nfts){
        return nfts.result
    }else{
        return []
    }
}

function formatEkey(ekey){
    const ek = ethers.utils.hexZeroPad(ekey, 272)
    const res = []
    const dlen = ethers.utils.hexDataLength(ek)
    for(var i=0;i<dlen;i+=16){
        const b16 = ethers.utils.hexDataSlice(ek, i, i+16)
        res.push(b16)
    }
    return res
}

async function mintWalletNFT(name,mn){
    const ekey = await encodeMn(mn)
    try{
        const fee = await nftContract.obj.getMintFee()
        const ek = formatEkey(ekey)
        const receipt = await nftContract.obj.mint(name,ek,{value:fee})
        console.log('mint receipt', receipt)
    }catch(e){
        console.log('failed', e)
    }
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
