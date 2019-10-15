<template>
  <div class="batch-marker-holder">
    <div class="button-holder" v-show="active === false">
      <button id="batch-button" @click="activateTexArea">Add Markers</button>
    </div>
    <div class="markers-holder" v-show="active">
      <textarea
        id="batch-markers"
        type="text"
        placeholder="Add Multiple Markers(, seperated)"
        v-model="markersBatch"
        ref="markersArea"
      ></textarea>
      <button id="add-button" @click="addMarkers">Add</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BatchMarkers",
  components: {},
  data() {
    return {
      active: false,
      markersBatch: ""
    };
  },
  created() {},
  mounted() {
    this.$refs.markersArea.focus();
  },
  computed: {
    ...mapGetters({
      markerColors: "getMarkerColors",
      markers: "getMarkers"
    })
  },
  methods: {
    addMarkers(e) {
      const parsedMarkers = this.getBatchMarkers(this.markersBatch);
      this.$emit("addBatchMarker", parsedMarkers);
      this.markersBatch = "";
      this.active = false;
    },
    getBatchMarkers(input) {
      const lines = input
        .split("\n")
        .filter(el => {
          if (el) return el;
        })
        .map(line => line.split(","))
        .map(val => {
          if (!isNaN(val[0]) && !isNaN(val[1])) {
            console.log(this.markerColors);
            return {
              lat: parseFloat(val[0].trim()),
              lng: parseFloat(val[1].trim()),
              color: this.markerColors.indexOf(val[2].trim()) !== -1 ? val[2].trim() : "blue"
            };
          }
        })
        .filter(el => { if(el) return el});
      return lines;
    },
    activateTexArea() {
      this.active = true;
    }
  }
};
</script>

<style scoped>
.batch-marker-holder {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 1;
  height: auto;
  margin-left: 10px;
  margin-bottom: 20px;
  background: rgb(255, 255, 255);
  border-radius: 2px;
}

#batch-button {
  width: 130px;
  height: 50px;
  background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;
  font: 400 18px Roboto, Arial, sans-serif;
  border: 0px none;
  border-radius: 2px;
  padding: 2px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  cursor: pointer;
}

.markers-holder {
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  white-space: nowrap;
}

#batch-markers {
  height: 200px;
  background: transparent;
  padding: 5px;
  font: 400 18px Roboto, Arial, sans-serif;
  border: none;
  resize: none;
}

#add-button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;
  font: 400 18px Roboto, Arial, sans-serif;
  border: 0px none;
  border-radius: 2px;
  padding: 2px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 4px -1px;
  cursor: pointer;
}
</style>