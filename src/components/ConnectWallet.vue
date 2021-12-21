<template>
  <el-col>
    <template v-if="loggedIn">
        <p>
          <el-button @click="encode">Encode</el-button>
          <el-button @click="decode">Decode</el-button>
          <span>{{ user.get('ethAddress') }}</span>
        </p>
        <el-col> <SelectCoin /></el-col>
        <el-col>
            <el-button @click="loadWallets">Load Wallets</el-button>
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
import SelectCoin from "./SelectCoin.vue";
export default {
  components: { SelectCoin },
  computed: mapState({
    user: "user",
    mnemonic: "mnemonic",
    coin: "coin",
    loggedIn: state => Object.keys(state.user).length>0
  }),
  data() {
    return {
      secret: ""
    };
  },

  methods: {
    connect: function () {
      wops.connect(this.$store.commit);
    },
    loadWallets: async function () {
        const nfts = await wops.getWalletNFTs()
        console.log('nfts', nfts)
        this.$store.commit('setWalletNFTs', nfts)
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
      const dec = await wops.decodeMn(en)
      console.log("decoded mnemonic", dec);
    },
  },
};
</script>
