<template>
  <div class="introduction">
    <DepositAddr />
    <div v-if="deposit_addr" class="fee">
      <div id="exchange">
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
              {{ $t("deposit-coin", { coin: this.coin, baddr: this.baddr }) }}
            </p>
          </div>
          <div v-if="rec_alert">
            <p class="rec-amount">{{ rec_alert }}</p>
          </div>
        </div>
      </div>
      <p>{{ $t("transaction-fee", { coin: coin }) }}</p>
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
      rec_alert: false,
    };
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
};
</script>
<style>
.introduction {
  height: 360px;
  position: relative;
  top: 30px;
  width: 90%;
  margin: 0px auto;
}
.introduction .fee {
  margin-top: 25px;
}
.introduction .fee p {
  margin-bottom: 25px;
  color: rgb(23, 73, 5);
}
#exchange {
  width: 90%;
  height: 90px;
}
#exchange .el-input {
  width: 70%;
  /* margin-left: 5%; */
}
</style>