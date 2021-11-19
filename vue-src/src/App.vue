<template>
  <div id="app">
    <el-container>
      <HeaderBar />
      <el-main class="mainBody">
        <el-row type="flex" align="center" justify="center">
          <MainPanel />
        </el-row>
      </el-main>

      <el-footer style="height: 170px">
        <Links />
        <el-col>
          <p>Copyright©2021 Plot Network</p>
          <p>
            {{ $t("right") }} <br />
            {{ $t("other-right") }}
          </p>
        </el-col>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import HeaderBar from "./components/HeaderBar.vue";
import MainPanel from "./components/MainPanel.vue";
import Links from "./components/Links.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    HeaderBar,
    MainPanel,
    Links,
  },

  computed: mapState({
    baddr: "baddr",
    coin: "coin",
  }),
};
</script>

<style>
a,
p,
div,
.el-input,
.el-row,
.el-button,
.el-select,
.el-input--suffix .el-input__inner {
  font-family: "Courier New", Courier monospace !important;
}
html {
  font-family: "Courier New", Courier monospace;
}
#app {
  font-family: "Courier New", Courier monospace !important;
}
body {
  margin: 0;
  padding: 0;
  background: url(./assets/images/bg1.png) center;
  font-size: 14px;
  font-family: "Courier New", Courier monospace !important;
}
.container {
  position: relative;
}
.el-footer a {
  text-decoration: none;
  color: #d1fcd1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header,
.el-footer {
  position: relative;
  width: 100%;
  background-color: #668b66;
  color: #d1fcd1;
  text-align: center;
  font-size: 12px;
}
.el-header {
  top: 0px;
  padding: 20px 10px 20px 10px;
}
.el-footer {
  bottom: 0px;
}

#token-balance,
#user,
#balance,
#addtoken {
  border: 1px solid #d1fcd1;
  height: 40px;
  line-height: 40px;
  color: #d1fcd1;
  margin-top: 10px;
  border-radius: 5px;
}
#language {
  margin-top: 10px;
}
.el-main {
  /* background-color: #E9EEF3; */
  color: #333;
  text-align: center;
  height: 740px;
  box-sizing: border-box;
  margin-top: 50px;
}

.chia,
.chives {
  width: 150px;
  background-color: #baccba;
  border: 1px solid #d1fcd1;
  font-size: 18px;
}
/* 页面主体部分 */

.mainBody > .el-row {
  height: 550px;
  margin: 0px auto;
}
</style>