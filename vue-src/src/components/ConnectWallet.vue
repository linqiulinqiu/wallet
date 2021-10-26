<template>
  <div class="connect-wallet">
    <el-button type="success" round v-if="!baddr" @click="connect_wallet">{{$t("connect-wallet")}}</el-button>
    <el-button v-if="baddr">{{baddr}}</el-button>
  </div> 
</template>

<script>
import { mapState } from 'vuex'
import wops from '../wallet'


export default {
  name: 'ConnectWallet',
  computed: mapState({
      baddr: 'baddr',
      xbalance: 'xbalance'
    }),
  methods: {
      connect_wallet: async function (){
        const commit = this.$store.commit
          try {
            const addr = await wops.connect(this.$store.state.coin, commit)
            if(addr){
                this.$store.commit('setBaddr', addr)
                const bsc = await wops.check_bsc()
                this.$store.commit('setFreeXins', bsc.free_xins)
                this.$store.commit('setDepositAddr', bsc.deposit_addr)
                this.$store.commit('setWithdrawAddr', bsc.withdraw_addr)
                this.$store.commit('setXbalance', bsc.xbalance)
            }else{
                this.$message(this.$t('connect-faild'))
            }
          }catch(e){
            this.$message(e.message)
          }
      }
  }
}
</script>
<style>
.connect-wallet button{
  width: 300px;
  height: 60px;
  font-size: 30px;
}
</style>
