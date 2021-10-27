<template>
      <el-header style="height:80px">
        <el-row :gutter="10" type="flex" align="center">
          <el-col :lg='4'  :sm="6" :xs="8" :offset="1" id="logo" >
            </el-col>
          <el-col :lg='1'  :sm="1" :xs="1">{{$t("version")}} 10/27-1</el-col>
          
          <el-col :lg="6" :md="8" :sm="12" :xs="14" :offset="6">
            <div id="token-balance">
              <p v-if="!baddr">{{ $t('no-connect') }}</p>
              <p v-else-if="xbalance>=0">{{ baddr }}({{xbalance}})</p>
              <p v-else>{{ baddr}}</p>
            </div>
          </el-col>
          
          <el-col :lg='2' :md="3" :sm="3" :xs="4" id="language">
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
import { mapState } from 'vuex' 
import { i18n, setup } from '../locales'
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
      lang: i18n.locale,
    }
  },
  computed: mapState({
      baddr: 'baddr',
      xbalance: 'xbalance'
    }),
  watch: {
      lang: function(){
        setup(this.lang)
      }
  }
}
</script>
<style>
#token-balance p{
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
}
</style>
