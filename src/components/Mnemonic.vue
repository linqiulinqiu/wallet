<template>
  <el-row>
    <el-col id="m-words">
      <el-button @click="dialogFormVisible = true"
        >To Validate Mnemonic</el-button
      >
      <el-dialog title="Validate Mnemonic" :visible.sync="dialogFormVisible">
        Mnemonic:
        <el-input type="textarea" v-model="mnemonic"></el-input>

        <el-button type="primary" v-on:click="createWords">Generate</el-button>
        <el-button type="primary" @click="onSubmit">Save</el-button>
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  computed: mapState({
    mnemonic: {
      get() {
        return this.$store.state.mnemonic;
      },
      set(aa) {
        this.$store.commit("setMnemonic", aa);
      },
    },
  }),

  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    onSubmit: function () {
      this.dialogFormVisible = false;
    },
    createWords: function () {
      const aa = "1" + "2" + "3" + "4" + "5" + "6" + "7" + "8";
      this.$store.commit("setMnemonic", aa);
      console.log(aa);
    },
  },
};
</script>
