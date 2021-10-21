<template>
  <el-container>
    <el-header>
      <el-row type="flex" align="center" justify="center">
        <el-col :span="12"><div>Deposit</div></el-col>
        <el-col :span='12'><div>Withdraw</div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="deposit-addr" v-if="baddr">
        <div v-if="!deposit_addr">
          <el-button v-if="free_xins>0" @click="obtain_addr">Obtain Deposit Address</el-button>
          <p v-if="free_xins===0">No Deposit Address Available, Please wait a while</p>
          <p v-if="free_xins===false">Checking available deposit address, Please wait a while</p>
        </div>
        <div v-if="deposit_addr">
        <p>Please send {{coin}} to {{deposit_addr}} to get P{{coin}}</p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
//import wops from '../wallet'

export default {
  name: 'ConnectWallet',
  computed: mapState({
      baddr: 'baddr',
      deposit_addr: "deposit_addr",
      coin: "coin",
      free_xins:"free_xins"
  }),
  methods: {
      obtain_addr: async function (){
          this.$message('Obtain deposit addr')
      }
  }
}
</script>
