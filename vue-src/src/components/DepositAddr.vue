<template>
    <div class="deposit-addr" v-if="baddr">
        <div v-if="deposit_addr">
          <p>{{deposit_addr}}</p>
        </div>
        <div v-else>
          <el-button v-if="free_xins>0" @click="obtain_addr">{{$t("obtain-deposit-address")}}</el-button>
          <p v-else-if="free_xins===0">No Deposit Address Available, Please wait a while</p>
          <p v-else>Checking available deposit address, Please wait a while</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import wops from '../wallet'

export default {
  name: 'DepositAddr',
  computed: mapState({
      baddr: 'baddr',
      deposit_addr: "deposit_addr",
      coin: "coin",
      free_xins:"free_xins"
  }),
  methods: {
      obtain_addr: async function (){
          const commit = this.$store.commit
          const msg = await wops.obtain_deposit_addr(function(xaddr){
            commit('setDepositAddr',xaddr)
          })
          if(msg!='ok'){
            this.$message(msg)
          }
      }
  }
}
</script>
