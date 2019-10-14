<template>
  <div>
    <Markers />
    <div id="map-holder" ref="map"></div>
  </div>
</template>

<script>
import Markers from "./Markers";
export default {
  name: "Map",
  props: [],
  components: {
    Markers
  },
  data() {
    return {
      markers: [],
      markerColors: ["yellow", "green", "blue", "purple", "red"],
      colorUrl: "http://maps.google.com/mapfiles/ms/icons/",
      markersId: 0,
      map: {}
    };
  },
  created() {},
  mounted() {
    this.map = new google.maps.Map(this.$refs.map, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.setMapLClickListener(this.map, this.markers, this.markersId);
  },
  methods: {
    setMapLClickListener(map, markers, markersId) {
      map.addListener("click", e => {
        this.createMarker(e.latLng, map, markers, markersId);
      });
    },
    createMarker(position, map, markers, markersId) {
      let marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      });
      marker.addListener("rightclick", e => {
        markers.forEach(m => {
          if (m.position === e.latLng) {
            m.setMap(null);
            markers.splice(markers.indexOf(m), 1);
          }
        });
      });
      marker.addListener("click", e => {
        markers.forEach(m => {
          if (m.position === e.latLng) {
            let img = require(`../assets/${color[2]}_48x48.png`);
            m.setIcon(img);
          }
        });
      });
      markers.push(marker);
    }
  }
};
</script>

<style scoped>
#map-holder {
  height: 100%;
}
</style>