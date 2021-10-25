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
          <el-col :span='3'><div> {{$t('contact-us')}}</div></el-col>
          <el-col :span='5' :offset="15">
            <p>{{$t('links')}}<a href="#">{{$t('xcc-lp')}}</a><a href="">{{$t('xch-lp')}}</a></p>
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
  body{
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .el-header, .el-footer {
    width: 100%;
    background-color: #668b66;
    color: #333;
    text-align: center;
  }
  .el-header{
    padding: 10px;
  }
 .el-footer{
   margin-bottom: 0px;
 } 
  #token-balance,#user{
    border: 1px solid #d1fcd1;
    height: 40px;
    line-height: 40px;
    color: #d1fcd1;
    margin-top: 10px;
    border-radius: 5px;
  }
  #language{
    margin-top: 10px;
  }
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    height: 810px;
  }
  /* logo */
  #logo{
    background:url("./assets/images/logo-bridge.png") no-repeat center;
    background-size: 100% 200%;
  }
  /* 页面主体部分 */
  
  .mainBody>.el-row{
    height: 500px;
    margin-top: 150px;
  }
  
</style>
