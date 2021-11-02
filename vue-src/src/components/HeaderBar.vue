<template>
      <el-header style="height:100px">
        <el-row :gutter="10" type="flex" align="center">
          <el-col :lg='2'  :sm="6" :xs="7" id="logo" style="transform: rotate(45deg)">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <rect x="0" y="48" width="42" height="42" rx="4" ry="4" style="fill:rgb(80,190,90)" />
            <rect x="96" y="48" width="42" height="42" rx="4" ry="4" style="fill:rgb(80,190,90)" />
            <rect x="48" y="0" width="42" height="42" rx="4" ry="4" style="fill:rgb(80,190,90)" />
            <rect x="48" y="96" width="42" height="42" rx="4" ry="4" style="fill:rgb(80,190,90)" />      
            <rect x="21" y="21" width="96" height="96" rx="4" ry="4" style="fill:none;stroke:rgb(80,190,90);stroke-width:2"/>
            </svg>
          </el-col>
          <el-col :lg='13'  :sm="5" :xs="0">{{$t("version")}} 11/2-1</el-col>
          
          <el-col :lg="3" :md="3" :sm="4" :xs="5">
            <div id="token-balance">
              <span v-if="!baddr">{{ $t('no-connect') }}</span>
              <span v-else>{{ baddr.substr(0,6)+'...'+baddr.substr(-4,4) }}</span>
            </div>
          </el-col>

          <el-col :lg="3" :md="3" :sm="3" :xs="7" v-if="baddr" class="balance">
            {{xbalance}} P{{coin}}
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
// import SwitchCoin from "./SwitchCoin.vue"
export default {
  name: 'HeaderBar',
  // components:{
  //   SwitchCoin
  // },
  data(){
    return{
      options:[{
        value:'en',
        label:'English'
      },{
        value:'zh',
        label:'简体中文'
      }],
      lang: i18n.locale
    }
  },
  computed: mapState({
      baddr: 'baddr',
      xbalance: 'xbalance',
      coin: 'coin'
    }),
  watch: {
      lang: function(){
        setup(this.lang)
      },
      // ellipsis_baddr:function(){
      //   var baddrb = this.baddr.slice(0,6)+'...'+this.baddr.slice(this.baddr.length-4,this.baddr.length)
      //   return baddrb
      // }
  }
}
</script>
<style>
#logo svg{
  position: relative;
  top: 10px;
}
#token-balance{
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.balance{
  color: #d1fcd1;
  border: #d1fcd1 1px solid;
  height: 40px;
  margin-top: 10px;
  border-radius: 5px;
  line-height: 40px;
  font-size: 12px;
}
</style>
