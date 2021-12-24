<template>
  <el-col>
    <template v-if="loggedIn">
      <el-col>
        <el-col class="ss">
          <el-button @click="encode">Encode</el-button>
          <el-button @click="decode">Decode</el-button>
          <p>
            <span>{{ user.get("ethAddress") }}</span>
          </p>
          <el-col>
            <el-button @click="loadWallets">Load Wallets</el-button>
          </el-col>
        </el-col>
        <el-col class="ss" v-if="this.$store.state.showC">
          <div id="refresh">
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
                <el-button @click="openNFT(item)" size="medium">
                  {{ item.token_id }}
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

  data() {
    return {
      secret: "",
      nfts: [],
    };
  },

  methods: {
    loadList: async function () {
      const nfts = await wops.getWalletNFTs();
      this.$store.commit("setWalletNFTs", nfts);
      console.log("nfts", nfts);
    },
    addNFT: function () {
      this.$store.commit("setShowAdd", true);
      this.$store.commit("setShowC", false);
    },
    openNFT: function (item) {
      console.log("opennft", item);
      this.$store.commit("setShowWa", true);
      this.$store.commit("setShowC", false);
    },
    connect: function () {
      wops.connect(this.$store.commit);
    },
    loadWallets: async function () {
      const nfts = await wops.getWalletNFTs();
      console.log("nfts", nfts);
      this.$store.commit("setWalletNFTs", nfts);
      this.$store.commit("setShowC", true);
    },
    encode: async function () {
      const mn = this.$store.state.mnemonic;
      console.log("mnemonic from", mn);
      const enc = await wops.encodeMn(mn);
      console.log("encoded mnemonic", enc);
      this.secret = enc;
    },
    decode: async function () {
      const en = this.secret;
      console.log("encoded =", en);
      const dec = await wops.decodeMn(en);
      console.log("decoded mnemonic", dec);
    },
  },
};
</script>
