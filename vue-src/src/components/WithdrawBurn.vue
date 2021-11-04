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
    amount_valid: function (amount){
      if(!amount||isNaN(amount)){
        return false
      }
      //amount = parseFloat(amount) // TODO: convert to bignum later
      const after_fee = wops.after_fee("withdraw", amount)
      console.log('after_fee', after_fee)
      if(!after_fee||isNaN(after_fee)||parseFloat(after_fee)<=0){
        return false
      }
      return true
    },
    withdraw: async function () {
      const btn = this
      if(this.amount_valid(this.amount)){
        this.loading = true
        this.disabled = true
        try{
          const msg = await wops.token_burn(this.amount, function () {
            btn.loading = false
            btn.disabled = false
            btn.amount = ""
          })
          if (msg != "ok") {
            this.$message(msg);
            this.loading = false;
            this.disabled = false;
          }
        }catch(e){
          this.$message(e.message)
          btn.loading = false
          btn.disabled = false
        }
      }else{
        this.$message('invalid withdraw amount')
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
