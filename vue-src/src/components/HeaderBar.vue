<template>
      <el-header style="height:100px">
        <el-row :gutter="10" type="flex" align="center">
          <el-col :lg='4'  :sm="6" :xs="8" :offset="1" id="logo" >
            </el-col>
          <el-col :lg='1'  :sm="1" :xs="1">{{$t("version")}} 10/28-2</el-col>
          
          <el-col :lg="6" :md="6" :sm="7" :xs="8" :offset="4">
            <div id="token-balance">
              <p v-if="!baddr">{{ $t('no-connect') }}</p>
              <p v-else-if="xbalance>=0">{{baddr}}</p>
              <p v-else>{{ baddr }}</p>
            </div>
          </el-col>

          <el-col :lg="2" :md="2" :sm="2" :xs="2">
            <div v-if="baddr" class="balance">
              {{$t('balance')}}{{xbalance}}
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
  // filters:{
  //     ellipsis () {
  //       const baddr = toString(baddr)
  //       console.log(toString(baddr))
  //       let len = baddr.length
  //       if(!baddr) return""
  //       if (baddr) {
  //         return baddr.substring(0,18)+"..."+baddr.substring(len-18,len)
  //       }
  //       return baddr
  //     }
  //   },
  watch: {
      lang: function(){
        setup(this.lang)
      },
      ellipsis_baddr:function(){
        var baddrb = this.baddr.slice(0,6)+'...'+this.baddr.slice(this.baddr.length-4,this.baddr.length)
        return baddrb
      }
  }
}
</script>
<style>
#token-balance{
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
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
