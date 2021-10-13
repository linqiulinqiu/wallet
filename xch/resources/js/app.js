//require('./bootstrap')
window.Buffer = require('browser-buffer')
const { ethers } = require('ethers')
const { address_to_puzzle_hash, puzzle_hash_to_address, bytes_to_hex } = require("chia-utils")
const $ = require('cash-dom')
const axios = require('axios')
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const token_abi = require('./token-abi.json')
const contract_addr = '0x1D51a66b67103d2716f47B762a6c7b8298bFad04'

var bsc = {
    addr:''
}

var xch = {
    addr: ''
}

Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, 
      "d+": this.getDate(), 
      "h+": this.getHours(), 
      "m+": this.getMinutes(), 
      "s+": this.getSeconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
        (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return fmt
}

function epoch_str(epoch){
    const date = new Date(epoch*1000)
    return date.format('yyyy-MM-dd hh:mm')
}

async function msleep(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec)
    })
}

async function btn_countdown(btn, cnt, orig_caption){
    for(var i=cnt; i>0;i--){
        await msleep(1000)
        btn.text(i)
    }
    await msleep(1000)
    btn.text(orig_caption)
    btn.removeAttr('disabled')
}

async function bsc_token_balance(){
    const res = await bsc.ctr.balanceOf(bsc.addr)
    return res
}

function xchAddr(xhex){
    if(ethers.utils.stripZeros(xhex).length==0){
        return false
    }
    return puzzle_hash_to_address(xhex)
}

function xchHex(xaddr){
    const xhex = address_to_puzzle_hash(xaddr)
    if(ethers.utils.stripZeros(xhex).length==0){
        return false
    }
    return xhex
}

async function wait_tx_done(note){
    note.text('Waiting for Transaction complete')
    await msleep(2000)
    note.text('Waiting for Transaction complete.')
    await msleep(2000)
    note.text('Waiting for Transaction complete..')
    await msleep(2000)
    note.text('Waiting for Transaction complete...')
    await msleep(2000)
}

async function load_xch_withdraw_addr(baddr){
    const card = $('div#xch-withdraw-addr')
    const notemsg = card.find('div#note-msg')
    const btn = card.find('button#xch-withdraw-addr')
    const input = card.find('input#xch-withdraw-addr')
    btn.off('click')
    const xaddr = xchAddr(await bsc.ctr.getXoutAddr())
    if(xaddr){
        btn.text('Already Bind')
        input.val(xaddr)
        input.attr('disabled',true)
        const bdiv = $('div#xch-burn')
        bdiv.show()
        bdiv.find('button#xch-burn').on('click', async function(){
            const amount = ethers.utils.parseUnits(bdiv.find('input#xch-burn-amount').val(), 12)
            const balance = await bsc_token_balance()
            if(amount.lte(balance)){
                await bsc.ctr.burn(amount)
                //TODO: wait till tx done
                await load_token_balance()
            }else{
                alert('Insufficient token balance')
            }
	    })
    }else{
        btn.on('click', async function (){
            btn.off('click')
            const xhex = xchHex(input.val())
	    console.log('xhex',xhex)
            if(xhex){
                try {
                    const res = await bsc.ctr.bindXout(xhex)
                    await wait_tx_done(notemsg.find('p'))
                    load_xch_addr(baddr)
                }catch(e){
                    notemsg.find('p').text(e.message)
                    notemsg.show()
                }
            }else{
                notemsg.text('invalid address')
            }
        })
    }
    card.show()
}

async function load_xch_deposit_addr(baddr){
    const card = $('div#xch-deposit-addr')
    const notemsg = card.find('div#note-msg')
    card.show()
    const btn = $('button#xch-deposit-addr')
    btn.off('click')
    const xaddr = xchAddr(await bsc.ctr.getXinAddr())
    if(xaddr){
        btn.text(xaddr)
        notemsg.find('p').text(xaddr)
        notemsg.show()
        const hist = $('#xch-deposits')
        const depload_btn = hist.find('#load')
        depload_btn.on('click',async function(){
            depload_btn.attr('disabled', true)
            const orig_caption = depload_btn.text()
            depload_btn.text('...')
            await load_xch_deposits(xaddr)
            await btn_countdown(depload_btn,5,orig_caption)
        })
        hist.show()
    }else{
        const free_addrs = await bsc.ctr.getFreeXinAddrCount()
        if(free_addrs.toNumber()>0){
            btn.text('Obtain Address')
            btn.on('click',async function(){
                btn.off('click')
                const bnb = ethers.constants.WeiPerEther.div(2000)
                try {
                    const res = await bsc.ctr.bindXin({ value: bnb })
                    console.log(res)
                    await wait_tx_done(notemsg.find('p'))
                    load_xch_addr(baddr)
                }catch(e){
                    notemsg.find('p').text(e.message)
                    notemsg.show()
                }
                //TODO: check address after a few seconds
            })
        }else{
            btn.text('No Deposit Address')
        }
    }
}

async function load_xch_addr(baddr){
    await load_xch_deposit_addr(baddr)
    await load_xch_withdraw_addr(baddr)
}

async function load_xch_deposits(addr){
    const dest = $('#xch-deposits')
    const list = dest.find('#list')
    list.html('Loading ...')
    const resp = await axios.get('https://xchscan.com/api/account/txns?address='+addr)
    const txns = resp.data.txns
    const deps = []
    var total = ethers.BigNumber.from(0)
    for(var i in txns){
        const tx = txns[i]
        if(tx.to==addr){
            const amount = ethers.utils.formatUnits(tx.amount,12)
            const dep = [epoch_str(tx.timestamp), tx.block.height, tx.id, tx.from, amount]
            total = total.add(tx.amount)
            deps.push(dep.join('</td><td>'))
        }
    }
    if (deps.length==0){
        list.html('No transaction found')
    }else{
        list.html(
        '<thead><tr><th>Time</th><th>Height</th><th>ID</th><th>From</th><th>Amount</th></tr></thead><tbody><tr><td>'+ 
            deps.join('</td></tr><tr><td>')+'</td></tr></tbody>')
    }
    dest.find('#total').text(ethers.utils.formatUnits(total,12))
}

async function load_token_balance(){
    const div = $('div#token-balance')
    const span = div.find('span#token-balance')
    const balance = await bsc_token_balance()
    div.show()
    const btxt = ethers.utils.formatUnits(balance,12)
    span.text(btxt)
}

async function connect(wbtn){
    wbtn.attr('disabled', true)
    bsc.provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await bsc.provider.getNetwork()
    const msg = $('div#note-msg')
    if (network.chainId==97 && network.name=='bnbt'){
        wbtn.off('click')
        await bsc.provider.send("eth_requestAccounts", [])
        bsc.signer = bsc.provider.getSigner()
        bsc.addr = await bsc.signer.getAddress()
        bsc.ctr = new ethers.Contract(contract_addr, token_abi, bsc.signer)
        wbtn.text(bsc.addr)
        await load_token_balance()
        await load_xch_addr(bsc.addr)
    }else{
        bsc.addr = ''
        msg.find('p').text('Wrong network! Please switch to Binance Smart Chain (Test)')
        msg.show()
        await msleep(3000)
        msg.hide()
        wbtn.removeAttr('disabled')
    }
}

$(document).ready(function(){
    const wcbtn = $('button#wallet-connect')
    wcbtn.on('click', function(){
        connect(wcbtn)
    })
})
