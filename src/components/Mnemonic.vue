<template>
  <el-row>
    <el-col class="m-words">
      <span v-if="dirty">*</span>
      <h5>Mnemonic</h5>
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
        <el-button type="primary" @click="onSubmit">Mint</el-button>
      </el-col>
      <el-col class="exit"> <el-button @click="exitM">Exit</el-button></el-col>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";

import wkeys from "../wkeys";
export default {
  components: {},
  data() {
    return {
      mwords: "",
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
  data() {
    return {
      mwords: "",
    };
  },
  // computed: mapState({
  //   user: "user",
  //   mnemonic: "mnemonic",
  //   coin: "coin",
  //   loggedIn: (state) => Object.keys(state.user).length > 0,
  //   // dirty: function () {
  //   //   if (this.mwords == this.$store.state.mnemonic) return false;
  //   //   return true;
  //   // },
  // }),
  methods: {
    exitM: function () {
      this.$store.commit("setShowAdd", false);
    },
    createWords: function () {
      const mn = wkeys.create_mnemonic();
      this.mwords = mn;
    },
    onSubmit: async function () {
      const mn = this.mwords.trim().split(" ");
      if (mn.length > 24) return false;
      for (let i in mn) {
        mn[i] = mn[i].trim();
        if (mn[i].length < 1) {
          return false;
        }
      }
      this.mwords = mn.join(" ");
      this.$store.commit("setMnemonic", this.mwords);
    },

    clearwords: function () {
      this.mwords = "";
    },
    // popDialog: function () {
    //   this.mwords = this.$store.state.mnemonic;
    //   this.dialogFormVisible = true;
    // },
    // handleClose(done) {
    //   if (this.dirty) {
    //     this.$confirm("确认退出？")
    //       .then((_) => {
    //         done();
    //       })
    //       .catch((_) => {});
    //   } else {
    //     done();
    //   }
    // },
  },
};
</script>
