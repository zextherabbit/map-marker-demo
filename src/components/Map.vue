<template>
  <div class="maps-wrapper">
    <BatchMarkers v-on:addBatchMarker="addBatchMarkers" />
    <div id="map-holder" ref="map"></div>
  </div>
</template>

<script>
import BatchMarkers from "./BatchMarkers";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Map",
  props: [],
  components: {
    BatchMarkers
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
    this.restoreZoom();

    this.map = new google.maps.Map(this.$refs.map, {
      center: this.center,
      zoom: this.zoom
    });

    this.setMapClickListener(this.map, this.markers, this.markerColors);

    this.restoreMarkers(this.map, this.markers, this.markerColors);
  },
  methods: {
    ...mapActions({
      setUserCenter: "setUserCenter",
      addMarker: "addMarker",
      updateMarkerColor: "updateMarkerColor",
      removeMarker: "removeMarker",
      setCenter: "setCenter",
      setZoom: "setZoom"
    }),

    addBatchMarkers(markers) {
      markers.forEach(marker => {
        let color = this.getMarkerImage(this.markerColors.indexOf(marker.color), this.markerColors);
        this.createMarker(
          new google.maps.LatLng(marker.lat, marker.lng),
          this.map,
          this.markers,
          this.markerColors,
          color
        );
      });
    },

    setMapClickListener(map, markers, markersColors) {
      map.addListener("click", e => {
        this.createMarker(e.latLng, map, markers, markersColors);
      });
      map.addListener("center_changed", _ => {
        this.setCenter(map.getCenter());
        this.setZoom(map.getZoom());
      });
    },

    getMarkerImage(imgColor, markersColors) {
      return require(`../assets/${markersColors[imgColor]}_48x48.png`);
    },

    createMarker(position, map, markers, markersColors, chosenColor) {
      let imgColor = 0;
      let marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: chosenColor
          ? chosenColor
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
            imgColor++;
            if (markersColors.length <= imgColor) imgColor = 0;
            m.marker.setIcon(this.getMarkerImage(imgColor, markersColors));
            this.updateMarkerColor({
              markerIndex: markers.indexOf(m),
              color: this.getMarkerImage(imgColor, markersColors)
            });
          }
        });
      });

      this.addMarker({
        marker,
        color: chosenColor
          ? chosenColor
          : this.getMarkerImage(imgColor, markersColors)
      });
    },

    restoreMarkers(map, markers, markersColors) {
      if (localStorage.length > 0 && markers.length === 0) {
        for (let i = 0; i <= localStorage.length; i++) {
          if (JSON.parse(localStorage.getItem(i))) {
            let marker = JSON.parse(localStorage.getItem(i));
            this.createMarker(
              marker.position,
              map,
              markers,
              markersColors,
              marker.color
            );
          }
        }
      }
    },

    restoreCenter() {
      if (localStorage.getItem("center")) {
        this.setCenter(JSON.parse(localStorage.getItem("center")));
      }
    },

    restoreZoom() {
      if (localStorage.getItem("zoom")) {
        this.setZoom(parseInt(JSON.parse(localStorage.getItem("zoom"))));
      }
    }
  }
};
</script>

<style scoped>
.maps-wrapper {
  height: 100%;
  width: 100%;
}
#map-holder {
  height: 100%;
}
</style>