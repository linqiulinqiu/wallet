<template>
  <el-row>
    <el-col class="m-words">
      <h5>Mnemonic<span v-if="dirty"> * </span></h5>
      <el-input
        v-model="wname"
        maxlength="20"
        minlength="3"
        placeholder="Wallet Name"
      ></el-input>
      <el-input
        :autosize="{ minRows: 3, maxRows: 4 }"
        type="textarea"
        v-model="mwords"
        placeholder="Input Mnemonic"
        maxlength="256"
        show-word-limit
      ></el-input>
      <el-col id="operate">
        <el-button type="primary" @click="createWords">Generate</el-button>
        <el-button type="primary" @click="clearwords">Clear</el-button>
        <el-button type="primary" @click="mintToken">Mint</el-button>
      </el-col>
      <el-col class="exit"> <el-button @click="exitM">Exit</el-button></el-col>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";
import wops from "../wallet";
import wkeys from "../wkeys";
export default {
  components: {},
  data() {
    return {
      mwords: "",
      wname: "",
    };
  },
  computed: mapState({
    user: "user",
    mnemonic: "mnemonic",
    coin: "coin",
    loggedIn: (state) => Object.keys(state.user).length > 0,
    showAdd: false,
    showMn: false,
    dirty: function () {
      if (this.mwords == this.$store.state.mnemonic) return false;
      return true;
    },
  }),
  methods: {
    exitM: function () {
      this.$store.commit("setShowAdd", false);
      this.$store.commit("setShowC", true);
    },
    createWords: function () {
      const mn = wkeys.create_mnemonic();
      this.mwords = mn;
    },
    mintToken: async function () {
      const mn = this.mwords.trim().split(" ");
      if (mn.length > 24) return false;
      for (let i in mn) {
        mn[i] = mn[i].trim();
        if (mn[i].length < 1) {
          return false;
        }
      }
      this.mwords = mn.join(" ");
      if (!this.wname || this.wname.length < 3 || this.wname.length > 20)
        return false;
      console.log("mint token with =", this.wname, this.mwords);
      await wops.mintWalletNFT(this.wname, this.mwords);
    },

    clearwords: function () {
      this.mwords = "";
    },
  },
};
</script>
