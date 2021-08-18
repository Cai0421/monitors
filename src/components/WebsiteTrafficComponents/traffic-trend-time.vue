<template>
  <div>
    <v-container fill-height fluid grid-list-md>
      <v-layout wrap>
        <v-flex md12 lg12 style="position: relative; top: -20px">
          <v-card>
            <div style="background: #424242; height: 40px; color: white">
              <p
                class="h5 px-2"
                style="
                  position: relative;
                  top: +6px;
                  font-size: 14px !important;
                "
              >
                访问量趋势
              </p>
              <div style="position: relative; left: +90px; top: -32px">
                <el-tooltip effect="dark" placement="top-start">
                  <div slot="content">
                    <p style="font-size: 10px; color: #ffffff; margin: 5px">
                      访问量定义为图层和功能请求的次数<br /><br />
                      总访问量曲线中对图层和功能分别汇总。<br />
                      图层访问量曲线和功能访问量曲线选择查询<br />
                      时段内访问量最高前5个图层或功能进行绘制。
                    </p>
                  </div>
                  <v-icon small>mdi-help-circle</v-icon>
                </el-tooltip>
              </div>
            </div>
            <div
              ref="totalTrafficLine"
              style="width: 100%; height: 200px; background: #ffffff"
            >
              总流量
            </div>
          </v-card>
        </v-flex>

        <!-- 注 访问量趋势 功能访问量 -->
        <v-flex
          md6
          lg6
          style="position: relative; top: -20px"
          ref="funcTrafficLine"
        >
          <!--
      <div
        ref="fun_line"
        style="width: 100%; height: 200px; background: #ffffff"
      >
      -->
          <div style="width: 100%; height: 200px; background: #ffffff">
            功能流量
          </div>
        </v-flex>

        <!-- 注 访问量趋势 图层访问量 -->
        <v-flex md6 lg6 style="position: relative; top: -20px">
          <!--
      <div
        ref="layer_line"
        style="width: 100%; height: 200px; background: #ffffff"
      >
      -->
          <div
            style="width: 100%; height: 200px; background: #ffffff"
            ref="layerTrafficLine"
          >
            图层流量
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
export default {
  props: {
    startDate: String,
    endDate: String,
    timer: Number,
    selectTimeType: Number,
  },
  data() {
    return {
      //chart
      startDatetime: "",
      endDatetime: "",
      totalTrafficEchart: null,
      totalTrafficEchartOption: null,
      funcTrafficEchart: null,
      funcTrafficEchartOption: null,
      layerTrafficEchart: null,
      layerTrafficEchartOption: null,
      zhName: {},
      itemLayer: [],
      itemFunc: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      //init chart
      this.startDatetime = this.startDate;
      this.endDatetime = this.endDate;
      this.loadNameJson();
      this.initChart();
      this.getQueryRealChart();
    });
  },
  methods: {
    initChart() {
      this.drawTotalTrafficChart();
      this.drawFunctionTrafficChart();
      this.drawLayerTrafficChart();
    },
    drawTotalTrafficChart() {
      // traffic sum chart
      this.totalTrafficEchart = echarts.init(this.$refs.totalTrafficLine);
      this.totalTrafficEchartOption = {
        title: {
          text: "访问量",
          textAlign: "center",
          left: "50%",
        },
        tooltip: {
          trgger: "axis",
          formatter: function (params) {
            //console.log(this.loadParam(params));
            return this.loadParam(params);
          },
          axisPointer: {
            type: "line",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["总访问量", "图层访问量", "功能访问量"],
          type: "scroll",
          y: "bottom",
        },
        toolbox: {
          feature: {
            saveAsImage: {
              name: "总访问量趋势图",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "25%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
            name: "时间",
            axisLabel: {
              padding: [1, 1, 1, 20],
            },
          },
        ],
        dataZoom: [
          {
            height: 20,
            type: "slider",
            show: true,
            xAxisIndex: [0],
            left: "12%",
            right: "12%",
            bottom: "15%",
            start: 0,
            end: 100, //初始化滚动条
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: (value) => {
              return Math.ceil(value.max / 5) * 5;
            },
          },
        ],
        series: [
          {
            type: "line",
            //symbol: 'none',
            symboySize: 0,
            areaStyle: {},
            data: [],
          },
          {
            type: "line",
            symbol: "none",
            areaStyle: {},
            data: [],
          },
          {
            type: "line",
            symbol: "none",
            areaStyle: {},
            data: [],
          },
        ],
      };
      this.totalTrafficEchart.setOption(this.totalTrafficEchartOption, true);
      this.totalTrafficEchart.on("mouserover", this.mouseOver);
      this.totalTrafficEchart.on("mouserout", this.mouseOut);
    },
    drawFunctionTrafficChart() {
      this.funcTrafficEchart = echarts.init(this.$refs.funcTrafficLine);
      this.funcTrafficEchartOption = {
        title: {
          text: "功能访问量",
          left: "50%",
          textAlign: "center",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            return this.loadParam(params);
          },
          axisPointer: {
            type: "line",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: [],
          type: "scroll",
          y: "bottom",
        },
        toolbox: {
          feature: {
            saveAsImage: {
              name: "功能访问量趋势图",
            },
          },
        },
        grid: {
          top: "15%",
          left: "8%",
          right: "8%",
          bottom: "25%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
            name: "时间",
            axisLabel: {
              padding: [1, 1, 1, 20],
            },
          },
        ],
        dataZoom: [
          {
            height: 20,
            type: "slider",
            show: true,
            xAxisIndex: [0],
            left: "20%",
            right: "20%",
            bottom: "15%",
            start: 0,
            end: 100, //初始化滚动条
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: (value) => {
              return Math.ceil(value.max / 5) * 5;
            },
          },
        ],
        series: [],
      };
      this.funcTrafficEchart.setOption(this.funcTrafficEchartOption, true);
      this.funcTrafficEchart.on("mouseover", this.mouseOver);
      this.funcTrafficEchart.on("mouseout", this.mouseOut);
    },
    drawLayerTrafficChart() {
      this.layerTrafficEchart = echarts.init(this.$refs.layerTrafficLine);
      this.layerTrafficEchartOption = {
        title: {
          text: "图层访问量",
          left: "50%",
          textAlign: "center",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            return this.loadParam(params);
          },
          axisPointer: {
            type: "line",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: [],
          type: "scroll",
          y: "bottom",
        },
        toolbox: {
          feature: {
            saveAsImage: {
              name: "图层访问量趋势图",
            },
          },
        },
        grid: {
          top: "15%",
          left: "8%",
          right: "8%",
          bottom: "25%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
            name: "时间",
            axisLabel: {
              padding: [1, 1, 1, 20],
            },
          },
        ],
        dataZoom: [
          {
            height: 20,
            type: "slider",
            show: true,
            xAxisIndex: [0],
            left: "20%",
            right: "20%",
            bottom: "15%",
            start: 0,
            end: 100, //初始化滚动条
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: (value) => {
              return Math.ceil(value.max / 5) * 5;
            },
          },
        ],
        series: [],
      };
      this.layerTrafficEchart.setOption(this.funcTrafficEchart, true);
      this.funcTrafficEchart.on("mouseover", this.mouseOver);
      this.funcTrafficEchart.on("mouseout", this.mouseOut);
    },
    loadParam(params) {
      let htmlStr = "";
      for (let i = 0; i < params.length; i++) {
        let param = params[i];
        let xName = param.name;
        let yValue = param.data;
        let seriesName = param.seriesName;
        let color = param.color;
        if (i === 0) htmlStr += xName + "<br/>";
        else {
          htmlStr += "<div>";
          htmlStr +=
            '<div style="position:relative; top:+6px; left:-2px; float:left; width:10px;height:10px;border-radius:50%;background-color:' +
            color +
            '"></div>';
          htmlStr += seriesName + "：" + Math.round(yValue - 0.01);
          htmlStr += "</div>";
        }
      }
      return htmlStr;
    },
    loadNameJson() {
      axios.get("test.json").then((axiosData) => {
        this.zhName = {};
        let data = axiosData.data.data;
        for (let i = 0; i < data.length; i++) {
          let d = data[i];
          this.zhName[d.value] = d.label;
        }
      });
    },
    mouseOver() {
      console.log("鼠标移入");
    },
    mouseOut() {
      console.log("鼠标移出");
    },
    getQueryHistoryChart(startDatetime, endDatetime) {
      let x = [];
      let yAll = [];
      let yLayer = [];
      let yFunc = [];
      let startDate = new Date(startDatetime);
      let endDate = new Date(endDatetime);
      let sum1 = 0;
      let sum2 = 0;
      let x_length = parseInt(endDate - startDate) / 1000 / 3600;

      for ( let i = 0; i < x_length; i++ ) {
        endDate = new Date(startDate.valueOf() + 1000 * 3600 * i);
        x.push(
          endDate.getFullYear() +
            "/" +
            (endDate.getMonth() + 1) +
            "/" +
            endDate.getDate() +
            " " +
            endDate.getHours() +
            ":00:00"
        );
        yAll.push(0.01);
        yLayer.push(0.01);
        yFunc.push(0.01);
      }
      console.log(yAll);
      // layers
      axios
        .get(
          "/api/SQLServerOpt2.ashx?type=query_layer&" +
            startDatetime +
            "&" +
            endDatetime
        )
        .then((axiosData) => {
          let data = axiosData.data;
          let series = [];
          let legend = [];
          if (data !== '{"data":[]}') {
            data = data.data;
            let layers = [];
            let layersSeq = {};
            for (let i = 0; i < data.length; i++) {
              let d = data[i];
              if (Object.prototype.hasOwnProperty.call(this.zhName, d.layerName))
                d.layerName = this.zhName[d.layerName];
              if (layers.indexOf(d.layerName) == -1) {
                layers.push(d.layerName);
                layersSeq[d.layerName] = {};
              }
              layersSeq[d.layerName][d.time] = parseInt(d.cnt);
              sum1 += parseInt(d.cnt);
            }
            for (let i = 0; i < layers.length; i++) {
              legend.push(layers[i]);
              let y = [];
              let seq = layersSeq[layers[i]];
              for (let j = 0; j < x.length; j++) {
                let time = x[j];
                if (!Object.prototype.hasOwnProperty.call(seq, time))
                  y.push(0.01);
                else {
                  y.push(parseInt(seq[time]) + 0.01);
                  yLayer[j] += seq[time];
                  yAll[j] += seq[time];
                }
              }
              series.push({
                name: layers[i],
                type: "line",
                stack: "总量",
                smooth: true,
                //symbol: 'none',
                symboySize: 0,
                areaStyle: {},
                data: y,
              });
            }
          }
          this.layerTrafficEchartOption.legend.data = legend;
          this.layerTrafficEchartOption.xAxis[0].data = x;
          this.layerTrafficEchartOption.series = series;
          this.layerTrafficEchart.setOption(
            this.layerTrafficEchartOption,
            true
          );
          //function
          axios
            .get(
               "/api/SQLServerOpt2.ashx?type=query_function&" +
                startDatetime +
                "&" +
                endDatetime
            )
            .then((axiosData) => {
              let data = axiosData.data;
              let series = [];
              let legend = [];
              if (data !== '{"data":]}') {
                data = data.data;
                let funs = [];
                let funsSeq = {};
                for (let i = 0; i < data.length; i++) {
                  let d = data[i];
                  if (Object.prototype.hasOwnProperty.call(this.zhName,d.functionName)) {
                    d.functionName = this.zhName[d.functionName];
                  }
                  if (funs.indexOf(d.functionName) == -1) {
                    funs.push(d.functionName);
                    funsSeq[d.functionName] = {};
                  }
                  funsSeq[d.functionName][d.time] = parseInt(d.cnt);
                  sum2 += parseInt(d.cnt);
                }
                for (let i = 0; i < funs.length; i++) {
                  legend.push(funs[i]);
                  let y = [];
                  let seq = funsSeq[funs[i]];
                  for (let j = 0; j < x.length; j++) {
                    let time = x[j];
                    if (!Object.prototype.hasOwnProperty.call(seq, time)) {
                      y.push(0.01);
                    } else {
                      y.push(Math.round(seq[time]) + 0.01);
                      yFunc[j] += seq[time];
                      yAll[j] += seq[time];
                    }
                  }
                  series.push({
                    name: funs[i],
                    type: "line",
                    stack: "总量",
                    smooth: true,
                    //symbol: 'none',
                    symboySize: 0,
                    areaStyle: {},
                    data: y,
                  });
                }
              }
              this.funcTrafficEchartOption.legend.data = legend;
              this.funcTrafficEchartOption.xAxis[0].data = x;
              this.funcTrafficEchartOption.series = series;
              this.funcTrafficEchart.setOption(this.funcTrafficEchartOption, true);

              //all
              this.totalTrafficEchartOption.title.text = 
              "访问量  总访问量" +
                (sum1 + sum2).toString() +
                "次 图层" +
                sum1.toString() +
                "次 功能" +
                sum2.toString() +
                "次";
              this.totalTrafficEchartOption.xAxis[0].data = x;
              this.totalTrafficEchartOption.series[0] = {
                name: "总访问量",
                type: "line",
                smooth: true,
                symbol: "none",
                areaStyle: {
                  opacity: 0,
                },
                itemStyle: {
                  normal: {
                    // color: 'rgb(124,205,124)',
                    color: "rgba(245, 90, 78, 1)",
                    // borderColor: '#e48b4c',
                    lineStyle: {
                      width: 2,
                      //type: 'dashed'
                    }
                  }
                },
                data: yAll
              };
              this.totalTrafficEchartOption.series[1] = {
                name: "图层访问量",
                type: "bar",
                stack: "1",
                data: yLayer,
                itemStyle: {
                  normal: {
                    color: "rgba(51,51,102,1)",
                    //color: '#00E3E3',
                    // borderColor: '#e48b4c',
                    lineStyle: {
                      width: 2,
                      type: "dashed",
                    },
                  },
                },
              };
              this.totalTrafficEchartOption.series[2] = {
                name: "功能访问量",
                type: "bar",
                stack: "1",
                data: yFunc,
                itemStyle: {
                  normal: {
                    // color: 'rgb(124,205,124)',
                    color: "rgba(102,153,255,1)",
                    // borderColor: '#e48b4c',
                    lineStyle: {
                      width: 2,
                      type: "dashed",
                    },
                  }
                }
              }
              if (yAll.length <= 24) {
                this.totalTrafficEchartOption.series[1].barWidth = 10;
                this.totalTrafficEchartOption.series[2].barWidth = 10;
              }
              this.totalTrafficEchart.setOption(this.totalTrafficEchartOption, true);
            })
        });
    },
    getQueryRealChart() {

      axios.get("/api/requestHandler.ashx?type=2").then((axiosData) => {
        let data = axiosData.data;
        let x = data.time.split(",");
        let y_sum0 = data.sum.split(",");
        let y_layer0 = data.sum1.split(",");
        let y_func0 = data.sum2.split(",");
        let y_sum = [];
        let y_layer = [];
        let y_func = [];
        for (let i = 0; i < y_sum0.length; i++) {
          y_sum.push(parseInt(y_sum0[i]) + 0.01);
        }
        for (let i = 0; i < y_layer0.length; i++) {
          y_layer.push(parseInt(y_layer0[i]) + 0.01);
        }
        for (let i = 0; i < y_func0.length; i++) {
          y_func.push(parseInt(y_func0[i]) + 0.01);
        }
        this.totalTrafficEchartOption.title.text = "访问量";
        this.totalTrafficEchartOption.xAxis[0].data = x;
        this.totalTrafficEchartOption.series[0] = {
          name: "总访问量",
          type: "line",
          smooth: true,
          symbol: "none",
          areaStyle: {
            opacity: 0,
          },
          itemStyle: {
            normal: {
              // color: 'rgb(124,205,124)',
              color: "rgba(245, 90, 78, 1)",
              // borderColor: '#e48b4c',
              lineStyle: {
                width: 2,
              },
            },
          },
          data: y_sum,
        };
        this.totalTrafficEchartOption.series[1] = {
          name: "图层访问量",
          type: "bar",
          stack: "1",
          data: y_layer,
          itemStyle: {
            normal: {
              color: "rgba(51,51,102,1)",
              lineStyle: {
                width: 2,
                type: "dashed",
              },
            },
          },
          barWidth: 3,
        };
        this.totalTrafficEchartOption.series[2] = {
          name: "功能访问量",
          type: "bar",
          stack: "1",
          data: y_func,
          itemStyle: {
            normal: {
              // color: 'rgb(124,205,124)',
              color: "rgba(102,153,255,1)",
              // borderColor: '#e48b4c',
              lineStyle: {
                width: 2,
                type: "dashed",
              },
            },
          },
          barWidth: 3,
        };
        this.totalTrafficEchart.setOption(this.totalTrafficEchartOption, true);
        //
        let layers = data.layers;
        let legend = [];
        let series = [];
        if (layers.length > 0) {
          for (let i = 0; i < layers.length; i++) {
            let layer = layers[i];
            if (Object.prototype.hasOwnProperty.call(this.zhName, layer.layer)) {
              layer.layer = this.zhName[layer.layer];
            }
            legend.push(layer.layer);
            let y0 = layer.seq.split(",");
            let y = [];
            for (let j = 0; j < y0.length; j++) {
              y.push(Math.round(y0[j]) + 0.01);
            }
            series.push({
              name: layer.layer,
              type: "line",
              stack: "总量",
              smooth: true,
              //symbol: 'none',
              symboySize: 0,
              areaStyle: {},
              data: y,
            });
          }
        }
        this.layerTrafficEchartOption.legend.data = legend;
        this.layerTrafficEchartOption.xAxis[0].data = x;
        this.layerTrafficEchartOption.series = series;
        this.layerTrafficEchart.setOption(this.layerTrafficEchartOption, true);
        //
        let functions = data.functions;
        legend = [];
        series = [];
        if (functions.length > 0) {
          for (let i = 0; i < functions.length; i++) {
            let fun = functions[i];
            if (Object.prototype.hasOwnProperty.call(this.zhName, fun.function)) {
              fun.function = this.zhName[fun.function];
            }
            legend.push(fun.function);
            let y0 = fun.seq.split(",");
            let y = [];
            for (let j = 0; j < y0.length; j++) {
              y.push(parseInt(y0[j]) + 0.01);
            }
            series.push({
              name: fun.function,
              type: "line",
              stack: "总量",
              smooth: true,
              //symbol: 'none',
              symboySize: 0,
              areaStyle: {},
              data: y,
            });
          }
        }
        this.funcTrafficEchartOption.legend.data = legend;
        this.funcTrafficEchartOption.xAxis[0].data = x;
        this.funcTrafficEchartOption.series = series;
        this.funcTrafficEchart.setOption(this.funcTrafficEchartOption, true);
      });
    }
  },
  watch: {
    startDate(value) {
      this.startDatetime = value;
      if (this.startDatetime == null || this.endDatetime == null) return;
      this.getQueryHistoryChart(this.startDatetime, this.endDatetime);
    },
    endDate(value) {
      this.endDatetime = value;
      
      this.getQueryHistoryChart(this.startDatetime, this.endDatetime);
    }
  },
};
</script>