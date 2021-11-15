<template>
  <div>
    <WithdrawAddr />
    <div v-if="withdraw_addr">
      <div id="withdrawfee">
        <el-popover placement="left" title="fees" width="400" trigger="click">
          <span
            >{{
              $t("transactionfee", {
                coin: coin,
                withdraw_fee_rate: withdraw_fee_rate,
                withdraw_fee_min: withdraw_fee_min,
              })
            }}
          </span>
          <el-button @click="show_fee()" slot="reference" type="primary">{{
            $t("little-fee")
          }}</el-button>
        </el-popover>
      </div>
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
    return {
      withdraw_fee_min: "",
      withdraw_fee_rate: "",
    };
  },
  methods: {
    show_fee: function () {
      const fees = wops.bsc_fees();
      this.withdraw_fee_min = fees.withdraw_fee_min;
      this.withdraw_fee_rate = fees.withdraw_fee_rate / 100;
    },
  },
};
</script>
<style>
#withdrawfee {
  height: 100px;
  position: relative;
  bottom: -155px;
  color: rgb(23, 73, 5);
  float: right;
}
</style>