<template>
  <!-- <div v-if="baddr" class="balance">  -->
    <!-- <select value="coin">
      <option @click="switchxch"><span>{{xbalance}}PXCH</span></option>
      <option @click="switchxcc"><span>{{xbalance}}PXCC</span></option>
    </select>-->
  <!-- </div> -->
  <el-col class="changecoin">
    <!-- <el-radio-group> -->
      <!-- <el-radio-button :label="xcc" @click="swichxcc"></el-radio-button> -->
      <!-- <el-radio :label="xch" @click="swichxch"></el-radio> -->
    <!-- </el-radio-group> -->
          <el-button @click="switchxch" :class="{bgok:display}">Chia</el-button>
          <el-button @click="switchxcc" :class="{bgno:none}">Chives</el-button>
  </el-col>

</template>
<script>
import wops from '../wallet'
import { mapState } from "vuex"
// import ConnectWallet from "./ConnectWallet.vue"

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
      none:false
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
      console.log("kaishile h")
      await this.connect_wallet('XCH')
      this.disabled
      this.display = true
      this.none = false
            console.log('done')

    },
    switchxcc: async function (){
      console.log("kaishile c")
      await this.connect_wallet('XCC')
      console.log('done')
      this.disabled
      this.display = false
      this.none = true
            console.log('done')

    },
    }
  })
</script>
<style>
.bgok ,.bgno{
  width: 100px;
  background:rgba(146, 202, 146, 0.781) url(../assets/images/ok.png) no-repeat right;
  background-size: 25%;
}
/* .bgno{
  background: url(../assets/images/ok.png) no-repeat right;
  background-size: 40%;
} */
</style>