const setMarker = (state, marker) => {
  state.markers.push(marker);
  localStorage.setItem(state.markers.indexOf(marker).toString(), JSON.stringify({ position: marker.marker.position, color: marker.color, info: marker.info }));
}

const removeMarker = (state, markerIndex) => {
  state.markers.forEach((_,index) => {
    if(localStorage.getItem(index)){
      localStorage.removeItem(index.toString());
    }
  })
  state.markers.splice(markerIndex, 1);
  state.markers.forEach((marker, index) => {
    localStorage.setItem(index.toString(), JSON.stringify({ position: marker.marker.position, color: marker.color, info: marker.info }));
  })
}

const setCenter = (state, center) => {
  state.center = center;
  localStorage.setItem("center", JSON.stringify(center));
}

const setZoom = (state, zoom) => {
  state.zoom = zoom;
  localStorage.setItem("zoom", zoom.toString());
}

const updateMarkerColor = (state, { markerIndex, color }) => {
  state.markers[markerIndex].color = color;
  localStorage.setItem(markerIndex, JSON.stringify({ position: state.markers[markerIndex].marker.position, color, info: state.markers[markerIndex].info }));
}

export default {
  setMarker,
  setCenter,
  setZoom,
  updateMarkerColor,
  removeMarker
};