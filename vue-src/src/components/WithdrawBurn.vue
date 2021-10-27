<template>
    <div class="WithdrawBurn">
        <div v-if="xwaddr">
            <p>When you burn P{{coin}}, your {{coin}} will be sent to {{ xwaddr }}</p>
            <el-input v-model="amount" type='text' :placeholder="$t('amount')" suffix-icon="el-icon-edit"></el-input>
            <p>{{$t('receive-money')}} <span></span> </p>
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
                loading: false
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
