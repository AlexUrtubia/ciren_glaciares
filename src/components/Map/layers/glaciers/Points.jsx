import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from 'ol/source/Vector'
import glaciers from '../../features/glaciers.json'
import WKT from "ol/format/WKT";
import { FilterContext } from "../../../../context/FilterContext";

const Points = ({  style, zIndex = 0 }) => {

  const { map } = useContext(MapContext);
  const { id, setIsFooterOpen, setId } = useContext(FilterContext);

  var pointsLayer = new OLVectorLayer({
    source: new VectorSource({
      features: [],
    }),
    style,
    name: 'glacier_points'
  });

  let resolution
  var hitTolerance = 10;

  useEffect(() => {

    if (!map) return;

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
    pointsLayer.setZIndex(2);
    pointsLayer.set('vectortype', 'glaciers_points');

    // Escuchar el evento change:resolution para actualizar hitTolerance según sea necesario
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
      // Obtener la feature clickeada
      console.log('hitTolerance', hitTolerance)
      var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
        return layer.get('zIndex') === 2 ? feature : undefined;
      }, { hitTolerance: hitTolerance } );
      // Si hay una feature, obtener su ID
      if (feature) {
        var featureId = feature.getId();
        console.log('ID del punto clickeado:', featureId);
        setId(featureId);
        setIsFooterOpen(true)
      }
    });

    return () => {
      if (map) {
        map.removeLayer(pointsLayer);
      }
    };
  }, [map, id]);

  if (map) {
    resolution = map.getView().getResolution()
  }

  useEffect(() => {

    if (!map) return;

    map.getView().on('change:resolution', function() {
      
      let resolution = this.getResolution();
      var radius = 3
      if (resolution <= 100) {
        radius = 9;
      } else if (resolution > 100 && resolution <= 300) {
        radius = 6;
      } else if (resolution > 300 && resolution <= 500) {
        radius = 4;
      } else if (resolution > 500) {
        radius = 2;
      }
      pointsLayer.getStyle().getImage().setRadius(radius)
    })
  }, [map, id]);

  return null;
};
export default Points;