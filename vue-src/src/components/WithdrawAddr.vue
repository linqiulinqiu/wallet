<template>
  <div class="withdraw-addr" v-if="baddr">
    <div v-if="withdraw_addr" id="bound">
      <p class="send">
        {{ $t("burn-coin", { coin: coin }) }}
      </p>
      <p>{{ withdraw_addr }}</p>
      <p>
        <el-input
          v-model="xwaddr"
          :placeholder="$t('input-wallet-for-withdraw')"
          suffix-icon="el-icon-edit"
        ></el-input>
      </p>
      <el-button @click="rebind_addr" :loading="loading" :disabled="disabled">
        Rebind-Withdraw Addr
      </el-button>
    </div>
    <div v-else>
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
    <div class="withdrawburn">
      <WithdrawBurn />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import wops from "../wallet";
import WithdrawBurn from "./WithdrawBurn.vue";

export default {
  name: "WithdrawAddr",
  components: {
    WithdrawBurn,
  },
  computed: mapState({
    baddr: "baddr",
    withdraw_addr: "withdraw_addr",
    coin: "coin",
  }),
  data: () => {
    return {
      xwaddr: "",
      loading: false,
      disabled: false,
    };
  },
  watch: {},
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
.withdraw-addr {
  height: 250px;
}
.withdraw-addr .el-input {
  width: 70%;
  margin: 20px auto;
}
#bound {
  background-color: rgba(142, 190, 138, 0.521);
  color: rgb(23, 73, 5);
  display: block;
  width: 90%;
  height: 100px;
  line-height: 20px;
  border-radius: 20px;
  margin: 30px auto 10px;
  padding-top: 10px;
}
</style>
