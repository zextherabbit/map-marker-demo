<template>
  <div id="map-holder" ref="map"></div>
</template>

<script>
import { api_key } from "../../api";
export default {
  name: "Map",
  props: {},
  data() {
    return {
      platform: {},
      map: {},
      markers: []
    };
  },
  created() {
    this.platform = new H.service.Platform({
      apikey: api_key
    });
  },
  mounted() {
    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(this.$refs.map, defaultLayers.vector.normal.map, {
      zoom: 12,
      center: { lat: 43.3209, lng: 21.8958 },
      pixelRatio: window.devicePixelRatio || 1
    });
    this.group = new H.map.Group();
    const mapEvents = new H.mapevents.MapEvents(this.map);
    const behavior = new H.mapevents.Behavior(mapEvents);
   
  },
  methods: {
  }
};
</script>

<style scoped>
#map-holder {
  width: 100%;
  height: 100%;
}
</style>