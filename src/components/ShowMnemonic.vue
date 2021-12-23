<template>
  <el-col class="m-words">
    <el-col id="m-name">
      <p>
        <span> name:</span>
        <el-input
          size="small"
          maxlength="20"
          minlength="1"
          v-model="mName"
          :disabled="disabled"
          :placeholder="mnName"
        ></el-input>
        <el-button size="small" @click="editName">Edit</el-button>
      </p>
    </el-col>
    <el-col id="show-w" :span="22" :offset="2">{{ mnemonic }}</el-col>
    <el-col id="save-burn">
      <el-button type="primary">Save</el-button>
      <el-button type="primary">Burn</el-button>
    </el-col>
    <el-col class="exit"><el-button @click="exitS"> Exit </el-button></el-col>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    mnemonic: "mnemonic",
    showMn: false,
    mnName: "mnName",
  }),
  data() {
    return {
      mName: "",
      disabled: true,
    };
  },
  methods: {
    exitS: function () {
      this.$store.commit("setShowMn", false);
    },
    editName: function () {
      this.disabled = false;
      this.$store.commit("setMnName", this.mName);
    },
  },
};
</script>