<template>
  <el-col class="m-words">
    <el-col id="m-name">
      <span> name:</span>
      <el-input size="small" maxlength="20" minlength="1"></el-input
    ></el-col>
    <el-col id="show-w" :span="22" :offset="2">{{ mnemonic }}</el-col>
    <el-col id="save-burn">
      <el-button type="primary">Save</el-button>
      <el-button type="primary">Burn</el-button>
    </el-col>
    <el-col class="exit"><el-button @click="exitS"> Exit </el-button></el-col>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    mnemonic: "mnemonic",
    showMn: false,
  }),
  methods: {
    exitS: function () {
      this.$store.commit("setShowMn", false);
      console.log("showMn", this.$store.state.showMn);
    },
  },
};
</script>