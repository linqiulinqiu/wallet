<template>
    <div class="WithdrawBurn">
        <div v-if="xwaddr">
            <p>{{$t('burn-coin',{coin:coin,xwaddr:xwaddr})}}</p>
            <el-input class="wburn" suffix-icon="el-icon-edit" clearable
             v-model="amount" type='text' :placeholder="$t('amount')" ></el-input>
            <div class="recive">{{$t('receive-money')}} <span>{{amount*0.99}}</span> </div>
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
        xwaddr: "withdraw_addr",
        coin: "coin"
    }),
        data() {
            return {
                amount:"",
                loading: false,
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
