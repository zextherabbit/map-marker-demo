<template>
  <div class="maps-wrapper">
    <BatchMarkers
      v-on:addBatchMarker="addBatchMarkers"
      :errors="hasErrors"
      :mapObj="map"
      v-on:disableMapClick="disableClick"
    />
    <DisplayErrors v-show="hasErrors !== null" :errors="hasErrors" />
    <div id="map-holder" ref="map"></div>
  </div>
</template>

<script>
import BatchMarkers from "./BatchMarkers";
import DisplayErrors from "./DisplayErrors";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Map",
  props: [],
  components: {
    BatchMarkers,
    DisplayErrors
  },
  data() {
    return {
      hasErrors: [],
      map: null,
      disable: false
    };
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

    this.setMapClickListener();

    this.restoreMarkers();
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

    disableClick(disable) {
      this.disable = disable;
    },

    addBatchMarkers(markers) {
      markers.forEach(marker => {
        let color = this.getMarkerImage(
          this.markerColors.indexOf(marker.color),
          this.markerColors
        );
        this.createMarker(
          new google.maps.LatLng(marker.lat, marker.lng),
          color
        );
      });
    },

    setMapClickListener() {
      this.map.addListener("click", e => {
        if (!this.disable) this.createMarker(e.latLng);
      });
      this.map.addListener("center_changed", _ => {
        this.setCenter(this.map.getCenter());
        this.setZoom(this.map.getZoom());
      });
    },

    getMarkerImage(imgColor) {
      return require(`../assets/${this.markerColors[imgColor]}_48x48.png`);
    },

    mrkerInfoWindow(title, lat, lng) {
      const creationData = new Date().toLocaleString();
      return `<div id="content"><h1>Marker No: ${title}</h1><p>Latitude: ${lat}</p><p>Longitude: ${lng}</p><p>Created at: <p>${creationData}</p></p></div>`;
    },

    deleteMarker(e) {
      this.markers.forEach(m => {
        if (m.marker.position === e.latLng) {
          m.marker.setMap(null);
          this.removeMarker(this.markers.indexOf(m));
        }
      });
    },

    createMarker(position, chosenColor, info) {
      let imgColor = 0;
      let markerInfo =
        info ||
        this.mrkerInfoWindow(
          this.markers.length + 1,
          position.lat(),
          position.lng()
        );

      let marker = new google.maps.Marker({
        position: position,
        map: this.map,
        icon: chosenColor ? chosenColor : this.getMarkerImage(imgColor)
      });

      let infoWindow = new google.maps.InfoWindow({
        content: markerInfo
      });

      let infoWindowTimeout;

      infoWindow.addListener("closeclick", _ => {
        clearTimeout(infoWindowTimeout);
      });

      marker.addListener("rightclick", e => {
        this.deleteMarker(e);
      });

      if (this.isMobileDevice()) {
        marker.addListener("dblclick", e => {
          this.deleteMarker(e);
        });
      }

      marker.addListener("mouseover", e => {
        this.markers.forEach(m => {
          if (m.marker.position === e.latLng) {
            infoWindow.open(this.map, m.marker);
          }
        });
      });

      marker.addListener("mouseout", e => {
        this.markers.forEach(m => {
          if (m.marker.position === e.latLng) {
            infoWindowTimeout = setTimeout(() => {
              infoWindow.close();
            }, 3000);
          }
        });
      });

      marker.addListener("click", e => {
        this.markers.forEach(m => {
          if (m.marker.position === e.latLng) {
            imgColor++;
            if (this.markerColors.length <= imgColor) imgColor = 0;
            m.marker.setIcon(this.getMarkerImage(imgColor));
            this.updateMarkerColor({
              markerIndex: this.markers.indexOf(m),
              color: this.getMarkerImage(imgColor)
            });
          }
        });
      });

      this.addMarker({
        marker,
        color: chosenColor ? chosenColor : this.getMarkerImage(imgColor),
        info: markerInfo
      });
    },

    restoreMarkers() {
      if (localStorage.length > 0 && this.markers.length === 0) {
        for (let i = 0; i <= localStorage.length; i++) {
          if (JSON.parse(localStorage.getItem(i))) {
            let marker = JSON.parse(localStorage.getItem(i));
            this.createMarker(marker.position, marker.color, marker.info);
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
    },

    isMobileDevice() {
      let useragent = navigator.userAgent;

      if (useragent.match(/Android/i)) {
        return "android";
      } else if (useragent.match(/webOS/i)) {
        return "webos";
      } else if (useragent.match(/iPhone/i)) {
        return "iphone";
      } else if (useragent.match(/iPod/i)) {
        return "ipod";
      } else if (useragent.match(/iPad/i)) {
        return "ipad";
      } else if (useragent.match(/Windows Phone/i)) {
        return "windows phone";
      } else if (useragent.match(/SymbianOS/i)) {
        return "symbian";
      } else if (useragent.match(/RIM/i) || useragent.match(/BB/i)) {
        return "blackberry";
      } else {
        return false;
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