<template>
  <el-row id="history">
    <el-col id="history-info">
      <div id="history-addr">
        <p>
          address:<span>{{ addr }} </span>
        </p>
        <p>
          balance:<span>{{ balance }} </span>
        </p>
        <p>
          update at: <span>{{ time }}</span>
        </p>
      </div>
      <el-pagination
        background
        layout="prev,pager,next"
        :page-size="1"
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
    return {
      addr: "xch",
      balance: "0.0",
      time: "09/01",
      wpageid: 1,
    };
  },
  methods: {
    wpagechg: function (val) {
      console.log(val, this.wpageid);
      alert(this.wpageid);
    },
  },
};
</script>>

