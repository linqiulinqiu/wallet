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
        <a target="_blank" class="aa" id="buy" @click="openswap">buy</a>
      </span>
      <span v-else-if="this.coin == 'XCH'">
        <img
          src="../assets/images/pxch-logo.png"
          alt="chia"
          fit="fill"
          @click="add_token"
        />
        <a target="_blank" class="aa" id="buy" @click="openswap">buy</a>
      </span>
      <span v-else></span>
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
    openswap: async function () {
      const contract_addr = wops.get_contract_addr();
      const swap = "https://pancakeswap.finance/swap?outputCurrency=";
      const url = swap + contract_addr;
      window.open(url);
    },
  },
};
</script>
<style>
#buy {
  color: #d1fcd1;
  text-decoration: none;
}
#buy:hover {
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
  transform: scale(1.2);
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