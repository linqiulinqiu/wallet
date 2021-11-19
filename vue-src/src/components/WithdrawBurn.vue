<template>
  <div id="WithdrawBurn">
    <div v-if="xwaddr">
      <el-input
        id="withdraw-amount"
        size="middle"
        suffix-icon="el-icon-edit"
        clearable
        v-model="amount"
        type="text"
        :placeholder="$t('amount')"
      >
      </el-input>
      <el-button type="primary" plain @click="amount = xbalance">{{
        $t("max")
      }}</el-button>

      <el-button
        type="primary"
        plain
        size="middle"
        @click="withdraw"
        :loading="loading"
        :disabled="disabled"
        >{{ $t("withdraw") }}</el-button
      >
      <div v-if="amount" id="have-amount">
        <div v-if="rec_amount">
          <p>
            {{
              $t("receive-money", {
                rec_amount: this.rec_amount,
                coin: coin,
              })
            }}
          </p>
        </div>
        <div v-if="rec_alert1">
          <p>{{ $t("rec-alert1") }}</p>
        </div>
        <div v-if="rec_alert2">
          <p>{{ $t("rec-alert2", { coin: this.coin }) }}</p>
        </div>
      </div>
    </div>
    <div v-if="withdraw_addr">
      <div id="withdrawfee">
        <span>{{ $t("little-fee") }}</span>
        <el-popover
          placement="left"
          :title="$t('fees')"
          width="400"
          trigger="click"
        >
          <span
            >{{
              $t("transactionfee", {
                coin: coin,
                withdraw_fee_rate: withdraw_fee_rate,
                withdraw_fee_min: withdraw_fee_min,
              })
            }}
          </span>
          <el-button
            size="mini"
            circle
            @click="show_fee()"
            slot="reference"
            type="primary"
            icon="el-icon-info"
          ></el-button>
        </el-popover>
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
    withdraw_addr: "withdraw_addr",
    coin: "coin",
  }),
  data() {
    return {
      amount: "",
      loading: false,
      rec_amount: false,
      rec_alert1: false,
      rec_alert2: false,
      disabled: false,
      withdraw_fee_min: "",
      withdraw_fee_rate: "",
    };
  },
  watch: {
    amount: async function () {
      var bamount = this.amount;
      if (!bamount || isNaN(bamount) || bamount == "") {
        bamount = "0";
      }
      const after_fee = wops.after_fee("withdraw", bamount);
      if (!after_fee) {
        this.rec_amount = false;
        this.rec_alert1 = true;
        this.rec_alert2 = false;
      } else if (after_fee == "fund") {
        this.rec_amount = false;
        this.rec_alert1 = false;
        this.rec_alert2 = true;
      } else {
        this.rec_amount = after_fee;
        this.rec_alert1 = false;
        this.rec_alert2 = false;
      }
    },
  },
  methods: {
    show_fee: function () {
      const fees = wops.bsc_fees();
      this.withdraw_fee_min = fees.withdraw_fee_min;
      this.withdraw_fee_rate = fees.withdraw_fee_rate / 100;
    },
    amount_valid: function (amount) {
      if (!amount || isNaN(amount)) {
        return false;
      }
      //amount = parseFloat(amount) // TODO: convert to bignum later
      const after_fee = wops.after_fee("withdraw", amount);
      // console.log("after_fee", after_fee);
      if (!after_fee || isNaN(after_fee) || parseFloat(after_fee) <= 0) {
        return false;
      }
      return true;
    },
    withdraw: async function () {
      const btn = this;
      if (this.amount_valid(this.amount)) {
        btn.loading = true;
        btn.disabled = true;
        try {
          const msg = await wops.token_burn(this.amount, function () {
            btn.loading = false;
            btn.disabled = false;
            btn.amount = "";
          });
          if (msg != "ok") {
            this.$message(msg);
            btn.loading = false;
            btn.disabled = false;
          }
        } catch (e) {
          this.$message(e.message);
          btn.loading = false;
          btn.disabled = false;
        }
      } else {
        this.$message("invalid withdraw amount");
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
#WithdrawBurn {
  color: #034203;
  height: 320px;
  position: relative;
}
#WithdrawBurn .el-input {
  width: 60%;
  margin: 20px auto;
}
#withdrawfee {
  height: 30px;
  position: absolute;
  bottom: 0px;
  color: rgb(23, 73, 5);
  float: right;
  right: 5px;
}
#withdrawfee .el-button {
  margin-left: 5px;
}
</style>
