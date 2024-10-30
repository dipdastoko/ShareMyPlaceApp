export class Map {
  constructor(coords) {
    // this.coordinates = coords;
    this.render(coords);
  }
  mapContainer = document.getElementById("map");
  render(coordinates) {
    const map = new maplibregl.Map({
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: coordinates,
      zoom: 9.5,
      container: this.mapContainer,
    });
  }
}
