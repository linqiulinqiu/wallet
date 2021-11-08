<template>
  <div id="balancelink">
    <p>
      <span class="aa">{{ xbalance }} P{{ coin }} </span>
      <span v-if="this.coin == 'XCC'">
        <img
          src="../assets/images/pxcc-logo.png"
          alt="chives"
          fit="fill"
          @click="add_token"
        />
        <a
          class="aa"
          id="buyXCC"
          href="https://pancakeswap.finance/swap?outputCurrency=0x0243fb40dded3b4622004035d4871aa1541db8b4"
          >buy</a
        >
      </span>
    </p>
  </div>
</template>
<script>
import { mapState } from "vuex";
import wops from "../wallet";
export default {
  name: "Xbalance",
  computed: mapState({
    coin: "coin",
    xbalance: "xbalance",
  }),
  methods: {
    add_token: async function () {
      const res = await wops.add_token(this.coin);
      console.log("add token", res);
    },
  },
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
  margin: 4px 4px 0px 4px;
}
#balancelink img:hover {
  transform: scale(1.1);
  transition: transform 0.3s;
}
#balancelink {
  position: relative;
  top: -12px;
}
#balancelink a {
  border-radius: 30%;
  background-color: #034403;
}
.aa {
  position: relative;
  top: -10px;
}
</style>