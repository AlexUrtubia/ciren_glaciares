import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import MapContext2 from "../../../../context/MapContext2";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from '../../features/glaciers.json'
import WKT from "ol/format/WKT";
import VectorSource from 'ol/source/Vector'
import { FilterContext } from "../../../../context/FilterContext";
import { pointRadiusResolution } from "../../functions/pointRadiusResolution";
import { MultiPolygon } from "ol/geom";
import { Feature } from "ol";


const Glaciar = ({  style, point_style, zIndex = 0, gla_id }) => {

  const mapContext = useContext(MapContext);
  const mapContext2 = useContext(MapContext2);
  const { map } = mapContext || mapContext2;

  const { id, setIsFooterOpen, setId } = useContext(FilterContext);

  var pointsLayer = new OLVectorLayer({
    source: new VectorSource({
      features: [],
    }),
    style: point_style,
    name: 'glacier_points'
  });

  var hitTolerance = 10;

  useEffect(() => {

    if (!map) return;
    let Vectorsource = new VectorSource
    let VectorLayer = new OLVectorLayer({
      source: Vectorsource,
      style: style
    });

    const glacier =  glaciers.find(glacier => glacier.id == gla_id)

    const feature = new Feature({
      geometry: new MultiPolygon(glacier.wkt)
    });
    
    const selectedGla = Object.entries(glacier)[13][1]

    selectedGla.map( point => {console.log('point', point)})

    VectorLayer.getSource().addFeature(feature);

    map.addLayer(VectorLayer);
    VectorLayer.setZIndex(zIndex);
    VectorLayer.set('vectortype', 'glaciers');

    selectedGla.map( points => {
      var wkt = points.point.replace(',', '')
      var wktFormat = new WKT();
      var point = wktFormat.readFeature(wkt);
      point.setId(points.id)
      pointsLayer.getSource().addFeature(point);
    })

    map.addLayer(pointsLayer);
    pointsLayer.setZIndex(9);

    map.getView().on('change:resolution', function() {
      // Obtener la resolución actual del mapa
      var resolution = map.getView().getResolution();

      if (resolution <= 100) {
        hitTolerance = 50;
      } else if (resolution > 100 && resolution <= 300) {
        hitTolerance = 30;
      } else if (resolution > 300 && resolution <= 500) {
        hitTolerance = 10;
      }
    }); 

    map.on('click', function(event) {
      
      var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
        return layer.get('zIndex') === 9 ? feature : undefined;
      }, 
      {
        hitTolerance: hitTolerance
      });

      if (feature) {

        var featureId = feature.getId();
        setId(featureId);
        setIsFooterOpen(true)
      }
    });

    map.getView().fit(
      VectorLayer.getSource().getExtent(),
    {"maxZoom":12} );   

    return () => {
      if (map) {
        map.removeLayer(VectorLayer);
      }
    };

  }, [map]);

  useEffect(() => {

    if (!map) return;
    pointRadiusResolution(map, pointsLayer, true)

  }, [map, id ]);

  return null;
};
export default Glaciar;