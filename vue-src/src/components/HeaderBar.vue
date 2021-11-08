<template>
  <el-header style="height: 100px">
    <el-row :gutter="10" type="flex" align="center">
      <el-col :lg="4" :sm="6" :xs="7" id="logo">
        <img src="../assets/images/plotbridge-logo.svg" alt="plotbridge" />
      </el-col>
      <el-col :lg="10" :sm="1" :xs="0">{{ $t("version") }} 11/8-2</el-col>

      <el-col :lg="3" :md="3" :sm="5" :xs="5">
        <SelectCoin />
      </el-col>
      <el-col :lg="3" :md="3" :sm="3" :xs="5">
        <div id="token-balance">
          <span v-if="!baddr">{{ $t("no-connect") }}</span>
          <span v-else>{{
            baddr.substr(0, 6) + "..." + baddr.substr(-4, 4)
          }}</span>
        </div>
      </el-col>

      <el-col :lg="4" :md="3" :sm="4" :xs="7" v-if="baddr" id="balance">
        <Xbalance />
      </el-col>
      <el-col :lg="2" :md="3" :sm="4" :xs="4" id="language">
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
import { mapState } from "vuex";
import { i18n, setup } from "../locales";
import Xbalance from "./Xbalance.vue";
import SelectCoin from "./SelectCoin.vue";
export default {
  name: "HeaderBar",
  components: {
    SelectCoin,
    Xbalance,
  },
  data() {
    return {
      options: [
        {
          value: "en",
          label: "English",
        },
        {
          value: "zh",
          label: "简体中文",
        },
      ],
      lang: i18n.locale,
    };
  },
  computed: mapState({
    baddr: "baddr",
    xbalance: "xbalance",
    coin: "coin",
  }),
  watch: {
    lang: function () {
      setup(this.lang);
    },
  },
};
</script>
<style>
#logo img {
  position: relative;
  top: 10px;
  width: 100%;
}
#addtoken .el-button {
  color: #d1fcd1;
  background-color: #668b66;
  border: none;
}
#balance {
  margin-right: 10px;
}
#token-balance {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
