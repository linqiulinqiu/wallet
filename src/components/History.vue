<template>
  <el-row id="history">
    <el-col id="history-info">
      <el-button id="banner-pre">&lt;</el-button>
      <el-button id="banner-next">&gt;</el-button>

      <div id="banner">
        <ul id="banner-top">
          <li v-for="node of history" :key="node.address">
            <p>adress:{{ node.address }}</p>
            balance:{{ node.balance }}
            <p>update at:{{ node.time }}</p>
          </li>
        </ul>
      </div>
      <ul id="banner-bottom">
        <li v-for="node of history" :key="node.address">
          {{ node.index }}
        </li>
      </ul>
    </el-col>
    <div>balnce:</div>
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
      history: [
        {
          address: "addr 4",
          balance: "balance 4",
          time: "time 4",
        },
        {
          address: "addr 1",
          balance: "balance 1",
          time: "time 1",
        },
        {
          address: "addr 2",
          balance: "balance 2",
          time: "time 2",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style>
#history {
  width: 100%;
}
#history-info {
  width: 610px;
  height: 320px;
  border: olive 1px solid;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
}
#banner-pre,
#banner-next {
  position: absolute;
  top: 100px;
}
#banner-pre {
  left: 5px;
}
#banner-next {
  right: 5px;
}
#banner {
  width: 1550px;
}
#banner-top li {
  width: 500px;
  height: 160px;
  border: olive 1px solid;
  padding: 50px 0px;
  float: left;
  list-style: none;
}
#banner-buttom {
  position: absolute;
  bottom: 10px;
}
#banner-bottom li {
  list-style-type: none;
  float: left;
  margin: 10px 10px;
  width: 10px;
  height: 10px;
  /* background-color: olivedrab; */
  border-radius: 50%;
  border: 1px solid #668b66;
}
#banner-botton li:hover {
  background-color: #668b66;
}
</style>