<template>
    <div class="WithdrawBurn">
        <div v-if="xwaddr">
            <p>{{$t('burn-coin',{coin:coin,xwaddr:xwaddr})}}</p>
            <el-input class="wburn" suffix-icon="el-icon-edit" clearable v-model="amount" type='text' :placeholder="$t('amount')" ></el-input>
            <div v-if="rec_amount">
                {{$t('receive-money')}}
                <span>{{ rec_amount }}</span>
            </div>
            <div v-if="rec_alert">
                <p>{{rec_alert}}</p>
            </div>
            <el-button @click="withdraw" :loading="loading">{{$t('withdraw')}}</el-button>
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
                rec_alert: false
            }
        },
        watch:{
            amount: async function(){
                const after_fee = wops.after_fee('withdraw', this.amount)
                if(!after_fee){
                    this.rec_amount = false
                    this.rec_alert = "您什么也收不到"
                }else if(after_fee=="fund"){
                    this.rec_amount = false
                    this.rec_alert = "您的Pxxx代币余额不足"
                }else{
                    this.rec_amount = after_fee
                    this.rec_alert = false
                }
            }
        },
        methods: {
            withdraw: async function (){
            this.disabled
            this.loading = true
            const btn = this
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
        }

    }
</script>
<style>
.wburn{
    width:200px
}
</style>
