<template>
  <div>
    <Markers />
    <div id="map-holder" ref="map"></div>
  </div>
</template>

<script>
import Markers from "./Markers";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Map",
  props: [],
  components: {
    Markers
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      markers: "getMarkers",
      center: "getCenter",
      markerColors: "getMarkerColors",
      zoom: "getZoom"
    })
  },
  mounted() {
    this.map = new google.maps.Map(this.$refs.map, {
      center: this.center,
      zoom: this.zoom,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.setMapClickListener(this.map, this.markers, this.markerColors);
  },
  methods: {
    ...mapActions({
      setUserCenter: "setUserCenter",
      addMarker: "addMarker",
      updateMarkerColor: "updateMarkerColor",
      removeMarker: "removeMarker"
    }),
    setMapClickListener(map, markers, markersColors) {
      map.addListener("click", e => {
        this.createMarker(e.latLng, map, markers, markersColors);
      });
    },
    getMarkerImage(imgColor, markersColors) {
      return require(`../assets/${markersColors[imgColor]}_48x48.png`);
    },
    createMarker(position, map, markers, markersColors) {
      let imgColor = 0;
      let marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: this.getMarkerImage(imgColor, markersColors)
      });
      marker.addListener("rightclick", e => {
        markers.forEach(m => {
          if (m.marker.position === e.latLng) {
            m.marker.setMap(null);
            this.removeMarker(m.marker);
          }
        });
      });
      marker.addListener("click", e => {
        markers.forEach(m => {
          if (m.marker.position === e.latLng) {
            ++imgColor;
            if (markersColors.length <= imgColor) imgColor = 0;
            m.marker.setIcon(this.getMarkerImage(imgColor, markersColors));
            this.updateMarkerColor({
              marker: markers.indexOf(m),
              color: this.getMarkerImage(imgColor, markersColors)
            });
          }
        });
      });
      this.addMarker({ marker, color: markersColors[imgColor] });
    }
  }
};
</script>

<style scoped>
#map-holder {
  height: 100%;
}
</style>