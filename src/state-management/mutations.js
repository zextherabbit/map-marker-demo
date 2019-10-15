const setMarker = (state, marker) => {
  state.markers.push(marker);
}

const removeMarker = (state, marker) => {
  state.markers.splice(state.markers.indexOf(marker), 1);
}

const setCenter = (state, center) => {
  state.center = center;
}

const setZoom = (state, zoom) => {
  state.zoom = zoom;
}

const updateMarkerColor = (state, { marker, color }) => {
  state.markers[marker].color = color;
}

export default {
  setMarker,
  setCenter,
  setZoom,
  updateMarkerColor,
  removeMarker
};