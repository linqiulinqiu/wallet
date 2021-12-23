<template>
  <el-col class="m-words">
    <h5>The Mnemonic</h5>
    <el-col id="m-name">
      <p>
        name: <span>{{ wname }}</span>
      </p>
    </el-col>
    <el-col id="show-w" :span="22" :offset="2">{{ mnemonic }}</el-col>
    <el-col id="burn">
      <el-button>Burn</el-button>
      <el-button @click="exitS" type="primary"> Exit </el-button>
    </el-col>
    <el-col class="exit"></el-col>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
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
  },
};
</script>