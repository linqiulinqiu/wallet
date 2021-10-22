<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <!-- deposit栏 -->
    <el-tab-pane label="Deposit" name="first">
      <div class="change-dep">
        <DepositAddr />
      </div>
    </el-tab-pane>
    <!-- Withdraw栏的内容 -->
        <el-tab-pane label="Withdraw" name="second">
          <WithdrawAddr />
          
            
          <WithdrawBurn />
        </el-tab-pane>
    </el-tabs>
</template>
<script>

import { mapState } from 'vuex'
//import wops from '../wallet'

// import ConnectWallet from './components/ConnectWallet.vue'
import DepositAddr from './DepositAddr.vue'
import WithdrawAddr from './WithdrawAddr.vue'
import WithdrawBurn from './WithdrawBurn.vue'

export default {
  name: 'ConnectWallet',
  components: {
    // ConnectWallet,
    DepositAddr,
    WithdrawAddr,
    WithdrawBurn,
  },
  computed: mapState({
      baddr: 'baddr',
      deposit_addr: "deposit_addr",
      coin: "coin",
      free_xins:"free_xins"
  }),
  data() {
      return {
        activeName: 'first',

      };
    },
  methods: {
      obtain_addr: async function (){
          this.$message('Obtain deposit addr')
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}
</script>
<style>

el-tab-pane{
  text-align: center;
  margin: 0 auto;
}
#tab-first,#tab-second{
  width: 300px;
}
</style>