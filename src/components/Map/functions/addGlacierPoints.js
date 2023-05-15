import WKT from "ol/format/WKT";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from 'ol/source/Vector'
import { pointRadiusResolution } from './pointRadiusResolution';


export function addGlacierPoints (map, point_style, glacier, hitTolerance, setHitTolerance) {
  
  var pointsLayer = new OLVectorLayer({
    source: new VectorSource({
      features: [],
    }),
    style: point_style,
  });

  glacier.points.map( points => {
    var wkt = points.point.replace(',', '')
    var wktFormat = new WKT();
    var point = wktFormat.readFeature(wkt);
    point.setId(points.id)
    pointsLayer.getSource().addFeature(point);
  })

  map.addLayer(pointsLayer);
  pointsLayer.setZIndex(5);
  pointsLayer.set('vectortype', 'glacier_wktpoint');

  pointRadiusResolution(map, pointsLayer)
}
