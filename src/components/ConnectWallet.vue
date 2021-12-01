<template>
  <div class="connect-wallet">
    <el-button round v-if="!baddr" @click="connect_wallet" class="connect">{{
      $t("connect-wallet")
    }}</el-button>
    <el-button v-if="baddr">{{ baddr }}</el-button>
    <!-- <div class="tips">
      <el-button
        icon="el-icon-question"
        circle
        @click="drawer = true"
      ></el-button>
      <el-drawer title="说明" :visible.sync="drawer" :direction="direction"
        ><span>钱包为bsc钱包</span></el-drawer
      >
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import wops from "../wallet";

export default {
  name: "ConnectWallet",
  computed: mapState({
    baddr: "baddr",
    xbalance: "xbalance",
    coin: "coin",
  }),
  data() {
    return {
      drawer: false,
      direction: "ltr",
    };
  },
  methods: {
    connect_wallet: async function () {
      const commit = this.$store.commit;
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(200, 230, 200, 0.7)",
      });
      try {
        const addr = await wops.connect(this.$store.state.coin, commit);
        if (!addr) {
          this.$message(this.$t("connect-faild"));
        }
      } catch (e) {
        if (e.code === -32601) {
          this.$message("wrong network");
        } else {
          this.$message(e.message);
        }
      }
      loading.close();
    },
  },
};
</script>
<style>
.connect-wallet {
  position: relative;
}
.connect-wallet > button {
  width: 300px;
  height: 60px;
  font-size: 30px;
  position: relative;
  top: 200px;
}
.connect-wallet > button:hover {
  background-color: #668b66;
  color: #d1fcd1;
  border: #b1fcb1 1px solid;
}
.tips {
  float: right;
}
.tips .el-drawer {
  width: 200px;
  height: 500px;
}
</style>
