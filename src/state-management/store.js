import Vue from 'vue';
import Vuex from 'vuex';

import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    markers: [],
    markerColors: ["blue", "green", "purple", "red"],
    center: { lat: 38.889931, lng: -77.009003 },
    zoom: 12
  },
  getters,
  mutations,
  actions
});
