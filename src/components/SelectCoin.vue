<template>
  <el-col>
    <el-select v-model="coinchg" id="selectcoin" placeholder="选择币种">
      <el-option key="XCH" label="Chia -- BSC" value="XCH" id="XCH"></el-option>
      <el-option
        key="XCC"
        label="Chives -- BSC"
        value="XCC"
        id="XCC"
      ></el-option>
      <el-option
        key="HDD"
        label="HDDcoin -- BSC"
        value="HDD"
        id="HDD"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    coin: "coin",
    addrInfo: "addrInfo",
    mnemonic: "mnemonic",
    xaddr: "xaddr",
  }),
  data() {
    return {
      coinchg: this.coin,
    };
  },
  watch: {
    coinchg: function (new_coin) {
      this.$store.commit("setCoin", new_coin);
      console.log(this.coin);
      //   if (this.baddr) {
      // this.connect_wallet(new_coin);
      //   }
    },
  },
};
</script>