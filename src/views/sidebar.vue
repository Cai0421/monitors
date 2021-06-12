<template>
  <v-navigation-drawer
    id="app-drawer"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
    class="h5"
  >
    <v-img height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="dark">
            <v-img :src="require('@/assets/favicon.png')" />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            汉地云流量监控平台
          </v-list-tile-title>
        </v-list-tile>
        <v-divider />
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          avatar
          class="h6 px-4"
        >
          <v-list-tile-action class="px-4">
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            style="font-size: 16px !important"
            v-text="link.text"
          />
        </v-list-tile>
        <v-footer id="core-footer" absolute height="32">
          <v-spacer />
              <span class="white--text">
            <a
              target="_blank"
              class="white--text"
              href="http://ggssc.whu.edu.cn/"
              >GGSSC@WHU</a
            >
                   &copy;2020     
          </span>
          <v-spacer />
            </v-footer
        >
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities

export default {
  props: {},
  data: () => ({
    logo: "../assets/favicon.ico",
    links: [
      {
        to: "/WebsiteTraffic",
        icon: "mdi-clipboard-outline",
        text: "流量统计",
      },
    ],
  }),
  computed: {},

  methods: {},
};
</script>

<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }
}
</style>
