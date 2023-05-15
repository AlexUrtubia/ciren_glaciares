import glaciers from '../features/glaciers.json'
import WKT from "ol/format/WKT";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from 'ol/source/Vector'
import { pointRadiusResolution } from './pointRadiusResolution';

export function addingWktPoints (map, point_style, hitTolerance, setHitTolerance) {

  var pointsLayer = new OLVectorLayer({
    source: new VectorSource({
      features: [],
    }),
    style: point_style,
    name: 'glacier_points'
  });

  glaciers.map(
    glacier => {
      var selectedGla = Object.entries(glacier)[13][1]
      selectedGla.map( points => {
        var wkt = points.point.replace(',', '')
        var wktFormat = new WKT();
        var point = wktFormat.readFeature(wkt);
        point.setId(points.id)
        pointsLayer.getSource().addFeature(point);
      })
    })

  map.addLayer(pointsLayer);
  pointsLayer.setZIndex(5);
  pointsLayer.set('vectortype', 'glaciers_points');

  pointRadiusResolution(map, pointsLayer)
}
