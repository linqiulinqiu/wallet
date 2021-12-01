<template>
  <div id="withdraw-addr" v-if="baddr">
    <div v-if="withdraw_addr">
      <div v-if="r">
        <Rebind />
      </div>
      <div v-else>
        <SendToWaddr />
        <div>
          <WithdrawBurn />
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!r">
        <Bind />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import wops from "../wallet";
import WithdrawBurn from "./WithdrawBurn.vue";
import Bind from "./Bind.vue";
import Rebind from "./Rebind.vue";
import SendToWaddr from "./SendToWaddr.vue";

export default {
  name: "WithdrawAddr",
  components: {
    Bind,
    WithdrawBurn,
    Rebind,
    SendToWaddr,
  },
  computed: mapState({
    baddr: "baddr",
    withdraw_addr: "withdraw_addr",
    coin: "coin",
    r(state) {
      const wa = state.withdraw_addr;
      if (wa === "") {
        return false;
      }
      if (String(wa).substring(0, 1) == " ") {
        return true;
      }
      return false;
    },
  }),
  data: () => {
    return {
      xwaddr: "",
      loading: false,
      disabled: false,
    };
  },
};
</script>
<style>
#withdraw-addr {
  height: 250px;
  width: 100%;
}
#bound {
  background-color: rgba(142, 190, 138, 0.521);
  color: rgb(23, 73, 5);
  display: block;
  width: 90%;
  height: 100px;
  line-height: 20px;
  border-radius: 20px;
  margin: 30px auto 10px;
  padding-top: 10px;
}
</style>
