const addMarker = ({commit}, marker) => {
  commit('setMarker', marker);
}

const updateMarkerColor = ({commit}, { marker, color }) => {
  commit('updateMarkerColor', { marker, color });
}

const removeMarker = ({ commit }, marker) => {
  commit('removeMarker', marker);
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