<template>
  <div>
    <WithdrawAddr />
    <div v-if="withdraw_addr" class="fee">
      <p>
        {{
          $t("transactionfee", {
            coin: coin,
            withdraw_fee_rate: this.fees.withdraw_fee_rate / 100,
            withdraw_fee_min: this.fees.withdraw_fee_min,
          })
        }}
      </p>
    </div>
  </div>
</template>

<script>
import WithdrawAddr from "./WithdrawAddr.vue";
import { mapState } from "vuex";
import wops from "../wallet";

export default {
  name: "WithdrawTab",
  components: {
    WithdrawAddr,
  },
  computed: mapState({
    withdraw_addr: "withdraw_addr",
    coin: "coin",
  }),
  data() {
    const fees = wops.bsc_fees();
    return {
      fees: fees,
    };
  },
};
</script>
<style>
.fee {
  height: 100px;
  position: relative;
  bottom: -20px;
  color: rgb(23, 73, 5);
  font-size: 16px;
}
</style>