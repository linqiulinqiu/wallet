<template>
  <div id="rebind" v-if="r">
    <p>{{ $t("rebind-newaddr") }}</p>
    <p>
      <el-input
        id="rebindInput"
        v-model="xwaddr"
        :placeholder="$t('input-wallet-for-withdraw', { coin: coin })"
        suffix-icon="el-icon-edit"
      ></el-input>
    </p>

    <div>
      <el-button
        type="primary"
        plain
        @click="rebind_addr"
        :loading="loading"
        :disabled="disabled"
        >{{ $t("rebind") }}</el-button
      >
      <el-button type="primary" plain @click="cancel_rebind">{{
        $t("cancel")
      }}</el-button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import wops from "../wallet";

export default {
  computed: mapState({
    baddr: "baddr",
    withdraw_addr: "withdraw_addr",
    coin: "coin",
    r(state) {
      const wa = state.withdraw_addr;
      console.log("withdraw ", typeof wa);
      if (wa === "") {
        return false;
      }
      if (wa.substr(0, 1) == " ") {
        return true;
      }
      return false;
    },
  }),
  data: () => {
    return {
      xwaddr: "",
      loading: false,
      disabled: false,
    };
  },
  methods: {
    cancel_rebind: async function () {
      const wa = this.withdraw_addr;
      if (wa.length > 0 && wa.substr(0, 1) == " ") {
        this.$store.commit("setWithdrawAddr", wa.substr(1));
      }
      console.log("concel_rebind", this.r);
    },
    rebind_addr: async function () {
      const commit = this.$store.commit;
      console.log("try bind");
      try {
        const msg = await wops.bind_withdraw_addr(
          this.xwaddr,
          function (xaddr) {
            commit("setWithdrawAddr", xaddr);
          },
          true
        );
        console.log("this.r", this.r);
        console.log("this.xwaddr", this.xwaddr);
        console.log("this.withdrawaddr", this.withdraw_addr);
        if (msg == "ok") {
          this.loading = true;
          this.disabled = true;
        } else {
          this.$message(msg);
          this.xwaddr = "";
          this.loading = false;
          this.disabled = false;
        }
        this.loading = false;
        this.disabled = false;
        this.waddr = "";
      } catch (e) {
        this.$message("Address error, please enter the correct address");
        console.log("ex", e, typeof this.xwaddr);
        this.xwaddr = "";
      }
    },
  },
};
</script>
<style>
#rebind {
  width: 100%;
  margin: 0px auto;
  height: 250px;
}
#rebind .el-input {
  width: 100%;
}
</style>