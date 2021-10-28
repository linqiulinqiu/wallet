<template>
  <el-col :lg="10" :md="12" :sm="18" :xs="22" class="maintab">
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
.el-tab-pane{
  text-align: center;
  margin: 0 auto;
}
.maintab{
  border: 1px solid #afefad;
  background-color: #baccba;
}
#tab-deposit-mode,
#tab-withdraw-mode{
  width: 350px;
  text-align: center;
  font-size: 20px;
}

</style>
