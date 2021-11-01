<template>
  <div id="app">
    <el-container>
      <HeaderBar />
      <SwitchCoin />
      <el-main class="mainBody">
        <el-row  type="flex" align="center" justify="center">
          <MainPanel />
        </el-row>
      </el-main>

      <el-footer style="height:80px">
        <el-row type="flex"  justify="center">
          <el-col :lg='3' :xs="3"  class="contact-us">
            <a href="" target="_blank">{{$t('contact-us')}}</a>
          </el-col>
          <el-col :lg='6' :xs="10" class="link-lp" :offset="5"> 
            <p>{{$t('links')}}
              <a href="https://pancake.kiemtienonline360.com/#/add/BNB/0x2077bFC955E9fBA076CA344cD72004C6c4a80a09" target="_blank">
              {{$t('xcc-lp')}}</a>
              <a href="https://pancake.kiemtienonline360.com/#/add/BNB/0x134315EF3D11eEd8159fD1305af32119a046375A" target="_blank">
              {{$t('xch-lp')}}</a>
            </p>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import HeaderBar from './components/HeaderBar.vue'
import MainPanel from './components/MainPanel.vue'
import SwitchCoin from './components/SwitchCoin.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    HeaderBar,
    MainPanel,
    SwitchCoin
  },
  
  computed: mapState({
      baddr: 'baddr'
  }),

}

</script>

<style>
  body{
    margin: 0;
    padding: 0;
    background: url(./assets/images/bg1.png) center ;
  }
  .container{
    position: relative;
  }
  .el-footer a{
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
  .el-header, .el-footer {
    position: relative;
    width: 100%;
    background-color: #668b66;
    color: #333;
    text-align: center;
  }
  .el-header{
    top: 0px;
    padding: 20px 10px 20px 10px;
  }
  .el-footer{
   bottom: 0px;
 } 
  .el-footer p{
   color: #d1fcd1;
 }
 .contact-us{
   float: left;
   line-height: 80px;
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
    height: 740px;
    box-sizing: border-box;
    margin-top: 50px;
  }
  
  .chia,.chives{
    width: 150px;
    background-color: #baccba;
    border: 1px solid #d1fcd1;
    font-size: 18px;
  }
  /* 页面主体部分 */
  
  .mainBody>.el-row{
    height: 550px;
    margin: 0px auto;
  }
</style>