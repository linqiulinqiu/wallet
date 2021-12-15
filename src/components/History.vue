<template>
  <el-row id="history">
    <el-col id="history-info">
      <el-button id="banner-pre">&lt;</el-button>
      <el-button id="banner-next">&gt;</el-button>

      <div id="banner">
        <div>
          <ul id="banner-top">
            <li v-for="item of history" :key="item.address">
              <p>address:{{ item.address }}</p>
              balance:{{ item.balance }}
              <p>update at:{{ item.time }}</p>
            </li>
          </ul>
        </div>

        <div id="banner-bottom">
          <ul>
            <li v-for="item of history" :key="item.address"></li>
          </ul>
        </div>
      </div>
    </el-col>
    <div>Total Balnce:</div>
  </el-row>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "history",
  components: {},
  computed: mapState({}),
  data() {
    var history = [];
    for (var i = 0; i <= 100; i++) {
      var item = {};
      item.address = "address" + i;
      item.balance = "balance" + i;
      item.time = "time" + i;
      history.push(item[i]);
    }
    return {
      history: [
        {
          address: item.address,
          balance: item.balance,
          time: item.time,
        },
      ],
    };
  },
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
  /* overflow: hidden; */
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
  bottom: -20px;
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
