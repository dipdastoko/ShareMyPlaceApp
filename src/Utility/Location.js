export class FindMap {
  geocoderApi = {
    forwardGeocode: async (config) => {
      const features = [];
      try {
        console.log(config.query);
        const request = `https://nominatim.openstreetmap.org/search?q=${config.query}&format=geojson&polygon_geojson=1&addressdetails=1`;
        const response = await fetch(request);
        const geojson = await response.json();
        for (const feature of geojson.features) {
          const center = [
            feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
            feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
          ];
          const point = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: center,
            },
            place_name: feature.properties.display_name,
            properties: feature.properties,
            text: feature.properties.display_name,
            place_type: ["place"],
            center,
          };
          features.push(point);
        }
      } catch (e) {
        console.error(`Failed to forwardGeocode with error: ${e}`);
      }

      return {
        features,
      };
    },
  };
  maps = new maplibregl.Map({
    container: "map",
    // Use a minimalist raster style
    style: {
      version: 8,
      name: "Blank",
      center: [0, 0],
      zoom: 0,
      sources: {
        "raster-tiles": {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          minzoom: 0,
          maxzoom: 19,
        },
      },
      layers: [
        {
          id: "background",
          type: "background",
          paint: {
            "background-color": "#e0dfdf",
          },
        },
        {
          id: "simple-tiles",
          type: "raster",
          source: "raster-tiles",
        },
      ],
      id: "blank",
    },
    center: [-87.61694, 41.86625],
    zoom: 15.99,
    // pitch: 40,
    // bearing: 20,
    // antialias: true,
  });
}
