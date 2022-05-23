<template>
  <div>
    <v-chart :option="barOptions" class="box" />
  </div>
</template>

<script>
// 柱状图
import "echarts/lib/chart/bar";
// 导入vue-echarts
import vChart from "vue-echarts";

export default {
  data() {
    return {
      barOptions: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: "#a90000",
                },
              },
              150,
              80,
              70,
              110,
              130,
            ],
            type: "bar",
          },
        ],
      },
    };
  },
  created() {},
  methods: {},
  components: {
    vChart,
  },
};
</script>
<style scoped>
.box {
  width: 600px;
  height: 400px;
  background-color: #fff;
}
</style>