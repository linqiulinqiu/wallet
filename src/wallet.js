import { bufferToHex } from 'ethereumjs-util'
import { encrypt } from 'eth-sig-util'
import {
    ethers
} from 'ethers'

const bsc = {}

const bconst = {}

const USE_TESTNET = true

if(USE_TESTNET){
    bconst.chainId = "0x61"
    bconst.chainName = 'BSC Testnet'
    bconst.chainNetName = 'bnbt'
    bconst.chainNCSymbol = 'TBNB'
    bconst.chainRpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    bconst.chainExplorerUrl = 'https://testnet.bscscan.com'
    bconst.whdd_address = '0x308e2E4651bdA95aCD85654ad6DF2b877cA30be8'
}else{
    // const b_chainId = '0x38'
    // const b_chainName = 'BSC Mainnet'
    // const b_chainNetName = 'bnb'
    // const b_chainNCSymbol = 'BNB'
    // const b_chainRpcUrl = 'https://bsc-dataseed.binance.org'
    // const b_chainExplorerUrl = 'https://bscscan.com'
    // const b_xcc_address = '0x24D7ec172b331c7636a5Ca604de890996e5e2028'
    // const b_xch_address = '0x8fCD852147d1BbA1C4f4dFf07880cCB25DD36DD7'
}

async function switch_network() {
    try {
        console.log(parseInt(bconst.chainId))
        await bsc.provider.send('wallet_switchEthereumChain', [{
            chainId: bconst.chainId
        }])
    } catch (switchError) {
        const ChainNotExist = 4902
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === ChainNotExist) {
            try {
                await bsc.provider.send(
                    'wallet_addEthereumChain',
                    [{
                        chainId: bconst.chainId,
                        chainName: bconst.chainName,
                        nativeCurrency: {
                            name: bconst.chainNCSymbol,
                            symbol: bconst.chainNCSymbol,
                            decimals: 18
                        },
                        rpcUrls: [bconst.chainRpcUrl],
                        blockExplorerUrls: [bconst.chainExplorerUrl]
                    }])
            } catch (err) {
                // console.log('addError',err)
                return addError
            }
        } else {
            console.log('switchError')
            return switchError
        }
    }
    return false
}

async function ensure_network() {
    const network = await bsc.provider.getNetwork()
    bsc.provider.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload()
            return false
        }
    })
    if (network.chainId != parseInt(bconst.chainId)) {
        const err = await switch_network()
        if (err) return err
    }
    if (network.chainId == parseInt(bconst.chainId) && network.name == bconst.chainNetName) {
        return false
    }
}

async function connect(commit) {
    if (typeof window.ethereum !== 'undefined') {
        bsc.provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        const neterr = await ensure_network()
        if (neterr) throw neterr
        await bsc.provider.send("eth_requestAccounts", [])
        bsc.signer = bsc.provider.getSigner()
        bsc.addr = await bsc.signer.getAddress()
        commit("setXaddr", bsc.addr)
        return bsc.addr
    }
    return false
}

async function enc_data(data){
    try {
        const pubkey = await bsc.provider.send("eth_getEncryptionPublicKey", [bsc.addr])
        if(pubkey){
            const emsg = bufferToHex(
                Buffer.from(JSON.stringify(
                    encrypt(pubkey, { data: data },
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

async function dec_data(data){
    try {
        const msg = await bsc.provider.send("eth_decrypt", [data, bsc.addr])
        return msg
    }catch(e){
        console.log('err', e)
    }
    return false

}

export default {
    connect: connect,
    enc_data: enc_data,
    dec_data: dec_data
}
