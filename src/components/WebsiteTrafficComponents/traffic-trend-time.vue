<template>
  <div>
    <v-flex md12 lg12 style="position: relative; top: -20px">
      <v-card>
        <div style="background: #424242; height: 40px; color: white">
          <p
            class="h5 px-2"
            style="position: relative; top: +6px; font-size: 14px !important"
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
          ref="total_line"
          style="width: 100%; height: 200px; background: #ffffff"
        >
          总流量
        </div>
      </v-card>
    </v-flex>

    <!-- 注 访问量趋势 功能访问量 -->
    <v-flex md6 lg6 style="position: relative; top: -20px">
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
      >
        图层流量
      </div>
    </v-flex>
  </div>
</template>