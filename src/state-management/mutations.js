const setMarker = (state, marker) => {
  state.markers.push(marker);
  localStorage.setItem(state.markers.indexOf(marker).toString(), JSON.stringify({ position: marker.marker.position, color: marker.color }));
}

const removeMarker = (state, marker) => {
  localStorage.removeItem(marker.toString());
  state.markers.splice(marker, 1);
}

const setCenter = (state, center) => {
  state.center = center;
  localStorage.setItem("center", JSON.stringify(center));
}

const setZoom = (state, zoom) => {
  state.zoom = zoom;
}

const updateMarkerColor = (state, { marker, color }) => {
  state.markers[marker].color = color;
  localStorage.setItem(marker, JSON.stringify({ position: state.markers[marker].marker.position, color }));
}

export default {
  setMarker,
  setCenter,
  setZoom,
  updateMarkerColor,
  removeMarker
};