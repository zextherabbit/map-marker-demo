<template>
  <div id="app">
    <MapMarker />
  </div>
</template>

<script>
import MapMarker from "./components/MapMarker.vue";

export default {
  name: "app",
  components: {
    MapMarker
  },
  methods: {},
  mounted() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

 * {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
