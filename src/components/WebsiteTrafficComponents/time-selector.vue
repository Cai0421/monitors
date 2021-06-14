<template>
  <div>
    <v-container fill-height fluid grid-list-md>
      <v-layout wrap>
        <v-flex s6 md6 lg6>
          <div style="position: relative; top: -15px">
      <!-- select button toggle -->
            <v-btn-toggle dark background-color='#000000' color='primary' v-model="selectTimeTypeToggle" @change="timeTypeChange"
                          style="height: 30px; background-color: #424242" group>
              <v-btn class="h5 selector btn" style="font-size: 16px !important">实时</v-btn>
              <v-btn class="h5 selector btn" style="font-size: 16px !important">今天</v-btn>
              <v-btn class="h5 selector btn" style="font-size: 16px !important">昨天</v-btn>
              <v-btn class="h5 selector btn" style="font-size: 16px !important"
                >最近7天</v-btn
              >
              <v-btn class="h5 selector btn" style="font-size: 16px !important"
                >最近30天</v-btn
              >

              <!--
        <v-btn
          class="h5"
          style="font-size: 16px !important"
          @click="dialog = true"
          >自定义</v-btn
        >
        -->
              <v-btn class="h5" style="font-size: 16px !important"  @click="isShowDialog = true">
                自定义
              </v-btn>
            </v-btn-toggle>

            <!-- 注 时间选择器提示图标 -->
            <el-tooltip
              effect="dark"
              placement="top-start"
              style="position: relative; left: 10px"
            >
              <div slot="content">
                <p style="font-size: 8px; color: #ffffff; margin: 5px">
                  查询时间定义如下<br /><br />
                  今天：当前日期的0时-24时。<br />
                  昨天：前一日的0时-24时。<br />
                  最近7天：7日之前的0时-今日24时。<br />
                  最近30天：30日之前的0时-今日24时。<br />
                  自定义：自主选择从某一日的0时到另一日的0时。<br />
                </p>
              </div>
              <v-icon small>mdi-help-circle</v-icon>
            </el-tooltip>

            <!--picker date dialog-->
            <v-dialog max-width="620px" v-model="isShowDialog">
              <v-card dark style="height: 500px">
                <v-card-title class="py-0">
                  选择时间段
                  <v-spacer></v-spacer>
                  <v-btn icon dark @click="isShowDialog = false">
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-date-picker locale="zh-cn" dark
                               v-model="datepickerStart"
                               > </v-date-picker>
                <v-date-picker locale="zh-cn" dark
                               v-model="datepickerEnd"
                               style="position: relative; left: +30px"> </v-date-picker>
                <!-- </v-row> -->
                <v-card-actions>

                  <v-btn
                    id="date-query-btn"
                    color="#494949"
                    text
                    small
                    style="
                      background-color: #494949;
                      position: relative;
                      top: 10px;
                      left: +340px;
                    "
                    @click="dateQuery"
                  >
                    确定
                  </v-btn>

                  <v-btn
                    id="close-dialog-btn"
                    color="#494949"
                    text
                    small
                    style="
                      background-color: #494949;
                      position: relative;
                      top: 10px;
                      left: +370px;
                    "
                    @click="isShowDialog = false"
                  >
                    关闭
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
        <!-- 注 查询时间段 -->
        <v-flex s6 md6 lg6>
          <div style="position: relative; top: -25px">
            <h4 class="text-justify">{{queryDateRange}}&#12288;</h4>
            <!--<h4 class="text-justify">{{queryTime}}&#12288;</h4>-->
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <!-- 注 查询时间段 -->
</template>

<script>
//import ElTooltip from "element-ui/lib/tooltip";
//import VueDatepickerLocal from "vue-datepicker-local"
export default {
  props: {
    queryStartDate: String,
    queryEndDate: String
  },
  data(){
    return {
      queryDateRegion: "", //查询的时间区间
      datepickerStart: new Date().toISOString().substring(0,10), //datepicker bind two date
      datepickerEnd: new Date().toISOString().substring(0,10),
      //queryStartDate:  "",
      //queryEndDate: "", //query date start to end
      queryDateRange: "",
      isShowDialog: false,
      selectTimeTypeToggle: -1,
      timer: null
    }
  },
  components: {
  },
  mounted() {
    this.$nextTick(() => {
      this.isShowDialog = false;
      this.selectTimeTypeToggle = 1;
      
      let d = new Date();
      this.queryStartDate = d.toLocaleDateString();
      d = d.setDate(d.getDate() + 1);
      d = new Date(d);
      this.queryEndDate = d.toLocaleDateString();

      let sd = this.queryStartDate.split('/')[1] + "月" + this.queryStartDate.split('/')[2] + "日";
      this.queryDateRange = sd + ' 0时 至' + sd + ' 24时';
    })
  },
  methods: {
    timeTypeChange() {
      if (this.selectTimeTypeToggle === 0) {
        //realTime
        this.queryStartDate = new Date(new Date() - 4 * 60 * 60 * 1000).toLocaleDateString();
        this.queryEndDate = new Date().toLocaleDateString();
        this.queryDateRange = "";
        //5s update the data
      } else if (this.selectTimeTypeToggle === 1) {
        //today

        this.queryStartDate = new Date().toLocaleDateString();
        this.queryEndDate = new Date(new Date() +  24 * 60 * 60 * 1000).toLocaleDateString();

        this.getQueryDateRange();

      } else if (this.selectTimeTypeToggle == 2) {
        //yesterday

        this.queryStartDate = new Date(new Date() - 24 * 60 * 60 * 1000).toLocaleDateString();
        this.queryEndDate = new Date().toLocaleDateString();
        
        this.getQueryDateRange();

      } else if (this.selectTimeTypeToggle == 3) {
        //week
        this.queryStartDate = new Date(new Date() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
        this.queryEndDate = new Date().toLocaleDateString();
        
        this.getQueryDateRange();

      } else if (this.selectTimeTypeToggle == 4) {
        //month
        let today = new Date();
        today.setMonth(today.getMonth() - 1);
        this.queryStartDate = today.toLocaleDateString();
        this.queryEndDate = new Date().toLocaleDateString();
        
        this.getQueryDateRange();
      } else {
        console('temp');
      }
    },
    getQueryDateRange() {
      let sdStart = this.queryStartDate.split("/")[1] + "月" + this.queryStartDate.split("/")[2];
      let sdEnd= this.queryEndDate.split("/")[1] + "月" + this.queryEndDate.split("/")[2];
      this.queryDateRange = sdStart + "日 0时 至" + sdEnd + "日 24时";
    },
    dateQuery() {
      this.isShowDialog = false;
      this.queryStartDate = this.datepickerStart.replace(/-/g, "/");
      this.queryEndDate = this.datepickerEnd.replace(/-/g, "/");
      this.selectTimeTypeToggle = -1;

      this.getQueryDateRange();
    }
  },
  watch: {
    queryStartDate() {
      this.$emit('startDateChange', this.queryStartDate);
    },
    queryEndDate() {
      this.$emit('endDateChange', this.queryEndDate);
    }
  }
};
</script>

<style>
.v-btn--active {
  background-color: #759ebe !important;
}
</style>  