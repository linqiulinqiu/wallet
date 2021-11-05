<template>
  <div>
    <span>{{ xbalance }} P{{ coin }} </span>
    <!-- <div id="buyXCC"> -->
    <a
      v-if="this.coin == 'XCC'"
      id="buyXCC"
      href="https://pancakeswap.finance/swap?outputCurrency=0x0243fb40dded3b4622004035d4871aa1541db8b4"
      >buy</a
    >
  </div>
  <!-- </div> -->
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
<style>
#buyXCC {
  color: #d1fcd1;
  text-decoration: none;
}
#buyXCC:hover {
  color: rgb(127, 255, 148);
}
</style>