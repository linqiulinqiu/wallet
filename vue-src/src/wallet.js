import { ethers } from 'ethers'
import token_abi from './token-abi.json'

const bsc = {}

async function connect(coin){
    if(typeof window.ethereum !== 'undefined'){ 
        bsc.prefix = coin.toLowerCase()
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

async function obtain_deposit_addr(){
    const bindf = bsc.ctr.filters.BindXin()
    const bnb = ethers.constants.WeiPerEther.div(2000)
    try {
        await bsc.ctr.bindXin({value: bnb})
        bsc.ctr.on(bindf, (from, to, amount, evt) => {
            console.log('bsc evt', from, to, amount, evt)
            if (ethers.utils.getAddress(from) == ethers.utils.getAddress(bsc.addr)) {
                //TODO: update store: deposit_addr
                //load_xch_deposit_addr(baddr, prefix)
            }
        })
        return false
    } catch (e) {
        var text = e.message
        if ('data' in e) {
            if ('message' in e.data) {
                text = e.data.message
            }
        }
        return text
    }
}

export default {
    connect: connect,
    check_bsc: check_bsc,
    obtain_deposit_addr: obtain_deposit_addr
}
