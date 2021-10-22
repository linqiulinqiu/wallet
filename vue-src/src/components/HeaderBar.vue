<template>
      <el-header>
        <el-row :gutter="20" type="flex" align="center">
          <el-col :span='4' id="logo">
            </el-col>
          <el-col :span='1'>{{$t("version")}} 10/22-1</el-col>
          <el-col :span='1' :offset="13">
            <div id="token-balance">
              {{$t("connect-wallet") }} <span id="token-balance">{{$t("balance")}}</span></div>
          </el-col>
          <el-col :span='3'>
            <div id="user">user</div>
          </el-col>
          <el-col :span='3'>
            <el-select v-model="lang">
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
import { setup } from '../locales'
export default {
  name: 'HeaderBar',
  data(){
    return{
      options:[{
        value:'en',
        label:'English'
      },{
        value:'zh',
        label:'简体中文'
      }],
      lang:'en'
    }
  },
  watch: {
      lang: function(){
        setup(this.lang)
      }
  }
}
</script>
