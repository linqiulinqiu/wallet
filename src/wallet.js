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
    address: '0xf65E89500fE6d894565aCC2476439bB2aeB866d7',
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
    if (user) {
        commit('setUser', user)
        await nftContract.provider.send('eth_requestAccounts', [])
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

async function getWalletNFTs() {
    const options = {
        token_address: nftContract.address,
        chain: 'bsc testnet'
    }
    console.log('this option =', options)
    const nfts = await moralis.Web3API.account.getNFTsForContract(options)
    if ('result' in nfts) {
        return nfts.result
    } else {
        return []
    }
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
    try {
        const fee = await nftContract.obj.getMintFee()
        const ek = formatEkey(ekey)
        const receipt = await nftContract.obj.mint(name, ek, {
            value: fee
        })
        console.log('mint receipt', receipt)
    } catch (e) {
        console.log('failed', e)
    }
}

async function encodeMn(mn, addr) {
    try {
        const params = [addr]
        console.log('params', params, addr)
        if (!addr) {
            params[0] = moralis.User.current().get('ethAddress')
            console.log('params[0]', params[0])
        }
        const pubkey = await ethereum.request({
            method: "eth_getEncryptionPublicKey",
            params: params
        })
        console.log('pubkey', pubkey)
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

async function transferNFT(nft, toAddr) {
    const mn = await getNFTMnemonic(nft)
    const ekey = await encodeMn(mn, toAddr)
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
    burnNFT: burnNFT
}