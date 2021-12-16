<template>
  <el-row id="history">
    <el-col id="history-info">
      <div id="history-addr" v-for="node of list" :key="node.address">
        <p>adress:{{ node.address }}</p>
        balance:{{ node.balance }}
        <p>update at:{{ node.update }}</p>
      </div>
      <el-pagination
        background
        layout="prev,pager,next"
        :page-size="1"
        :current-page="wpageid"
        v-on:current-change="wpagechg"
        :total="100"
      ></el-pagination>
      <div>total balnce:</div>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "history",
  components: {},
  computed: mapState({}),
  data() {
    var list = [];
    for (var val = 1; val <= 100; val++) {
      var node = {};
      node.address = "address" + val;
      node.balance = "balance" + val;
      node.update = "update" + val;
      list.unshift(node);
    }
    return {
      wpageid: val + 1,
      list: list,
    };
  },
  methods: {
    wpagechg: function (val) {
      this.wpageid = val;
    },
  },
};
</script>>

