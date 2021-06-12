<template>
  <v-app>
    <main-view></main-view>
    <sidebar></sidebar>
  </v-app>
</template>

<script>
import MainView from "./views/main-view.vue";
import Sidebar from "./views/sidebar.vue";
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    MainView, Sidebar
  }
};
</script>
