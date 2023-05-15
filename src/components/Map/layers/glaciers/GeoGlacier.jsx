import { useContext } from "react";
import { MapContext, MapContext2 } from "../../../../context";
import OLVectorLayer from "ol/layer/Vector";
import geoJsonGla from '../../features/glaciar1.geojson'
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from 'ol/source/Vector'



const GeoGlacier = ({style, zIndex = 0}) => {

  const mapContext = useContext(MapContext);
  const mapContext2 = useContext(MapContext2);
  const { map } = mapContext || mapContext2;


  var geojsonFormat = new GeoJSON()
  const vectorSource = new VectorSource();
  const vectorLayer = new OLVectorLayer({
    source: vectorSource,
    style
  });
  let addedFeatureIds = [];

  // agregar conteo de features para no volver a agregar fetch
  if (!map) {
    return null
  } else {
    // console.log('vectorSource.getFeatures() a a', vectorSource.getFeatures())
    
    fetch(geoJsonGla)
    .then(response => response.json())
    .then(geojson => {
      var geojsonFeatures = geojsonFormat.readFeatures(geojson);
      // console.log('geojson', geojson.features[0].properties.Id)
      console.log('geojson', geojsonFeatures)

      geojsonFeatures.forEach(feature => {
        console.log('feature', feature)
        feature.setId(geojson.features[0].properties.Id); // asigna un ID único basado en el índice
      });


      var newFeatures = [];
      geojsonFeatures.forEach(feature => {
        if (!addedFeatureIds.includes(feature.getId())) {
          newFeatures.push(feature);
          addedFeatureIds.push(feature.getId());
        }
      });
      vectorSource.addFeatures(newFeatures)
      map.addLayer(vectorLayer);
      vectorLayer.setZIndex(zIndex);
    });
  }

  

/*     useEffect((map) => {
    
      // console.log('SON.parse(geoJsonGla)',geoJsonGla)
      var geojsonFormat = new GeoJSON()
      var geojsonFeatures = geojsonFormat.readFeatures(geoJsonGla);
  
      const vectorSource = new VectorSource({
        features: geojsonFeatures
      });
  
      const geojsonLayer = new OLVectorLayer({
        source: vectorSource,
        style: style
      });
  
      map.addLayer(geojsonLayer);
      geojsonLayer.setZIndex(zIndex);
  
  
      
  
    }, [map]); */

   /*  useEffect(() => {

    if (!map) return;

    pointRadiusResolution(map, pointsLayer, true)
  
  }, [map, id ]); */

  return null;
};
export default GeoGlacier;