<template>
  <div style="position: relative">
    <v-container fill-height fluid grid-list-md>
      <v-layout wrap>
        <v-flex s5 md5 lg5>
          <time-selector />
        </v-flex>
        <v-flex
          md12
          lg12
          style="position: relative; padding-bottom: 0px; top: -20px"
        >
          <traffic-sum-sat />
        </v-flex>
        <v-flex md12 lg12 style="position: relative; top: -20px">
          <traffic-trend-time />
        </v-flex>
        <v-flex md6 lg6 style="position: relative; top: 0px">
          <function-traffic />
        </v-flex>
        <v-flex md6 lg6 style="position: relative; top: 0px">
          <layer-traffic />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TimeSelector from "./WebsiteTrafficComponents/time-selector.vue";
import TrafficTrendTime from "./WebsiteTrafficComponents/traffic-trend-time.vue";
import FunctionTraffic from "./WebsiteTrafficComponents/function-traffic.vue";
import LayerTraffic from "./WebsiteTrafficComponents/layer-traffic.vue";
import TrafficSumSat from "./WebsiteTrafficComponents/traffic-sum-sat.vue";
export default {
  components: {
    TimeSelector,
    TrafficSumSat,
    TrafficTrendTime,
    FunctionTraffic,
    LayerTraffic,
  },
};
</script>

<style>
</style>