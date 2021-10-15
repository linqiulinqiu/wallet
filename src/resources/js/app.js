window.Buffer = require('browser-buffer')
const { ethers } = require('ethers')
const { address_to_puzzle_hash, encode_puzzle_hash, hex_to_bytes } = require("./lib/chia-utils")
const $ = require('cash-dom')

const _ = require('lodash');
const Polyglot = require('node-polyglot')

const dicts = require('./lang-dicts').default

const axios = require('axios')
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const token_abi = require('./token-abi.json')

var bsc = {
    addr:''
}

var xch = {
    addr: ''
}

function puzzle_hash_to_address(puzzle_hash, prefix) {
    if (puzzle_hash.indexOf("0x") == 0) {

        puzzle_hash = puzzle_hash.substring(2);
    }
    return encode_puzzle_hash(hex_to_bytes(puzzle_hash), prefix);
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


var token_decimals = 0
async function bsc_token_decimals() {
    if (!token_decimals) {
        token_decimals = await bsc.ctr.decimals()
    }
    return token_decimals
}

function xchAddr(xhex, prefix){
    if(ethers.utils.stripZeros(xhex).length==0){
        return false
    }
    return puzzle_hash_to_address(xhex, prefix)
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

async function load_xch_withdraw_addr(baddr, prefix){
    const card = $('div#xch-withdraw-addr')
    const notemsg = card.find('div#note-msg')
    const btn = card.find('button#xch-withdraw-addr')
    const input = card.find('input#xch-withdraw-addr')
    btn.off('click')
    const xaddr = xchAddr(await bsc.ctr.getXoutAddr(), prefix)
    const decimals = await bsc_token_decimals()
    if(xaddr){
        btn.text('Already Bind')
        input.val(xaddr)
        input.attr('disabled',true)
        const bdiv = $('div#xch-burn')
        bdiv.show()
        bdiv.find('button#xch-burn').on('click', async function(){
            const amount = ethers.utils.parseUnits(bdiv.find('input#xch-burn-amount').val(), decimals)
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
            if(xhex){
                try {
                    const res = await bsc.ctr.bindXout(xhex)
                    await wait_tx_done(notemsg.find('p'))
                    load_xch_addr(baddr, prefix)
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

async function load_xch_deposit_addr(baddr, prefix){
    const card = $('div#xch-deposit-addr')
    const notemsg = card.find('div#note-msg')
    card.show()
    const btn = $('button#xch-deposit-addr')
    btn.off('click')
    const xaddr = xchAddr(await bsc.ctr.getXinAddr(), prefix)
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
            await load_xch_deposits(xaddr, prefix)
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
                    await wait_tx_done(notemsg.find('p'))
                    load_xch_addr(baddr, prefix)
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

async function load_xch_addr(baddr, prefix){
    await load_xch_deposit_addr(baddr, prefix)
    await load_xch_withdraw_addr(baddr, prefix)
}

async function load_xch_deposits(addr, prefix){
    const dest = $('#xch-deposits')
    const list = dest.find('#list')
    list.html('Loading ...')
    const resp = await axios.get('https://xchscan.com/api/account/txns?address='+addr)
    const txns = resp.data.txns
    const deps = []
    var total = ethers.BigNumber.from(0)
    const decimals = await bsc_token_decimals()
    for(var i in txns){
        const tx = txns[i]
        if(tx.to==addr){
            const amount = ethers.utils.formatUnits(tx.amount,decimals)
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
    dest.find('#total').text(ethers.utils.formatUnits(total,decimals))
}

async function load_token_balance(cfg){
    const div = $('div#token-balance')
    const span = div.find('span#token-balance')
    const balance = await bsc_token_balance()
    const decimals = await bsc_token_decimals()
    div.show()
    const btxt = ethers.utils.formatUnits(balance,decimals)
    span.text(btxt)
}

async function add_token(cfg){
    try {
        const options = {
            address: cfg.contract_addr,
            symbol: cfg.x_symbol,
            decimals: await bsc_token_decimals(),
            image: cfg.image
        }
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: options
            }
        })
        if (!wasAdded){
            alert('token add failed')
        }
    }catch(e){
        console.log('error when add token',e)
    }
}

async function connect(wbtn, cfg){
    wbtn.attr('disabled', true)
    bsc.provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await bsc.provider.getNetwork()
    const msg = $('div#note-msg')
    if (network.chainId==97 && network.name=='bnbt'){
        wbtn.off('click')
        await bsc.provider.send("eth_requestAccounts", [])
        bsc.signer = bsc.provider.getSigner()
        bsc.addr = await bsc.signer.getAddress()
        bsc.ctr = new ethers.Contract(cfg.contract_addr, token_abi, bsc.signer)
        wbtn.text(bsc.addr)
        await load_token_balance(cfg)
        await load_xch_addr(bsc.addr, cfg.xaddr_prefix)
        $('button#add-token').on('click', function(){
            add_token(cfg)
        })
        $('button#add-token').parent().show()
        
    }else{
        bsc.addr = ''
        msg.find('p').text('Wrong network! Please switch to Binance Smart Chain (Test)')
        msg.show()
        await msleep(3000)
        msg.hide()
        wbtn.removeAttr('disabled')
    }
}

function init(cfg){
    const arg_dict = {}
    if(!cfg.lang||!(cfg.lang in dicts)){
        cfg.lang = 'en'
    }
    const polyglot = new Polyglot({phrases:dicts[cfg.lang]})
    Object.keys(dicts[cfg.lang]).map(function(k,idx){ arg_dict[k] = polyglot.t(k,cfg)})
    try{
        const main_content = _.template($('#main-content').html())
        $('div#body').html(main_content(arg_dict))
    }catch(e){
        console.log('template err:',e)
    }
    if('contract_addr' in cfg){
        const wcbtn = $('button#wallet-connect')
        wcbtn.on('click', function(){
            connect(wcbtn, cfg)
        })
        $('div.container').show()
        $('footer').show()
    }else{
        $('div.container').hide()
        $('footer').hide()
    }
    $('#switch-xcc').on('click',function(){
        cfg.xaddr_prefix = 'xcc'
        cfg.x_symbol = 'XCC'
        cfg.image = ''
        cfg.contract_addr = '0x440F0669525104C15304ac55106AE40B4612A725'
        token_decimals = 0
        init(cfg)
    })
    $('#switch-xch').on('click',function(){
        cfg.xaddr_prefix = 'xch'
        cfg.x_symbol = 'XCH'
        cfg.image = 'https://www.chia.net/img/chia_logo.svg'
	    cfg.contract_addr = '0x1D51a66b67103d2716f47B762a6c7b8298bFad04'
        token_decimals = 0
        init(cfg)
    })
}

$(document).ready(function(){
    var cfg = {
        lang : 'en'
    }
    init(cfg)
    $('button#lang-zh').on('click', function(){
        cfg.lang = 'zh'
        init(cfg)
    })
    $('button#lang-en').on('click', function(){
        cfg.lang = 'en'
        init(cfg)
    })
})
