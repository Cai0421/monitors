<template>
<div>
  <v-flex s5 md5 lg5>
    <div style="position: relative; top: -15px">
      <!--
      <v-btn-toggle
        v-model="time_toggle"
        dark
        background-color="#000000"
        color="primary"
        style="height: 30px; background-color: #424242"
        group
        @change="time_change"
      >
      -->
      <v-btn-toggle>
        <v-btn class="h5" style="font-size: 16px !important">实时</v-btn>
        <v-btn class="h5" style="font-size: 16px !important">今天</v-btn>
        <v-btn class="h5" style="font-size: 16px !important">昨天</v-btn>
        <v-btn class="h5" style="font-size: 16px !important">最近7天</v-btn>
        <v-btn class="h5" style="font-size: 16px !important">最近30天</v-btn>

        <!--
        <v-btn
          class="h5"
          style="font-size: 16px !important"
          @click="dialog = true"
          >自定义</v-btn
        >
        -->
        <v-btn
          class="h5"
          style="font-size: 16px !important">
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

      <!--<v-dialog v-model="dialog" max-width="620px">-->
      <v-dialog max-width="620px">
        <v-card dark style="height: 500px">
          <v-card-title class="py-0">
            选择时间段
            <v-spacer></v-spacer>
            <!--<v-btn icon dark @click="dialog = false">-->
            <v-btn icon dark>
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <!-- <v-row justify="space-around"> -->
          <!--
          <v-date-picker
            v-model="date1"
            :show-current="false"
            locale="zh-cn"
            dark
          >
          -->
          <v-date-picker
            locale="zh-cn"
            dark>
          </v-date-picker>
          <!--
          <v-date-picker
            v-model="date2"
            :show-current="false"
            locale="zh-cn"
            dark
            style="position: relative; left: +30px"
          >
          -->
          <v-date-picker
            locale="zh-cn"
            dark>
          </v-date-picker>
          <!-- </v-row> -->
          <v-card-actions>
            <!--
            <v-btn
              color="#494949"
              text
              small
              style="
                background-color: #494949;
                position: relative;
                top: 10px;
                left: +340px;
              "
              @click="date_query"
            >
            -->
            <v-btn
              id = "date-query-btn"
              color="#494949"
              text
              small
              style="
                background-color: #494949;
                position: relative;
                top: 10px;
                left: +340px;
              "
            >
              确定
            </v-btn>
            <!--
            <v-btn
              color="#494949"
              text
              small
              style="
                background-color: #494949;
                position: relative;
                top: 10px;
                left: +370px;
              "
              @click="dialog = false"
            >
            -->
            <v-btn
              id = 'close-dialog-btn'
              color="#494949"
              text
              small
              style="
                background-color: #494949;
                position: relative;
                top: 10px;
                left: +370px;
              "
            >
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-flex>
  <!-- 注 查询时间段 -->
        <v-flex s3 md3 lg3 >
          <div style=" position:relative;top:-25px;">
            <h4 class="text-justify"></h4>
            <!--<h4 class="text-justify">{{queryTime}}&#12288;</h4>-->
          </div>
        </v-flex>
</div>
   <!-- 注 查询时间段 -->
</template>

<script>
export default {

};
</script>