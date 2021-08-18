<!-- 图层访问量 -->

<template>
  <v-card style="height: 415px">
    <div style="background: #424242; height: 45px; color: white">
      <p class="h5 px-2 py-1">图层访问量列表</p>

      <div style="position: relative; left: +115px; top: -38px">
        <el-tooltip effect="dark" placement="top-start">
          <div slot="content">
            <p style="font-size: 10px; color: #ffffff; margin: 5px">
              将访问量按图层统计
            </p>
          </div>
          <v-icon small>mdi-help-circle</v-icon>
        </el-tooltip>
      </div>

      <!--导出的块级作用域-->
      <div class="output-div">
        <v-btn small class="deal h5" light color="#424242">
          <!-- @click="layer_tocsv" -->
          导出
        </v-btn>
      </div>
    </div>
    <!--
      <v-data-table
        light
        :headers="headers2"
        :items="items2"
        class="vdatatable"
        :pagination.sync="pagination2"
        rowsPerPageText="每页条数"
        no-data-text="无"
        dense
        style="background-color: #494949"
        hide-actions
      >
      -->
    <v-data-table
      light
      class="vdatatable"
      rowsPerPageText="每页条数"
      no-data-text="无"
      dense
      style="background-color: #494949"
      hide-actions
    >
      <template slot="headerCell" slot-scope="{ header }">
        <spans
          class="font-weight-light text-warning text--darken-3"
          style="postion: relative; top: -10px"
          v-text="header.text"
        />
      </template>
      <template slot="items" slot-scope="{ item }">
        <td class="text-xs-center" style="width: 80px">{{ item.index }}</td>
        <td class="text-xs-center">{{ item.layer }}</td>
        <td class="text-xs-center" style="width: 80px">
          {{ item.frequency }}
        </td>
        <td class="text-xs-center" style="width: 80px">{{ item.source }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2 myPage">
      <v-pagination
        v-model="pagination2.page"
        color="#759EBE"
        :length="pages2"
        total-visible="5"
      ></v-pagination>
    </div>
  </v-card>
</template>
<script>
export default {
  
};
</script>

<style>
.px-2 {
  position: relative;
  height: 30px;
  top: +6px;
  font-size: 14px !important;
}

.output-div {
  height: 0px;
  width: 150px;
  position: absolute;
  right: 0px;
  top: -2px;
  color: black;
}
.deal {
  height: 30px;
  width: 50px;
  background-color: #759ebe !important;
  position: absolute;
  right: 5px;
}
</style>