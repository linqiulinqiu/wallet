<template>
  <el-col :span='8'>
      <ConnectWallet v-if="!baddr" />
      <el-tabs v-else v-model="opMode">
        <el-tab-pane :label="$t('deposit')" name="deposit-mode">
          <DepositTab />
        </el-tab-pane>
        <el-tab-pane :label="$t('withdraw')" name="withdraw-mode">
          <WithdrawTab />
        </el-tab-pane>
      </el-tabs>
  </el-col>
</template>
<script>

import { mapState } from 'vuex'
//import wops from '../wallet'

import ConnectWallet from './ConnectWallet.vue'
import DepositTab from './DepositTab.vue'
import WithdrawTab from './WithdrawTab.vue'

export default {
  name: 'MainPanel',
  components: {
    ConnectWallet,
    DepositTab,
    WithdrawTab,
  },
  computed: mapState({
      baddr: 'baddr',
      deposit_addr: "deposit_addr",
      coin: "coin",
      free_xins:"free_xins"
  }),
  data() {
      return {
        opMode: 'deposit-mode',
      };
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
