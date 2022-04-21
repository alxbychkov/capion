<template>
  <highcharts
    v-if="isChartShow"
    :constructor-type="'stockChart'"
    :options="chartOptions"
  ></highcharts>
</template>
<script>
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";
import { Chart } from "highcharts-vue";
import { getChartData } from "../../core/api";

stockInit(Highcharts);

export default {
  name: "Chart",
  data() {
    return {
      chartData: "",
      isChartShow: false,
    };
  },
  components: {
    Highcharts: Chart,
  },
  computed: {
    backgroundColor: function () {
      if (document.documentElement.classList.contains("dark-theme"))
        return "#323030";
      return "#E1E0DD";
    },
    chartOptions: function () {
      return {
        chart: {
          backgroundColor: this.backgroundColor,
          height: 200,
        },
        rangeSelector: {
          selected: 4,
        },
        navigator: {
          enabled: false,
        },
        scrollbar: {
          enabled: false,
        },
        series: [
          {
            type: "candlestick",
            data: this.chartData,
            color: "#f21313",
            upColor: "#06b535",
            upLineColor: "#06b535",
            lineColor: "#f21313",
            colorAxis: "red",
          },
        ],
        yAxis: {
          gridLineColor: "",
          labels: {},
        },
      };
    },
  },
  methods: {},
  created() {
    getChartData().then((res) => {
      this.chartData = res;
      this.isChartShow = true;
    });
  },
};
</script>
<style scoped></style>
