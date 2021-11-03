<template>
  <div>
    <WithdrawAddr />
    <div v-if="withdraw_addr" class="fee">
      <p>{{ $t("burn-introduction", { coin: coin }) }}</p>
      <p>{{ $t("transactionfee", { coin: coin }) }}</p>
    </div>
  </div>
</template>

<script>
import WithdrawAddr from "./WithdrawAddr.vue";
import { mapState } from "vuex";

export default {
  name: "WithdrawTab",
  components: {
    WithdrawAddr,
  },
  computed: mapState({
    withdraw_addr: "withdraw_addr",
    coin: "coin",
  }),
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