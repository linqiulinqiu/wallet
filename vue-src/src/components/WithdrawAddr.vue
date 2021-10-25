<template>
    <div class="withdraw-addr" v-if="baddr">
        <div v-if="withdraw_addr">
          <p>{{$t('send-token-for-withdrawal',withdraw_addr)}}</p>
        </div>
        <div v-else>
          <el-input v-model="xwaddr" :placeholder="$t('input-x-wallet-for-withdraw', coin)" suffix-icon="el-icon-edit"></el-input>
          <el-button @click="bind_addr">{{$t("bind-withdraw-address")}}</el-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import wops from '../wallet'
export default {
  name: 'WithdrawAddr',
  computed: mapState({
      baddr: "baddr",
      withdraw_addr: "withdraw_addr",
      coin: "coin"
  }),
  data: ()=>{
      return {
          xwaddr:''
      }
  },
  methods: {
      bind_addr: async function (){
          const commit = this.$store.commit
          const msg = await wops.bind_withdraw_addr(this.xwaddr,function(xaddr){
            commit('setWithdrawAddr',xaddr)
          })
          if(msg!='ok'){
            this.$message(msg)
          }
      }
  }
}
</script>