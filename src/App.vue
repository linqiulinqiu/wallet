<template>
  <div id="app">
    <el-container>
      <Mnemonic />
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Mnemonic from "./components/Mnemonic.vue";

export default {
  name: "App",
  components: { Mnemonic },

  computed: mapState({}),
};
</script>

<style>
#app {
  font-family: "Courier New", Courier monospace !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
/* ul li {
  list-style: none;
} */
.aa {
  height: 400px;
  margin-top: 50px;
  border: 1px solid #000;
  padding: 20px;
}
</style>