import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

export default {
  Point: new Style({
    image: new CircleStyle({
      radius: 2,
      fill: new Fill({
        color: 'rgba(0, 255, 0, 0.5)'
      }),
      stroke: new Stroke({
        color: "green",
        width: 2,
      }),
    }),
  }),
  SinglePoint: new Style({
    image: new CircleStyle({
      radius: 12,
      fill: new Fill({
        color: 'rgba(0, 255, 0, 0.7)'
      }),
      stroke: new Stroke({
        color: "green",
        width: 2,
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "green",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  GeoJson: new Style({
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)" //color del relleno en formato RGBA
    }),
    stroke: new Stroke({
      color: 'red', //color del borde
      width: 1 //ancho del borde
    })
  }),
  Filtered: new Style({
    stroke: new Stroke({
      color: "red",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
};