<template>
  <div id="app">
    <el-container>
      <HeaderBar />
      <el-main class="mainBody">
        <el-row type="flex" align="center" justify="center">
          <MainPanel />
        </el-row>
      </el-main>

      <el-footer>
        <el-row>
          <el-col :span='3'><div> contact us </div></el-col>
          <el-col :span='5' :offset="15">
            <p>links:<a href="#">xcc lp</a><a href="">xch lp</a></p>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import MainPanel from './components/MainPanel.vue'

export default {
  name: 'App',
  components: {
    HeaderBar,
    MainPanel 
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  div{
    border: #2c3e50 1px solid;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  /* logo */
  #logo{
    background:url("./assets/images/logo-bridge.png") no-repeat center;
    background-size: 100% 200%;
  }
  /* 页面主体部分 */
  
  .mainBody>.el-row{
    height: 500px;
  }
  
</style>
