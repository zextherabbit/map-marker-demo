<template>
  <div class="markers-wrapper" @mouseenter="active = !active" @mouseleave="active = !active" v-bind:class="{ fill: active, transparent: !active }">
    <div class="markers-holder">
      <input id="batch-markers" type="text">
    </div>
  </div>
</template>

<script>
export default {
  name: "Markers",
  components: {
  },
  data() {
    return {
      active: false
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.markers-wrapper{
  position: absolute;
  z-index: 1;
  bottom: 0;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 500px;
  height: 200px;
}

.fill{
  opacity: 1;
}

.transparent{
  opacity: 0.5;
}

.markers-holder{
  width: 100%;
  height: 100%;
}

#batch-markers{
  width: 100%;
  height: 100%;
}
</style>