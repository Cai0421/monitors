<template>
  <div>
    <v-container fill-height fluid grid-list-md>
      <v-layout wrap>
        <v-flex
          md12
          lg12
          style="position: relative; padding-bottom: 0px; top: -20px"
        >
          <v-card>
            <div style="background: #424242; height: 40px; color: white">
              <p
                class="h5 px-2"
                style="
                  position: relative;
                  height: 30px;
                  top: +6px;
                  font-size: 14px !important;
                "
              >
                各端访问量统计
              </p>
              <div style="position: relative; left: 110px; top: -42px">
                <el-tooltip effect="dark" placement="top-start">
                  <div slot="content">
                    <p style="font-size: 10px; color: #ffffff; margin: 5px">
                      各端访问量统计<br /><br />
                    </p>
                  </div>
                  <v-icon small>mdi-help-circle</v-icon>
                </el-tooltip>
              </div>
            </div>
          </v-card>
        </v-flex>

        <!-- 注 折线图 -->
        <v-flex
          md8
          lg8
          style="position: relative; padding-top: 0px; top: -20px"
        >
          <div
            ref="bar"
            style="width: 100%; height: 200px; background: #ffffff"
          >
            各端访问量折线图
          </div>
        </v-flex>
        <!-- 注 饼图 -->
        <v-flex
          md4
          lg4
          style="position: relative; padding-top: 0px; top: -20px"
        >
          <div
            ref="pie"
            style="width: 100%; height: 200px; background: #ffffff"
          >
            各端访问量饼状图
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  
}
</script>
