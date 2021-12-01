<template>
  <div id="rebind" v-if="r">
    <p>{{ $t("rebind-newaddr") }}</p>
    <p>
      <el-input
        id="rebindInput"
        v-model="xwaddr"
        clearable
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

    <div id="rebindfee">
      <span>{{ $t("little-refee") }}</span>
      <el-popover
        placement="left"
        :title="$t('fees')"
        width="400"
        trigger="click"
      >
        <span
          >{{
            $t("rebind-fee", {
              re_fee: this.refee,
            })
          }}
        </span>
        <el-button
          size="mini"
          circle
          slot="reference"
          type="primary"
          icon="el-icon-info"
        ></el-button>
      </el-popover>
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
  data() {
    return {
      xwaddr: "",
      loading: false,
      disabled: false,
      refee: "-",
    };
  },
  created() {
    this.rebindfee();
  },
  methods: {
    rebindfee: async function () {
      const re_fee = await wops.get_bind_fee(true);
      this.refee = re_fee;
    },
    cancel_rebind: async function () {
      const wa = this.withdraw_addr;
      if (wa.length > 0 && wa.substr(0, 1) == " ") {
        this.$store.commit("setWithdrawAddr", wa.substr(1));
      }
      console.log("concel_rebind", this.r);
    },
    rebind_addr: async function () {
      const commit = this.$store.commit;
      try {
        const msg = await wops.bind_withdraw_addr(
          this.xwaddr,
          function (xaddr) {
            commit("setWithdrawAddr", xaddr);
          },
          true
        );
        // console.log("this.r", this.r);
        // console.log("this.xwaddr", this.xwaddr);
        // console.log("this.withdrawaddr", this.withdraw_addr);
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
  width: 90%;
  margin: 30px auto;
}
#rebindfee {
  height: 100px;
  position: relative;
  bottom: -185px;
  color: rgb(23, 73, 5);
  float: right;
  right: 10px;
}
#rebindfee .el-button {
  margin-left: 5px;
}
</style>