<template>
  <el-container>
    <el-header>
      <el-row type="flex" align="center" justify="center">
        <el-col :span="12"><div>Deposit</div></el-col>
        <el-col :span='12'><div>Withdraw</div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="connect-wallet">
        <el-button type="success" round v-if="!baddr" @click="connect_wallet">Connect Wallet</el-button>
        <el-button v-if="baddr">{{baddr}}</el-button>
  </div>
    </el-main>
  </el-container>
  
</template>

<script>
import { mapState } from 'vuex'
import wops from '../wallet'

export default {
  name: 'ConnectWallet',
  computed: mapState({
      baddr: 'baddr'
  }),
  methods: {
      connect_wallet: async function (){
        const addr = await wops.connect(this.$store.state.coin)
        if(addr){
            this.$store.commit('setBaddr', addr)
            const bsc = await wops.check_bsc()
            this.$store.commit('setFreeXins', bsc.free_xins)
            this.$store.commit('setDepositAddr', bsc.deposit_addr)
          }else{
              this.$message('Connect failed: make sure wallet works')
          }
      }
  }
}
</script>
