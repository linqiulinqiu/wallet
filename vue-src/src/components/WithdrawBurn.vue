<template>
  <div class="WithdrawBurn">
    <div v-if="xwaddr">
      <el-input
        size="middle"
        suffix-icon="el-icon-edit"
        clearable
        v-model="amount"
        type="text"
        :placeholder="$t('amount')"
      >
      </el-input>
      <el-button @click="withdraw" :loading="loading" :disabled="disabled">{{
        $t("withdraw")
      }}</el-button>
      <div v-if="amount">
        <div v-if="rec_amount">
          <p>{{ $t("receive-money") }}{{ rec_amount }}</p>
        </div>
        <div v-if="rec_alert">
          <p class="rec-amount">{{ rec_alert }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import wops from "../wallet";

export default {
  name: "WithdrawBurn",
  computed: mapState({
    baddr: "baddr",
    xbalance: "xbalance",
    xwaddr: "withdraw_addr",
    coin: "coin",
  }),
  data() {
    return {
      amount: "",
      loading: false,
      rec_amount: false,
      rec_alert: false,
      disabled: false,
    };
  },
  watch: {
    amount: async function () {
      var bamount = this.amount;
      if (!bamount || isNaN(bamount) || bamount == "") {
        // "", null, false
        bamount = "0";
      }
      const after_fee = wops.after_fee("withdraw", bamount);
      if (!after_fee) {
        this.rec_amount = false;
        this.rec_alert = this.$t("rec-alert1");
      } else if (after_fee == "fund") {
        this.rec_amount = false;
        this.rec_alert = this.$t("rec-alert2", { coin: this.coin });
      } else {
        this.rec_amount = after_fee;
        this.rec_alert = false;
      }
    },
  },
  methods: {
    withdraw: async function () {
      if (amount == "" || isNaN(amount)) {
        this.$message("amount is not a number");
        this.amount = "";
      }
      // TODO: use bignmber etc to convert to bigint first
      const amount = parseFloat(this.amount);

      if (amount == 0 || wops.after_fee("withdraw", amount)) {
        this.$message("bad amount");
        console.log("amount", amount);
        this.amount = "";
      } else {
        console.log("enter burn", amount);
        this.disabled = true;
        this.loading = true;
        const btn = this;
        console.log("点击", amount);
        // TODO: check amount valid first
        const msg = await wops.token_burn(amount, function () {
          btn.loading = false;
          btn.disabled = true;
          console.log("burn is ok", amount);
          this.$message(this.$t("waitting"));
        });
        this.amount = "";
        if (msg != "ok") {
          this.$message(msg);
          this.loading = false;
          this.disabled = false;
          this.amount = "";
        }
      }
    },
  },
};
</script>
<style>
.send {
  width: 95%;
  color: rgb(23, 73, 5);
  font-size: 15px;
}
.WithdrawBurn .el-button {
  color: rgb(23, 73, 5);
}
</style>
