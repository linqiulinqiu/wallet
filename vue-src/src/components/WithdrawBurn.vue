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
      if (!this.amount == "") {
        const after_fee = wops.after_fee("withdraw", this.amount);
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
      }
    },
  },
  methods: {
    withdraw: async function () {
      if (!this.amount) {
        this.$message("bad amount");
        this.amount = "";
        console.log("this.amount", typeof this.amount);
      }
      const amount = parseFloat(this.amount); // TODO: use bignmber etc to convert to bigint first
      console.log("this.amount2", typeof amount);
      if (this.amount == 0 || wops.after_fee("withdraw", amount)) {
        this.$message("bad amount");
        this.amount = "";
        console.log("amount1", amount);
      } else {
        this.disabled;
        this.loading = true;
        const btn = this;
        // TODO: check amount valid first
        console.log(2);
        const msg = await wops.token_burn(amount, function () {
          console.log(3);
          btn.loading = false;
          btn.enabled;
          this.$message(this.$t("waitting"));
          console.log(4);
        });
        console.log(5);
        this.amount = "";
        console.log(6);
        if (msg != "ok") {
          this.loading = false;
          this.enabled;
          this.$message(msg);
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
