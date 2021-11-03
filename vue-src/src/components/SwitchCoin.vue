<template>
  <el-col class="changecoin">
    <!-- <el-select v-model="switchcoin">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select> -->
    <el-button
      @click="switchxch"
      :class="{ bgok: display }"
      :disabled="disabledXCH"
      >Chia</el-button
    >
    <el-button
      @click="switchxcc"
      :class="{ bgno: none }"
      :disabled="disabledXCC"
      >Chives</el-button
    >
  </el-col>
</template>
<script>
import wops from "../wallet";
import { mapState } from "vuex";

export default {
  name: "SwitchCoin",
  computed: mapState({
    baddr: "baddr",
    xbalance: "xbalance",
    coin: "coin",
  }),
  data() {
    return {
      display: true,
      none: false,
      disabledXCH: false,
      disabledXCC: false,
      amount: "",
      // options: [
      //   {
      //     value: "xch",
      //     label: this.xbalance + "P" + this.coin,
      //   },
      //   {
      //     value: "xcc",
      //     label: this.xbalance + "P" + this.coin,
      //   },
      // ],
      // switchcoin: "xch",
    };
  },
  // watch: {
  //   switchcoin: function () {},
  // },
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
    // getchange: async function () {
    //   if (this.coin == "XCC") {
    //     this.switchxcc(this.coin);
    //   } else if (this.coin == "XCH") {
    //     this.switchxch(this.coin);
    //   } else {
    //     return false;
    //   }
    // },
    switchxch: async function () {
      const loading = this.$loading({
        lock: true,
        text: "Switching",
        spinner: "el-icon-loading",
        background: "rgba(200, 230, 200, 0.5)",
      });
      setTimeout(() => {
        loading.close();
      }, 1000);
      await this.connect_wallet("XCH");
      this.disabledXCH = true;
      this.disabledXCC = false;
      this.display = true;
      this.none = false;
    },
    switchxcc: async function () {
      const loading = this.$loading({
        lock: true,
        text: "Switching",
        spinner: "el-icon-loading",
        background: "rgba(200, 230, 200, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 1000);
      await this.connect_wallet("XCC");
      this.disabledXCC = true;
      this.disabledXCH = false;
      this.display = false;
      this.none = true;
    },
  },
};
</script>
<style>
.bgok,
.bgno {
  background: rgba(146, 202, 146, 0.781) url(../assets/images/ok.png) no-repeat
    right;
  background-size: 25%;
}
.changecoin .el-button.is-disabled,
.changecoin .el-button.is-disabled:focus,
.changecoin .el-button.is-disabled:hover {
  color: #013601;
  cursor: not-allowed;
  background: rgba(146, 202, 146, 0.781) url(../assets/images/ok.png) no-repeat
    right;
  background-size: 30%;
  border-color: #ebeef5;
}
.changecoin {
  margin-top: 50px;
}
.changecoin .el-button {
  width: 100px;
  box-sizing: border-box;
}
</style>