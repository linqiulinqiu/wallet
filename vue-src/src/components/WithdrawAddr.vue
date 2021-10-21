<template>
    <el-container>
    <el-header>
      <el-row type="flex" align="center" justify="center">
        <el-col :span="12"><div>Deposit</div></el-col>
        <el-col :span="12"><div>Withdraw</div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div>
          <el-input v-model="input" placeholder="please import the address" suffix-icon="el-icon-edit"></el-input>
          <el-button>Bind address</el-button>
          <p>Binding,please wait.</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>

export default {
  
  data() {
    return {
      input: ''
    }
  }
}
</script>