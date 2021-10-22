<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row :gutter="20" type="flex" align="center">
    <!-- logo部分 -->
          <el-col :span='4' id="logo">
            </el-col>
    <!-- 余额部分 -->
          <el-col :span='1'>版本号:10/22-1</el-col>
          <el-col :span='1' :offset="13">
            <div id="token-balance">
              banlance: <span id="token-balance">余额</span></div>
          </el-col>
    <!-- 账户部分 -->
          <el-col :span='3'>
            <div id="user">user</div>
          </el-col>
    <!-- 语言部分 -->
          <el-col :span='3'>
            <el-select placeholder="set language" id='setLanguage'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-header>

      <el-main class="mainBody">
        <el-row type="flex" align="center" justify="center">
          <el-col :span='8'>
  <!-- 链接钱包 -->
          <ConnectWallet />
  <!-- 存款地址 -->
          <Tab />
          <!-- <DepositAddr /> -->
  <!-- 绑定地址 -->
          <!-- <WithdrawAddr />  -->
  <!-- 取款金额 -->
          <!-- <WithdrawBurn /> -->
          </el-col>
          
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
import ConnectWallet from './components/ConnectWallet.vue'
// import DepositAddr from './components/DepositAddr.vue'
// import WithdrawAddr from './components/WithdrawAddr.vue'
// import WithdrawBurn from './components/WithdrawBurn.vue'

import Tab from './components/Tab.vue'

export default {
  name: 'App',
  components: {
    ConnectWallet,
    // DepositAddr,
    // WithdrawAddr,
    // WithdrawBurn,
    Tab
  },
  // 语言设置
  value:'100',
  data(){
    return{
      options:[{
        value:'language 1',
        label:'English'
      },{
        value:'language 2',
        label:'简体中文'
      }]
    }
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
