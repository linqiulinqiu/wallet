<template>
      <el-header>
        <el-row :gutter="20" type="flex" align="center">
          <el-col :span='4' id="logo">
            </el-col>
          <el-col :span='1'>版本号:10/22-1</el-col>
          <el-col :span='1' :offset="13">
            <div id="token-balance">
              balance: <span id="token-balance">余额</span></div>
          </el-col>
          <el-col :span='3'>
            <div id="user">user</div>
          </el-col>
          <el-col :span='3'>
            <el-select v-model="value">
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
</template>

<script>
export default {
  name: 'HeaderBar',
  data(){
    return{
      options:[{
        value:'lang-en',
        label:'English'
      },{
        value:'lang-zh',
        label:'简体中文'
      }],
      value:'lang-en'
    }
  }
}
</script>
