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
    this.restoreCenter();
    this.map = new google.maps.Map(this.$refs.map, {
      center: this.center,
      zoom: this.zoom,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.setMapClickListener(this.map, this.markers, this.markerColors);
    this.restoreMarkersFromLocalStorage(
      this.map,
      this.markers,
      this.markerColors
    );
  },
  methods: {
    ...mapActions({
      setUserCenter: "setUserCenter",
      addMarker: "addMarker",
      updateMarkerColor: "updateMarkerColor",
      removeMarker: "removeMarker",
      setCenter: "setCenter"
    }),
    setMapClickListener(map, markers, markersColors) {
      map.addListener("click", e => {
        this.createMarker(e.latLng, map, markers, markersColors);
      });
      map.addListener("center_changed", _ => {
        this.setCenter(map.getCenter());
      });
    },
    getMarkerImage(imgColor, markersColors) {
      return require(`../assets/${markersColors[imgColor]}_48x48.png`);
    },
    createMarker(position, map, markers, markersColors, cashedColor) {
      let imgColor = 0;
      let marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: cashedColor
          ? cashedColor
          : this.getMarkerImage(imgColor, markersColors)
      });
      marker.addListener("rightclick", e => {
        markers.forEach(m => {
          if (m.marker.position === e.latLng) {
            m.marker.setMap(null);
            this.removeMarker(markers.indexOf(m));
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
      this.addMarker({
        marker,
        color: this.getMarkerImage(imgColor, markersColors)
      });
    },
    restoreMarkersFromLocalStorage(map, markers, markersColors) {
      if (localStorage.length > 0 && markers.length === 0) {
        for (let i = 0; i <= localStorage.length; i++) {
          let marker = JSON.parse(localStorage.getItem(i));
          if (marker)
            this.createMarker(
              marker.position,
              map,
              markers,
              markersColors,
              marker.color
            );
        }
      }
    },
    restoreCenter() {
      if (localStorage.getItem("center")) {
        this.setCenter(JSON.parse(localStorage.getItem("center")));
      }
    }
  }
};
</script>

<style scoped>
#map-holder {
  height: 100%;
}
</style>