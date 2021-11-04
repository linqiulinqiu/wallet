<template>
  <div>
    <span>{{ xbalance }} P{{ coin }} </span>
    <div v-if="coin_isXCC"></div>
    <a
      href="https://pancakeswap.finance/swap?outputCurrency=0x0243fb40dded3b4622004035d4871aa1541db8b4"
      >buy</a
    >
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Xbalance",
  computed: mapState({
    coin: "coin",
    xbalance: "xbalance",
  }),
};
</script>