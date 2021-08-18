<template>
  <v-card style="height: 415px">
    <div style="background: #424242; height: 45px; color: white">
      <p class="h5 px-2 py-1">功能访问量列表</p>
      <div style="position: relative; left: +115px; top: -38px">
        <el-tooltip effect="dark" placement="top-start">
          <div slot="content<">
            <p style="font-size: 10px; color: #ffffff; margin: 5px">
              将访问量按功能统计
            </p>
          </div>
          <v-icon small>mdi-help-circle</v-icon>
        </el-tooltip>
      </div>
      <div class="output-div">
        <!--
          <v-btn
            small
            class="deal h5"
            light
            color="#424242"
            calculate-widths="true"
            @click="function_tocsv"
            style="
              height: 30px;
              width: 50px;
              background-color: #759ebe !important;
              position: absolute;
              right: 5px;
            "
          >
          -->
        <v-btn
          small
          class="deal h5"
          light
          color="#424242"
          calculate-widths="true"
        >
          导出
        </v-btn>
      </div>
    </div>
    <v-data-table
      class="vdatatable"
      light
      locale="zh-ch"
      hide-actions
      rowsPerPageText="每页条数"
      no-data-text="无"
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
    >
      <template slot="headerCell" slot-scope="{ header }">
        <span
          class="font-weight-light text-warning text--darken-3"
          style="postion: relative; top: -10px"
          v-text="header.text"
        />
      </template>
      <template slot="items" slot-scope="{ item }">
        <td class="text-xs-center" style="width: 80px">{{ item.index }}</td>
        <td class="text-xs-center">{{ item.function }}</td>
        <td class="text-xs-center" style="width: 80px">
          <!--{{ item.frequency }}-->
        </td>
        <td class="text-xs-center" style="width: 80px">{{ item.source }}</td>
      </template>
    </v-data-table>

    <div class="text-xs-center pt-2 myPage">
      <v-pagination
        v-model="pagination1.page"
        color="#759EBE"
        :length="pages1"
        total-visible="5"
      ></v-pagination>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['queryStartDate','queryEndDate'],
  data() {
    return {
      headers: [
        {
          sortable: false,
          text: "序号",
          value: "index",
          align: "center",
        },
        {
          sortable: false,
          text: "功能",
          value: "function",
          align: "center",
        },
        {
          sortable: true,
          text: "总访问量",
          value: "frequency",
          align: "center",
        },
        {
          sortable: true,
          text: "来源",
          value: "source",
          align: "center",
        },
      ],
      pagination: { sortBy: "frequency", descending: true, rowsPerPage: 5 },
      items: [],
      startQueryDatetime: '',
      endQueryDatetime: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      
    })
  }
};
</script>

<style>
.deal {
  height: 30px;
  width: 50px;
  background-color: #759ebe !important;
  position: absolute;
  right: 5px;
}

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
</style>