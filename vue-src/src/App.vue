<template>
  <div id="app">
    <el-container>
      <el-head>
        <el-row :gutter="20" type="flex" align="center">
    <!-- logo部分 -->
          <el-col :span='4'>
            <div>logo</div>
            </el-col>
    <!-- 余额部分 -->
          <el-col :span='1'>版本号:10/21-1</el-col>
          <el-col :span='1' :offset="13">
            <div>banlance</div>
          </el-col>
    <!-- 账户部分 -->
          <el-col :span='3'>
            <div>user</div>
          </el-col>
    <!-- 语言部分 -->
          <el-col :span='3'>
            <div>language</div>
          </el-col>
        </el-row>
      </el-head>

      <el-main>
        <el-row type="flex" align="center" justify="center">
          <el-col :span='8'>
  <!-- 链接钱包 -->
          <ConnectWallet />
  <!-- 存款地址 -->
          <DepositAddr />
  <!-- 绑定地址 -->
          <WithdrawAddr />
  <!-- 取款金额 -->
          <WithdrawBurn />
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
import DepositAddr from './components/DepositAddr.vue'
import WithdrawAddr from './components/WithdrawAddr.vue'
import WithdrawBurn from './components/WithdrawBurn.vue'

export default {
  name: 'App',
  components: {
    ConnectWallet,
    DepositAddr,
    WithdrawAddr,
    WithdrawBurn
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
  
</style>
