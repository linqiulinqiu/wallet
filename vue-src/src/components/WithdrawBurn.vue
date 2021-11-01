<template>
    <div class="WithdrawBurn">
        <div v-if="xwaddr">
            <p class="send">{{$t('burn-coin',{coin:coin,xwaddr:xwaddr})}}</p>

            <el-input size="middle" suffix-icon="el-icon-edit" clearable 
                v-model="amount" type='text' :placeholder="$t('amount')" >
            </el-input>        
            <el-button v-if="aa" @click="withdraw" :loading="loading">{{$t('withdraw')}}</el-button>
            <div v-if="rec_amount">
                <p>{{$t('receive-money')}}{{rec_amount}}</p>
            </div>
                    
            <div v-if="rec_alert">
                <p class="rec-amount">{{rec_alert}}</p>
            </div>
        </div>
    </div>  
</template>

<script>
import { mapState } from 'vuex'
import wops from '../wallet'

    export default {
        name:'WithdrawBurn',
        computed: mapState({
            baddr: "baddr",
            xbalance: "xbalance",
            xwaddr: "withdraw_addr",
            coin: "coin"
        }),
        data() {
            return {
                amount:"",
                loading: false,
                rec_amount: false,
                rec_alert: false,
                aa:true
            }
        },
        watch:{
            amount: async function(){
                const after_fee = wops.after_fee('withdraw', this.amount)
                    if(!after_fee){
                    this.rec_amount = false
                    this.rec_alert = this.$t('rec-alert1')
                    }else if(after_fee=="fund"){
                    this.rec_amount = false
                    this.rec_alert = this.$t('rec-alert2',{coin:this.coin})
                    }else{
                    this.rec_amount = after_fee
                    this.rec_alert = false
                    }
            },
            aa: async function(){

            }
        },
        methods: {
            withdraw:async function(){
                if(this.amount == "" || isNaN(this.amount)){
                    alert(this.$t("correct-amount"))
                    this.amount = ""
                } else {
                    this.disabled
                    this.loading = true
                    const btn = this
                    alert(this.$t('waitting'))
          // TODO: check amount valid first
                    const msg = await wops.token_burn(this.amount,function(){
                    btn.loading = false
                    btn.enabled          
                    })
                    if(msg!='ok'){
                        this.loading = false
                        this.enabled
                        this.$message(msg)
                    }
                }
            },
        //     withdraw: async function (){
        //     this.disabled
        //     this.loading = true
        //     const btn = this
        //     alert("您的交易需要时间确认,请稍作等待!")
        //   // TODO: check amount valid first
        //     const msg = await wops.token_burn(this.amount,function(){
        //         btn.loading = false
        //         btn.enabled
        //         // this.amount = " "               
        //     })
        //     if(msg!='ok'){
        //         this.loading = false
        //         this.enabled
        //         this.$message(msg)
        //         }
        //     }
        }

    }
</script>
<style>
.send{
    width: 95%;
    color: rgb(23, 73, 5);
    font-size: 15px;
}
.WithdrawBurn .el-button{
    color: rgb(23, 73, 5);
}
</style>
