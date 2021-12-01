<template>
  <div id="bound">
    <p id="send">
      {{ $t("burn-coin", { coin: coin }) }}
    </p>
    <p>{{ withdraw_addr }}</p>
    <button @click="toRebind" id="toRebind">Rebind</button>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import WithdrawBurn from "./WithdrawBurn.vue";

export default {
  components: {
    // WithdrawBurn,
  },
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
  data: () => {
    return {
      xwaddr: "",
    };
  },
  methods: {
    toRebind: function () {
      this.$store.commit("setWithdrawAddr", " " + this.withdraw_addr);
    },
  },
};
</script>
<style>
#toRebind {
  width: 40px;
  height: 20px;
  font-size: 8px;
  padding: 2px 0px;
  background-color: #668b66;
  color: #d1fcd1;
  border: none;
  border-radius: 15px;
  float: right;
  position: relative;
  top: -90px;
  left: -2px;
}
#toRebind:hover {
  transform: scale(1.5);
  opacity: 0.7;
  transition: transform 0.3s;
  border: 1px solid #d1fcd1;
}
#send {
  width: 95%;
  color: rgb(23, 73, 5);
  font-size: 15px;
}
#bound p {
  word-break: keep-all;
  overflow: auto;
}
</style>