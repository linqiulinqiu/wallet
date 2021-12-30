<template>
  <el-col>
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

          <div id="m-list">
            <ul>
              <li
                :key="index"
                v-for="(item, index) in this.$store.state.walletNFTs"
              >
                <el-dialog :visible.sync="showDialog" title="User">
                  <el-button @click="openNFT(curNFT)" size="medium">
                    Open
                  </el-button>
                  <el-button @click="removeNFT(curNFT)" size="medium"
                    >Remove</el-button
                  >
                  <el-button @click="showTransfer = true" size="medium"
                    >Transfer</el-button
                  >
                </el-dialog>
                <el-button @click="dialogVisible(item)">{{
                  item.token_id
                }}</el-button>
              </li>
            </ul>

            <el-button
              size="small"
              class="el-icon-plus"
              @click="addNFT"
            ></el-button>
          </div>
          <el-col>
            <el-dialog
              width="90%"
              :visible.sync="showTransfer"
              title="Transfer Wallet"
            >
              <p>
                Transfer Address:<span
                  >(Please ensure the address is correct!)</span
                >
              </p>
              <el-input
                v-model="transAddr"
                placeholder="Input Address"
              ></el-input>
              <el-button @click="transNFT(curNFT, transAddr)">Sure</el-button>
            </el-dialog>
          </el-col>
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
    curNFT: {},
    loggedIn: (state) => Object.keys(state.user).length > 0,
  }),
  data() {
    return {
      secret: "",
      nfts: [],
      showDialog: false,
      showTransfer: false,
      transAddr: "",
    };
  },

  methods: {
    dialogVisible: function (item) {
      this.showDialog = true;
      this.$store.commit("setCurNFT", item);
    },
    loadList: async function () {
      const nfts = await wops.getWalletNFTs();
      this.$store.commit("setWalletNFTs", nfts);
      console.log("nfts", nfts);
    },
    addNFT: function () {
      this.$store.commit("setShowAdd", true);
      this.$store.commit("setShowC", false);
    },
    transNFT: async function (curNFT, transAddr) {
      curNFT = this.$store.state.curNFT;
      transAddr = this.transAddr;
      console.log("transAddr=", transAddr, typeof transAddr);
      this.showDialog = false;
      console.log("transfor NFT", curNFT.token_id);
      if (transAddr != "") {
        try {
          await wops.transferNFT(curNFT, transAddr);
        } catch (e) {
          if (e.code == 32602) {
            this.$message(
              "Invalid parameters: must provide an Ethereum address."
            );
          }
          console.log("eeee", e);
        }
      } else {
        this.$message("please input the correct address");
      }
    },
    removeNFT: async function (curNFT) {
      this.showDialog = false;
      curNFT = this.$store.state.curNFT;
      const nfts = this.$store.state.walletNFTs;
      let token_id = curNFT.token_id;
      await wops.burnNFT(curNFT);
      for (let i = 0; i < nfts.length; i++) {
        if (nfts[i].token_id === token_id) {
          nfts.splice(i, 1);
          this.$store.commit("setWalletNFTs", nfts);
        }
      }
    },
    openNFT: async function (curNFT) {
      curNFT = this.$store.state.curNFT;
      console.log("opennft", curNFT);
      const w = await wops.getNFTMnemonic(curNFT);
      this.showDialog = false;
      this.$store.commit("setMnemonic", w);
    },
    connect: async function () {
      wops.connect(this.$store.commit);
      const nfts = await wops.getWalletNFTs();
      console.log("nfts", nfts);
      this.$store.commit("setWalletNFTs", nfts);
      this.$store.commit("setShowC", true);
    },
    // imgurl: async function (item) {
    //   const meta = item.metadata;
    //   const url = JSON.parse(meta).image;
    //   const axios = require("axios");
    //   const axurl = await axios.create({
    //     baseURL: "https://xwt-info.plotbridge.io",
    //   });
    //   const img = await axurl.get(url.substr(30, url.length));
    //   const imgs = img.data.substr(137, img.data.length);
    //   console.log("imgs", imgs);
    //   this.imgurll = imgs;
    //   console.log("imgurls", this.imgurll);
    //   return this.imgurll;
    // },
  },
};
</script>
