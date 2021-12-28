<template>
  <el-col>
    <div></div>
    <template v-if="loggedIn">
      <el-col>
        <el-col v-if="this.$store.state.showC">
          <div id="refresh">
            <span>{{
              user.get("ethAddress").substr(0, 6) +
              "..." +
              user.get("ethAddress").substr(-4, 4)
            }}</span>
            <el-button
              circle
              class="el-icon-refresh"
              size="small"
              @click="loadList"
            ></el-button>
          </div>
          <div class="as">
            <svg v-html="imgurll"></svg>
          </div>

          <div id="m-list">
            <ul>
              <li
                :key="index"
                v-for="(item, index) in this.$store.state.walletNFTs"
              >
                <el-button @click="openNFT(item)" size="medium">
                  <span></span>
                  <span v-if="item.metadata == null">{{ item.token_id }}</span>
                  <span v-else>
                    <svg v-html="imgurll"></svg>
                    <!-- {{ JSON.parse(item.metadata).image }} -->
                  </span>
                </el-button>
              </li>
            </ul>
            <el-button
              size="small"
              class="el-icon-plus"
              @click="addNFT"
            ></el-button>
          </div>
        </el-col>
        <el-col v-if="this.$store.state.showAdd"><MintNFT /></el-col>
        <el-col v-if="this.$store.state.showWa"><WalletInfo /> </el-col>
      </el-col>
    </template>
    <template v-else>
      <el-button type="primary" @click="connect">Connect Wallet</el-button>
    </template>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
import wops from "../wallet";
import MintNFT from "./MintNFT.vue";
import WalletInfo from "./WalletInfo.vue";

export default {
  components: { MintNFT, WalletInfo },
  computed: mapState({
    walletNFTs: [],
    user: "user",
    mnemonic: "mnemonic",
    coin: "coin",
    loggedIn: (state) => Object.keys(state.user).length > 0,
    showAdd: false,
    showMn: false,
    showC: true,
  }),
  watch: {
    imgurll() {
      this.imgurl(item);
    },
  },
  data() {
    return {
      secret: "",
      nfts: [],
      imgurll: "",
    };
  },

  methods: {
    imgurl: async function (item) {
      const meta = item.metadata;
      const url = JSON.parse(meta).image;
      const axios = require("axios");
      const axurl = await axios.create({
        baseURL: "https://xwt-info.plotbridge.io",
      });

      const img = await axurl.get(url.substr(30, url.length));
      // .then(async function () {
      const imgs = img.data.substr(137, img.data.length);
      console.log("imgs", imgs);
      this.imgurll = imgs;
      console.log("imgurls", this.imgurll);

      return this.imgurll;
      // }
      // })
      // .catch((err) => console.log(err));

      // });
      // console.log("img", img.data);
    },
    loadList: async function () {
      const nfts = await wops.getWalletNFTs();
      this.$store.commit("setWalletNFTs", nfts);
      console.log("nfts", nfts);
      // for (item in this.$store.state.walletNFTs) {
      // const metadata = JSON.parse(this.$store.state.walletNFTs.metadata);
      // console.log(metadata);
      // }
    },
    addNFT: function () {
      this.$store.commit("setShowAdd", true);
      this.$store.commit("setShowC", false);
    },
    openNFT: async function (item) {
      console.log("opennft", item);
      // const obj = JSON.parse(item.metadata);
      const w = await wops.getNFTMnemonic(item);
      this.$store.commit("setMnemonic", w);
      this.$store.commit("setShowWa", true);
      this.$store.commit("setShowC", false);
    },
    connect: async function () {
      wops.connect(this.$store.commit);
      const nfts = await wops.getWalletNFTs();
      console.log("nfts", nfts);
      this.$store.commit("setWalletNFTs", nfts);
      this.$store.commit("setShowC", true);
    },
  },
};
</script>
