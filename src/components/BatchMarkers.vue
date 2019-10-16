<template>
  <div class="batch-marker-holder">
    <div class="button-holder" v-show="active === false">
      <button id="batch-button" @click="activateTexArea">Add Markers</button>
    </div>
    <div class="markers-holder" v-show="active" tabindex="0" @blur="hideBatch" ref="markers">
      <textarea
        id="batch-markers"
        type="text"
        placeholder="Add your markers"
        v-model="markersBatch"
        ref="markersArea"
        @blur="hideBatchFromText"
      ></textarea>
      <div>
        <button id="add-button" @click="addMarkers" ref="addButton">Add</button>
        <button id="close-button" @click="active = false">Close</button>
      </div>
    </div>
    <div class="tooltip-wrapper">
      <div class="tooltip">
        &#9432;
        <div class="top">
          <h3>How to batch add</h3>
          <ul>
            <li>Input your marker in format (43.2222,23.2222,blue)</li>
            <li>You can input multiple markers, juts break them each in seperate line</li>
            <li>Colors to choose from are : blue, green, purple and red</li>
          </ul>
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BatchMarkers",
  props: ["errors", "mapObj"],
  components: {},
  data() {
    return {
      active: false,
      markersBatch: ""
    };
  },
  created() {},
  mounted() {},
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
      return input
        .split("\n")
        .filter(el => {
          if (el) {
            return el;
          } else {
            this.errors.push({
              errorLvl: 0,
              errorText: "Invalid input, empty line"
            });
          }
        })
        .map(line => line.split(","))
        .map(val => {
          if (!isNaN(val[0]) && !isNaN(val[1])) {
            if (val.length > 3) {
              this.errors.push({
                errorLvl: 1,
                errorText: `Please use correct format, added marker for lat:${val[0].trim()}, lng:${val[1].trim()}`
              });
            }
            let color = this.colorPick(val[2]);
            return {
              lat: parseFloat(val[0].trim()),
              lng: parseFloat(val[1].trim()),
              color
            };
          } else {
            this.errors.push({
              errorLvl: 0,
              errorText: "Latitude or longitude must be valid numbers"
            });
          }
        })
        .filter(el => {
          if (el) return el;
        });
    },
    showTutorial() {},
    colorPick(input) {
      let color;
      if (!input) {
        color = "blue";
      } else if (input && this.markerColors.indexOf(input.trim()) === -1) {
        this.errors.push({
          errorLvl: 1,
          errorText: "Color not found, added default color"
        });
        color = "blue";
      } else color = input;
      return color;
    },
    fireDisableEvent() {
      this.$emit("disableMapClick", true);
      setTimeout(() => {
        this.$emit("disableMapClick", false);
      }, 500);
    },
    hideBatchFromText(event) {
      this.fireDisableEvent();
      let relatedTarget = event.relatedTarget;
      if (relatedTarget === this.$refs.addButton) return;
      this.active = false;
    },
    hideBatch(event) {
      this.fireDisableEvent();
      let target = event.target;
      let relatedTarget = event.relatedTarget;
      if (relatedTarget === target) {
        return;
      }
      for (let child of target.children) {
        if (relatedTarget === child) {
          return;
        }
      }
      this.active = false;
    },
    activateTexArea() {
      this.active = true;
      setTimeout(() => {
        this.$refs.markers.focus();
      }, 200);
    }
  }
};
</script>

<style scoped>
.batch-marker-holder {
  position: absolute;
  display: flex;
  justify-content: center;
  z-index: 1;
  bottom: 0;
  left: 1;
  height: auto;
  margin-left: 10px;
  margin-bottom: 20px;
  background: transparent;
  border-radius: 2px;
}

#batch-button {
  width: 130px;
  height: 40px;
  background: rgb(255, 255, 255);
  font: 400 18px Roboto, Arial, sans-serif;
  border: 0px none;
  border-radius: 2px;
  padding: 2px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  cursor: pointer;
}

.markers-holder {
  width: 300px;
  height: 180px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: sans-serif;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  white-space: nowrap;
}

#batch-markers {
  height: 100%;
  padding: 5px;
  background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 4px -1px;
  font: 400 18px Roboto, Arial, sans-serif;
  border: none;
  resize: none;
}

#add-button,
#close-button {
  width: 50%;
  background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;
  font: 400 18px Roboto, Arial, sans-serif;
  border: 0px none;
  border-radius: 2px;
  padding: 2px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 4px -1px;
  cursor: pointer;
}

.tooltip-wrapper{
  margin-left: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
}

.tooltip {
  display: inline-block;
  position: relative;
  text-align: left;
  padding: 8px;
}

.tooltip h3 {
  margin: 12px 0;
}

.tooltip .top {
  width: 380px;
  top: -20px;
  left: 50%;
  transform: translate(-30%, -100%);
  padding: 10px 20px;
  color: #ffffff;
  background-color: #009cdc;
  font-weight: normal;
  font-size: 14px;
  border-radius: 8px;
  position: absolute;
  z-index: 99999999;
  box-sizing: border-box;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  display: none;
}

.tooltip:hover .top {
  display: block;
}

.tooltip .top i {
  position: absolute;
  top: 100%;
  left: 30%;
  margin-left: -15px;
  width: 30px;
  height: 15px;
  overflow: hidden;
}

.tooltip .top i::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background-color: #009cdc;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
}
</style>