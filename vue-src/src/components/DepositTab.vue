<template>
  <div id="introduction">
    <DepositAddr />
    <div v-if="deposit_addr" class="fee">
      <div id="exchange">
        {{ $t("deposit") }}
        <el-input
          v-model="deposit_amount"
          size="middle"
          suffix-icon="el-icon-edit"
          clearable
        ></el-input>
        {{ this.coin }}
        <div v-if="deposit_amount">
          <div v-if="rec_amount">
            <p>
              {{ rec_amount }}
              {{ $t("deposit-coin", { coin: this.coin }) }}
            </p>
            <p>{{ $t("bsc-addr", { baddr: this.baddr }) }}</p>
            <span>{{ $t("in-about") }}</span>
          </div>
          <div v-if="rec_alert1">
            <p class="rec-amount">{{ $t("rec-alert1") }}</p>
          </div>
          <div v-if="rec_alert2">
            <p>{{ this.$t("rec-alert2", { coin: this.coin }) }}</p>
          </div>
        </div>
      </div>
      <div id="dep-fees">
        <span>{{ $t("little-fee") }}</span>
        <el-popover placement="left" title="fees" width="400" trigger="click">
          <span
            >{{
              $t("transaction-fee", {
                coin: coin,
                deposit_fee_min: deposit_fee_min,
                deposit_fee_rate: deposit_fee_rate,
              })
            }}
          </span>
          <el-button
            size="mini"
            circle
            type="primary"
            @click="show_fee()"
            slot="reference"
            icon="el-icon-info"
          ></el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import DepositAddr from "./DepositAddr";
import { mapState } from "vuex";
import wops from "../wallet";

export default {
  name: "DepositTab",
  components: {
    DepositAddr,
  },
  computed: mapState({
    deposit_addr: "deposit_addr",
    coin: "coin",
    xbalance: "xbalance",
    baddr: "baddr",
  }),
  data() {
    return {
      deposit_amount: "",
      rec_amount: false,
      rec_alert1: false,
      rec_alert2: false,
      deposit_fee_min: "",
      deposit_fee_rate: "",
    };
  },
  methods: {
    show_fee: function () {
      const fees = wops.bsc_fees();
      this.deposit_fee_min = fees.deposit_fee_min;
      this.deposit_fee_rate = fees.deposit_fee_rate / 100;
    },
  },
  watch: {
    deposit_amount: async function () {
      var depositamount = this.deposit_amount;
      if (!depositamount || isNaN(depositamount) || depositamount == "") {
        depositamount = "0";
      }
      const after_fee = wops.after_fee("deposit", depositamount);
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
};
</script>
<style>
#dep-fees {
  position: relative;
  top: 72px;
  left: 30px;
  float: right;
  color: rgb(23, 73, 5);
}
#dep-fees .el-button {
  margin-left: 5px;
}
#introduction {
  height: 450px;
  position: relative;
  top: 40px;
  width: 90%;
  margin: 0px auto;
}
#exchange {
  width: 90%;
  height: 180px;
  margin-top: 40px;
}
#exchange > .el-input {
  width: 70%;
}
</style>