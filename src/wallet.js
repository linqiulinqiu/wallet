import {
    bufferToHex
} from 'ethereumjs-util'
import {
    encrypt
} from 'eth-sig-util'
import {
    mnemonicToEntropy,
    entropyToMnemonic
} from "bip39";
import {
    ethers
} from 'ethers'

import nftABI from './nft-abi.json'
const nftContract = {
    userAddr: '',
    address: '0xf65E89500fE6d894565aCC2476439bB2aeB866d7',
    deployedAt: 15384995,
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
    const user = await moralis.Web3.authenticate({
        signingMessage: 'XWallet Login'
    })
    console.log('user', user)
    if (user) {
        commit('setUser', user)
        const acc = await nftContract.provider.send('eth_requestAccounts', [])
        console.log('account', acc)
        if(acc.length>0){
            nftContract.userAddr = ethers.utils.getAddress(acc[0])
        }
        nftContract.obj = new ethers.Contract(nftContract.address, nftABI, nftContract.provider.getSigner())
        console.log('nft contract obj', nftContract.obj)
        return true
    }
    return false
}

async function disconnect(commit) {
    await moralis.User.logOut()
    commit('setUser', {})
}

function fmtIdString(str,id){
    return str.replace('{id}',id.toString())
}

async function getWalletNFTs() {
    const endblock = await nftContract.provider.getBlockNumber()
    const maxStep = 5000
    var evts = []
    const txsingle = nftContract.obj.filters.TransferSingle()
    for(var i = nftContract.deployedAt; i< endblock; i+= maxStep){
        const step_eb = Math.min(endblock, i+maxStep-1)
        const txs = await nftContract.obj.queryFilter(txsingle, i, step_eb)
        evts = evts.concat(txs)
    }
    const ids = []
    for(var idx in evts){
        const e = evts[idx]
        const id = e.args.id.toNumber()
        if(e.args.to==nftContract.userAddr){
            if(!(id in ids)){
                ids[id] = 0
            }
            ids[id]++
        }
        if(e.args.from==nftContract.userAddr){
            if(!(id in ids)){
                ids[id] = 0
            }
            ids[id]--
        }
    }
    const list = []
    for(i in ids){
        const uri = fmtIdString(await nftContract.obj.uri(i),i)
        const meta = await (await fetch(uri)).json()
        list.push({
            token_id: i,
            uri: uri,
            meta: meta
        })
    }
    
    return list
}

function formatEkey(ekey) {
    const ek = ethers.utils.hexZeroPad(ekey, 272)
    const res = []
    const dlen = ethers.utils.hexDataLength(ek)
    for (var i = 0; i < dlen; i += 16) {
        const b16 = ethers.utils.hexDataSlice(ek, i, i + 16)
        res.push(b16)
    }
    return res
}

async function mintWalletNFT(name, mn) {
    const ekey = await encodeMn(mn, false)
    console.log("this ekey = ", ekey)
    try {
        const fee = await nftContract.obj.getMintFee()
        const ek = formatEkey(ekey)
        console.log('mint params', fee, ek)
        const receipt = await nftContract.obj.mint(name, ek, {
            value: fee
        })
        console.log('mint receipt', receipt)
    } catch (e) {
        console.log('failed', e)
    }
}
async function getPublicKey(addr) {
    try {
        const params = [addr]
        if (!addr) {
            params[0] = moralis.User.current().get('ethAddress')
            console.log('params[0]', params[0])
        }
        const pubkey = await ethereum.request({
            method: 'eth_getEncryptionPublicKey',
            params: params
        })
        return pubkey
    } catch (err) {
        console.log('errrrrr', err)
    }
}
async function encodeMn(mn, addr) {
    try {
        const pubkey = await getPublicKey(addr)
        console.log('pubkey-en', pubkey)
        if (pubkey) {
            const emsg = bufferToHex(
                Buffer.from(JSON.stringify(
                        encrypt(
                            pubkey, {
                                data: mnemonicToEntropy(mn)
                            },
                            'x25519-xsalsa20-poly1305'
                        )
                    ),
                    'utf8'
                )
            )
            console.log('emsg', emsg)
            return emsg
        }
    } catch (e) {
        console.log('er77', e)
    }
    return false
}

async function decodeMn(data) {
    try {
        const params = [data, moralis.User.current().get('ethAddress')]
        const msg = await ethereum.request({
            method: "eth_decrypt",
            params: params
        })
        return entropyToMnemonic(msg)
    } catch (e) {
        console.log('err', e)
    }
    return false

}

async function getNFTMnemonic(nft) {
    console.log("this is getmnemonic", nft)
    const ek = await nftContract.obj.getExKey(nft.token_id)
    const ekm = ethers.utils.hexStripZeros(ethers.utils.hexConcat(ek))
    const ekstr = ethers.utils.hexZeroPad(ekm, 269)
    return await decodeMn(ekstr)
}
async function getEkey(mn, pubkey) {
    try {
        if (pubkey) {
            const emsg = bufferToHex(
                Buffer.from(JSON.stringify(
                        encrypt(
                            pubkey, {
                                data: mnemonicToEntropy(mn)
                            },
                            'x25519-xsalsa20-poly1305'
                        )
                    ),
                    'utf8'
                )
            )
            console.log('emsg', emsg)
            return emsg
        }
    } catch (error) {
        console.log('er666', e)

    }
}
async function transferNFT(nft, toAddr, pubkey) {
    const mn = await getNFTMnemonic(nft)
    // const ekey = await encodeMn(mn, addr)

    const ekey = await getEkey(mn, pubkey)
    console.log('ekey = ', ekey, toAddr)
    const res = await nftContract.obj.transfer(toAddr, nft.token_id, ekey)
    console.log('transfer receipt', res)
}

async function burnNFT(nft) {
    const res = await nftContract.obj.burn(nft.token_id)
    console.log('burn recepit', res)
}

export default {
    connect: connect,
    disconnect: disconnect,
    getWalletNFTs: getWalletNFTs,
    mintWalletNFT: mintWalletNFT,
    getNFTMnemonic: getNFTMnemonic,
    transferNFT: transferNFT,
    burnNFT: burnNFT,
    getPublicKey: getPublicKey,
    getEkey: getEkey
}
