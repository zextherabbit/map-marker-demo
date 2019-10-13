<template>
  <div class="wrapper">
      <div class="map-wrapper">
        <Map/>
      </div>
      <div class="markers-wrapper">
        <Markers/>
      </div>
  </div>
</template>

<script>
import Map from "./Map";
import Markers from "./Markers";
export default {
  name: "MapMarker",
  components: {
    Map,
    Markers
  },
  data(){
    return {
      platform: "text prop"
    }
  },
  methods:{
  },
  mounted(){
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.map-wrapper{
  position: relative;
  float: left;
  width: 70%;
  height: 100%;
}

.markers-wrapper{
  position: relative;
  float: right;
  width: 30%;
  height: 100%;
}
</style>
