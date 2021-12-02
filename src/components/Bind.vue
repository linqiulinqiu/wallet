<template>
  <div id="bindwithdrawaddr">
    <p>
      <el-input
        v-model="xwaddr"
        :placeholder="$t('input-wallet-for-withdraw', { coin: coin })"
        suffix-icon="el-icon-edit"
      ></el-input>
    </p>
    <el-button @click="bind_addr" :loading="loading" :disabled="disabled">{{
      $t("bind-withdraw-address")
    }}</el-button>
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
    bind_addr: async function () {
      const commit = this.$store.commit;
      console.log("try bind");
      try {
        const msg = await wops.bind_withdraw_addr(
          this.xwaddr,
          function (xaddr) {
            commit("setWithdrawAddr", xaddr);
          },
          false
        );
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
      } catch (e) {
        this.$message("Address error, please enter the correct address");
        console.log("ex", e, typeof this.xwaddr);
      }
    },
  },
};
</script>
<style>
#bindwithdrawaddr .el-input {
  width: 90%;
  margin-top: 50px;
  margin-bottom: 10px;
}
</style>