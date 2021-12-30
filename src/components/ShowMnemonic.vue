<template>
  <el-col class="m-words">
    <h5>The Mnemonic</h5>
    <el-col id="m-name">
      <p>
        name: <span>{{ wname }}</span>
      </p>
    </el-col>
    <el-col id="show-w" :span="22" :offset="2">{{
      this.$store.state.mnemonic
    }}</el-col>
    <el-col id="burn">
      <el-button @click="burnNFT(item)">Burn</el-button>
      <el-button @click="exitS" type="primary"> Exit </el-button>
    </el-col>
    <el-col class="exit"></el-col>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
import wops from "../wallet";
export default {
  computed: mapState({
    mnemonic: "mnemonic",
    showMn: false,
    wname: "",
  }),
  data() {
    return {
      disabled: true,
    };
  },
  methods: {
    exitS: function () {
      this.$store.commit("setShowMn", false);
    },
    burnNFT: function (item) {
      console.log(this.$store.state.addrInfo);
    },
  },
};
</script>