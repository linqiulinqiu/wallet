<template>
  <el-select v-model="coinchg" id="selectcoin">
    <el-option key="XCH" label="Chia" value="XCH"></el-option>
    <el-option key="XCC" label="Chives" value="XCC"></el-option>
  </el-select>
</template>
<script>
import wops from "../wallet";
import { mapState } from "vuex";

export default {
  name: "SelectCoin",
  computed: mapState({
    coin: "coin",
    baddr: "baddr",
    xbalance: "xbalance",
  }),
  data() {
    var curCoin = "XCH";
    if (this.coin) curCoin = this.coin;
    return {
      coinchg: curCoin,
    };
  },
  watch: {
    coinchg: function (new_coin) {
      this.$store.commit("setCoin", new_coin);
      this.selectLoading();
      if (this.baddr) {
        this.connect_wallet(new_coin);
      }
    },
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
    selectLoading: async function () {
      const loading = this.$loading({
        lock: true,
        text: "During switching, you need to wait two seconds",
        spinner: "el-icon-loading",
        background: "rgba(200, 230, 200, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
  },
};
</script>
<style>
#selectcoin {
  margin-top: 10px;
}
.el-select-dropdown__item.selected {
  color: #668b66;
}
.el-select .el-input__inner:focus {
  border-color: #d1fcd1;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #d1fcd1;
}
.el-select .el-input__inner {
  background-color: #668b66;
  color: #d1fcd1;
  border: #d1fcd1 1px solid;
  border-radius: 5px;
}
.el-select:hover .el-input__inner {
  border: #d1fcd1 1px solid;
}
.el-select .el-input__inner:focus {
  color: #d1fcd1;
}
</style>