<template>
  <div id="app">
    <Map/>
  </div>
</template>

<script>
import Map from "./components/Map.vue";

export default {
  name: "app",
  components: {
    Map
  },
  methods: {
  },
  created() {
  },
  mounted() {
  }
};
</script>

<style>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

</style>
