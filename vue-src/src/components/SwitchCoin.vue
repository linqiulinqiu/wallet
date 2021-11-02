<template>
  <el-col class="changecoin">
    <el-button @click="switchxch" :class="{bgok:display}" :disabled="disabledXCH">Chia</el-button>
    <el-button @click="switchxcc" :class="{bgno:none}" :disabled="disabledXCC">Chives</el-button>
  </el-col>

</template>
<script>
import wops from '../wallet'
import { mapState } from "vuex"
// import ConnectWallet from "./ConnectWallet.vue"
// import WithdrawBurn from "./WithdrawBurn.vue"
export default ({

  name:'SwitchCoin',
  computed:mapState({
    baddr:'baddr',
    xbalance:"xbalance",
    coin:"coin"
  }),
  data(){
    return{
      display:true,
      none:false,
      fullscreenLoading:false,
      disabledXCH:false,
      disabledXCC:false
    }
  },
  methods: {
    connect_wallet: async function (coin){
      const commit = this.$store.commit
        try {
          const addr = await wops.connect(coin, commit)
          if(addr){
            this.$store.commit('setCoin',coin)
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
    switchxch: async function (){          
      const loading = this.$loading({
          lock: true,
          text: 'Switching',
          spinner: 'el-icon-loading',
          background: 'rgba(200, 230, 200, 0.5)'
        });
        setTimeout(() => {
          loading.close();
        }, 1000);
        await this.connect_wallet('XCH') 
        this.disabledXCH = true
        this.disabledXCC = false
        this.display = true
        this.none = false
            console.log('done')

    },
    switchxcc: async function (){
       this.rec_amount = false
      this.rec_alert = false
      const loading = this.$loading({
          lock: true,
          text: 'Switching',
          spinner: 'el-icon-loading',
          background: 'rgba(200, 230, 200, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 1000);
        await this.connect_wallet('XCC')
        this.disabledXCC = true
        this.disabledXCH = false
        this.display = false
        this.none = true
            console.log('done')

    },
    }
  })
</script>
<style>
.bgok ,.bgno{
  background:rgba(146, 202, 146, 0.781) url(../assets/images/ok.png) no-repeat right;
  background-size: 25%;
}
.changecoin{
    margin-top: 50px;
  }
</style>