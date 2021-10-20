import { ethers } from 'ethers'
import token_abi from './token-abi.json'

const bsc = {}

async function connect(){
    if(typeof window.ethereum !== 'undefined'){ 
        bsc.provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        await bsc.provider.send("eth_requestAccounts", [])
        bsc.contract_addr = '0x2077bFC955E9fBA076CA344cD72004C6c4a80a09'
        bsc.signer = bsc.provider.getSigner()
        bsc.addr = await bsc.signer.getAddress()
        bsc.ctr = new ethers.Contract(bsc.contract_addr, token_abi, bsc.signer)
        return bsc.addr
    }
    return false
}

async function check_bsc(){
    var xaddr = await bsc.ctr.getXinAddr()
    if(xaddr==='0x0000000000000000000000000000000000000000000000000000000000000000'){
        xaddr = false
    }
    const free_addrs = await bsc.ctr.getFreeXinAddrCount()
    return {
        free_xins: free_addrs.toNumber(),
        deposit_addr: xaddr
    }
}

export default {
    connect: connect,
    check_bsc: check_bsc
}
