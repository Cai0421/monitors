<template>
  <div style="position: relative">
    <v-container fill-height fluid grid-list-md>
      <v-layout wrap>
        <v-flex s12 md12 lg12>
          <time-selector @startDateChange="startDateChange"  @endDateChange ="endDateChange" />
        </v-flex>
        <v-flex
          md12
          lg12
          style="position: relative; padding-bottom: 0px; top: -20px"
        >
          <traffic-sum-sat />
        </v-flex>
        <v-flex md12 lg12 style="position: relative; top: -20px">
          <traffic-trend-time :startDate="startDatetime" :endDate="endDatetime"/>
        </v-flex>
        <v-flex md12 lg12 style="position: relative; top: 0px">
          <!--<function-traffic />-->
        </v-flex>
        <v-flex md12 lg12 style="position: relative; top: 0px">
          <!--<layer-traffic />-->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TimeSelector from "./WebsiteTrafficComponents/time-selector.vue";
import TrafficTrendTime from "./WebsiteTrafficComponents/traffic-trend-time.vue";
//import FunctionTraffic from "./WebsiteTrafficComponents/function-traffic.vue";
//import LayerTraffic from "./WebsiteTrafficComponents/layer-traffic.vue";
import TrafficSumSat from "./WebsiteTrafficComponents/traffic-sum-sat.vue";
export default {
  data() {
    return {
      startDatetime: null,
      endDatetime: null
    }
  },
  components: {
    TimeSelector,
    TrafficSumSat,
    TrafficTrendTime,
    //FunctionTraffic,
    //LayerTraffic,
  },
  methods: {
    startDateChange(value) {
      this.startDatetime = value;
    },
    endDateChange(value) {
      this.endDatetime = value;
    }
  }
};
</script>

<style>
</style>