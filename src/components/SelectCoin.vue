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
    <el-button @click="getAddr_hash">getAddr_hash</el-button>
    <p>Address:{{ x_addr }}</p>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
import wkeys from "../wkeys";
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
      x_addr: "none",
    };
  },
  watch: {
    coinchg: function (new_coin) {
      this.$store.commit("setCoin", new_coin);
      //   if (this.baddr) {
      // this.connect_wallet(new_coin);
      //   }
    },
  },
  methods: {
    getAddr_hash: async function () {
      this.x_addr = await wkeys.to_puzzl_hash();
      console.log("X_addr", this.x_addr);
    },
  },
};
</script>