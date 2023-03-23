import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

export default {
  Point: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: 'green'
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
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
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