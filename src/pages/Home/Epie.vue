<template>
  <div id="pie"></div>
</template>

<script>
// 1.导入
import * as echarts from "echarts";
export default {
  data() {
    return {
      options: {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center",
          textStyle: {
            color: "red",
            fontSize: 30,
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  created() {
    //   将来是后端传给你
    let res = [
      { value: 104, title: "衣老师",id:1 },
      { value: 735, title: "直接访问",id:1 },
      { value: 580, title: "邮件营销",id:1 },
      { value: 484, title: "联盟广告",id:1 },
      { value: 300, title: "视频广告",id:1 },
    ];
    let data = []

    for(let k in res) {
        let item = {
            value:'',
            name:''
        }
        item.value = res[k].value
        item.name = res[k].title
        data.push(item)
    }

    this.options.series[0].data = data;
  },
  mounted() {
    // 2.获取dom对象
    let dom = document.getElementById("pie");
    // 3.初始化
    let myEcharts = echarts.init(dom);
    // 4.设置配置对象
    myEcharts.setOption(this.options);
  },
  methods: {},
  components: {},
};
</script>
<style scoped>
#pie {
  width: 600px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px #fff;
  padding: 5px;
}
</style>