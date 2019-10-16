<template>
  <div class="errors-wrapper">
    <div v-for="(error, index) in errors" :key="index">
      <div v-if="error.errorLvl === 0" class="error">
        <span id="error-text">{{error.errorText}}</span>
        <button id="close-button" @click="clearErrors(error)">x</button>
      </div>
      <div v-else class="error warrning">
        <span id="error-text">{{error.errorText}}</span>
        <button id="close-button" @click="clearErrors(error)">x</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayErrors",
  props: ["errors"],
  data() {
    return {};
  },
  methods:{
    clearErrors(error){
      this.errors.splice(this.errors.indexOf(error), 1);
    }
  }
};
</script>

<style scoped>
.errors-wrapper {
  width: 400px;
  height: 50px;
  position: absolute;
  z-index: 1;
  left: 50%;
  margin-left: -200px;
  margin-top: 2px;
}

.error {
  display: flex;
  justify-content: center;
  background-color: #cc0000;
  border: 0px none;
  border-radius: 2px;
  margin: 2px;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
}

.warrning {
  background-color: #ffb818;
}

#error-text {
  font-style: italic;
  color: white;
}

#close-button {
  position: absolute;
  right: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: white;
}
</style>