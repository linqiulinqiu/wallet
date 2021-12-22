<template>
  <el-col>
    <el-col id="w-info">
      <el-button size="mini" class="el-icon-close" type="primary"></el-button>
      <el-button size="mini" type="primary" @click="showMn">info</el-button>
    </el-col>
    <p>Receive Address:</p>
    <el-col class="ss"> </el-col>
    <el-col>
      <p>Acount Balance: <span>{{}}</span></p>
      <p>Spendable: <span>{{}}</span></p>
    </el-col>
    <el-col v-if="false">
      <el-input type="text" style="width: 80%"></el-input>
      <el-button>Send</el-button> <br />
      <el-input type="text" style="width: 200px"></el-input>
      <span>Fee/Amount</span>
    </el-col>
    <el-col v-if="this.$store.state.showMn"><ShowMnemonic /></el-col>
  </el-col>
</template>

<script>
import ShowMnemonic from "./ShowMnemonic.vue";
export default {
  components: {
    ShowMnemonic,
  },
  methods: {
    showMn: function () {
      this.$store.commit("setShowMn", true);
    },
  },
};
</script>