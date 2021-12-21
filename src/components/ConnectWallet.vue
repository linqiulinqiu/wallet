<template>
  <el-col>
    <el-button v-if="!xaddr" type="primary" @click="connect"
      >Connect Wallet</el-button
    >
    <p v-if="xaddr">{{ xaddr }}</p>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    xaddr: "xaddr",
  }),
  data() {
    return {
      xaddr1: this.xaddr,
    };
  },
  methods: {
    connect: function () {
      const addr1 = "xchdfghjkl4d6fv4798edfv79edv48d";
      this.$store.commit("setXaddr", addr1);
      console.log(this.$store.state.xaddr);
    },
  },
};
</script>