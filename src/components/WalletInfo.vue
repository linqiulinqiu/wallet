<template>
  <el-col>
    <el-col class="aa">
      <el-col id="w-info">
        <el-button
          size="mini"
          class="el-icon-close"
          type="primary"
          @click="exitW"
        ></el-button>
        <el-button size="mini" type="primary" @click="showMn">info</el-button>
      </el-col>
      <p>Receive Address:</p>
      <el-row class="sss" type="flex" align="middle">
        <el-col :span="2"
          ><el-button
            size="mini"
            class="el-icon-document-copy el-icon-document-checked"
          ></el-button
        ></el-col>
        <el-col id="addrdata" :span="20">
          <el-col>
            <el-carousel trigger="click" height="100px" :autoplay="false">
              <el-carousel-item
                v-for="(item, index) in this.$store.state.addrInfo"
                :key="index"
              >
                <el-col id="banner">
                  <p>{{ item.address }}</p>
                  <p>balance:{{ item.balance }}</p>
                  <!-- <p>update at:{{ item.time }}</p> -->
                </el-col>
              </el-carousel-item>
            </el-carousel>
          </el-col>  
        </el-col>
      </el-row>
      <el-col>
        <p>Account Balance: <span>{{}}</span></p>
        <p>Spendable: <span>{{}}</span></p>
      </el-col>
      <el-col v-if="false">
        <el-input type="text" style="width: 80%"></el-input>
        <el-button>Send</el-button> <br />
        <el-input type="text" style="width: 200px"></el-input>
        <span>Fee/Amount</span>
      </el-col>
    </el-col>

    <el-col v-if="this.$store.state.showMn"><ShowMnemonic /></el-col>
  </el-col>
</template>

<script>
import ShowMnemonic from "./ShowMnemonic.vue";
import { mapState } from "vuex";
export default {
  components: {
    ShowMnemonic,
  },
  computed: mapState({
    walletNFTs: [],
    addrInfo: [],
  }),
  data() {
    return {};
  },
  methods: {
    showMn: function () {
      this.$store.commit("setShowMn", true);
    },
    exitW: function () {
      this.$store.commit("setShowWa", false);
      this.$store.commit("setShowC", true);
      this.$store.commit("setShowMn", false);
    },
  },
};
</script>