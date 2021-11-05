<template>
  <div id="balancelink">
    <p>
      <span>{{ xbalance }}P{{ coin }} </span>
      <img src="../assets/images/chiveslogo.png" alt="chives" />
      <a
        v-if="this.coin == 'XCC'"
        id="buyXCC"
        href="https://pancakeswap.finance/swap?outputCurrency=0x0243fb40dded3b4622004035d4871aa1541db8b4"
        >buy</a
      >
    </p>
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
<style>
#buyXCC {
  color: #d1fcd1;
  text-decoration: none;
}
#buyXCC:hover {
  background-color: #d1fcd1;
  color: #668b66;
}
#balancelink img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 4px;
}
#balancelink {
  position: relative;
  top: -15px;
}
#balancelink a {
  border-radius: 50%;
  background-color: #034403;
}
</style>