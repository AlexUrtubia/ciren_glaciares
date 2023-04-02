import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import geoJsonGla from '../../features/glaciar1.geojson'
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from 'ol/source/Vector'
import { FilterContext } from "../../../../context/FilterContext";
import { pointRadiusResolution } from "../../Functions/pointRadiusResolution";
import { json } from "react-router-dom";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";


const GeoGlacier = ({style, zIndex = 0}) => {

  const { map } = useContext(MapContext);
  const { id, setIsFooterOpen, setId } = useContext(FilterContext);

  var geojsonFormat = new GeoJSON()
  const vectorSource = new VectorSource();
  const vectorLayer = new OLVectorLayer({
    source: vectorSource,
    style
  });
  // agregar conteo de features para no volver a agregar fetch
  if (!map) {
    return null
  } else {
    fetch(geoJsonGla)
    .then(response => response.json())
    .then(geojson => {
      var geojsonFeatures = geojsonFormat.readFeatures(geojson);
      vectorSource.addFeatures(geojsonFeatures)
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