const addMarker = ({commit}, marker) => {
  commit('setMarker', marker);
}

const updateMarkerColor = ({commit}, { markerIndex, color }) => {
  commit('updateMarkerColor', { markerIndex, color });
}

const removeMarker = ({ commit }, markerIndex) => {
  commit('removeMarker', markerIndex);
}

const setCenter = ({commit}, center) => {
  commit('setCenter', center)
}

const setZoom = ({commit}, zoom) => {
  commit('setZoom', zoom);
}

export default {
  addMarker,
  setCenter,
  setZoom,
  updateMarkerColor,
  removeMarker
};