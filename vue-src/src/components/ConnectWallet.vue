<template>
  <div class="connect-wallet">
    <el-button round v-if="!baddr" @click="connect_wallet" class="connect">{{$t("connect-wallet")}}</el-button>
    <el-button v-if="baddr">{{baddr}}</el-button>
    <div class="tips">
      <el-button icon="el-icon-question" circle @click="drawer=true"></el-button>
      <el-drawer title="说明"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"><span>钱包为bsc钱包</span></el-drawer>
    </div>
    
  </div> 
</template>

<script>
import { mapState } from 'vuex'
import wops from '../wallet'


export default {
  name: 'ConnectWallet',
  computed: mapState({
      baddr: 'baddr',
      xbalance: 'xbalance',
      coin: "coin"
    }),
    data(){
      return{
        drawer:false,
        direction:"ltr"
      }    
    },
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
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(function() {
            done();
          })
          .catch(function(){});
      }
  }
}
</script>
<style>
.connect-wallet{
  position: relative;
}
.connect-wallet>button{
  width: 300px;
  height: 60px;
  font-size: 30px;
  position: relative;
  top:200px;
}
.connect-wallet>button:hover{
  background-color: #668b66;
  color: #d1fcd1;
  border: #b1fcb1 1px solid;
}
.tips{
  float: right;
}
.tips .el-drawer{
  width: 200px;
  height: 500px;
}

</style>
