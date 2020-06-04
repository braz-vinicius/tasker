<template>
  <v-app id="inspire">

    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Tasker</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-width" fluid>
         <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  components: {
  },
  data: () => ({
    drawer: null
  })
};
</script>