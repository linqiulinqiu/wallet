<template>
  <el-row id="history">
    <el-col id="history-info">
      <el-button
        type="primary"
        id="banner-pre"
        :disabled="disabled_p"
        @click="preAddr"
        >&lt;</el-button
      >
      <el-button
        type="primary"
        id="banner-next"
        :disabled="disabled_n"
        @click="nextAddr"
        >&gt;</el-button
      >

      <el-col id="banner">
        <el-col id="banner-top">
          <ul>
            <li v-for="item of history" :key="item.address">
              <p>address:{{ item.address }}</p>
              <p>balance:{{ item.balance }}</p>
              <p>update at:{{ item.time }}</p>
            </li>
          </ul>
        </el-col>

        <el-col id="banner-bottom">
          <ul>
            <li v-for="item of history" :key="item.address"></li>
          </ul>
        </el-col>
      </el-col>
    </el-col>
    <div>Total Balnce:</div>
  </el-row>
</template>
<script>
import { mapState } from "vuex";
import wkeys from "../wkeys";

export default {
  name: "history",
  components: {},
  computed: mapState({
    curIndex: {
      get() {
        return this.$store.state.curIndex;
      },
    },
  }),
  data() {
    var history = [];
    for (var i = 0; i <= 10; i++) {
      var item = {};
      item.address = "address" + i;
      item.balance = "balance" + i;
      item.time = "time" + i;
      history.push(item);
    }
    return {
      history: history,
      disabled_p: true,
      disabled_n: false,
    };
  },
  methods: {
    preAddr: function (index) {
      this.curindex = index;
      for (index in this.history) {
        if (index > 1) {
          this.disabled_p = false;
        }
      }
    },
    nextAddr: function (index) {
      this.curindex = index;
      for (index in this.history) {
        if (index >= history.length) {
          this.disabled_n = true;
        } else {
          this.disabled_n = false;
        }
      }
    },
  },
};
</script>

