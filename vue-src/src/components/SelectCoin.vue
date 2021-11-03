<template>
  <el-select v-model="coinchg">
    <el-option key="XCH" label="Chia" value="XCH"></el-option>
    <el-option key="XCH" label="Chives" value="XCC"></el-option>
  </el-select>
</template>
<script>
import wops from "../wallet";
import { mapState } from "vuex";

export default {
  name: "SelectCoin",
  computed: mapState({
    coin: "coin",
    baddr: "baddr"
  }),
  data() {
    return {
      coinchg: this.coin
    };
  },
  watch: {
      coinchg: function (new_coin){
          this.$store.commit("setCoin", new_coin)
          if (this.baddr){
            this.connect_wallet(new_coin)
          }
      }
  },
  methods: {
    connect_wallet: async function (coin) {
      const commit = this.$store.commit;
      try {
        const addr = await wops.connect(coin, commit);
        if (addr) {
          this.$store.commit("setCoin", coin);
          this.$store.commit("setBaddr", addr);
          const bsc = await wops.check_bsc();
          this.$store.commit("setFreeXins", bsc.free_xins);
          this.$store.commit("setDepositAddr", bsc.deposit_addr);
          this.$store.commit("setWithdrawAddr", bsc.withdraw_addr);
          this.$store.commit("setXbalance", bsc.xbalance);
        } else {
          this.$message(this.$t("connect-faild"));
        }
      } catch (e) {
        this.$message(e.message);
      }
    },
  },
};
</script>