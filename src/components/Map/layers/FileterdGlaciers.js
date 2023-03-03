import React from "react";
import { useContext, useEffect } from "react";
import MapContext from "../../../context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from '../features/glaciers.json'
import VectorSource from 'ol/source/Vector'
import WKT from "ol/format/WKT";
import $ from 'jquery';
import { FilterContext } from '../../../context/FilterContext';


function getFilterd(reg) {
  let filtrados = glaciers.filter(glacier => glacier.region_code == reg)
  return filtrados
}


const FilteredGlaciers = ({  vectorstyle, zIndex = 0 }) => {
  
  const { map } = useContext(MapContext);
  const { filtered, setFiltered, vectorSource, vectorLayer } =  useContext(FilterContext)

  
  useEffect(() => {
    $(document).on('click', '#search-button', function() {
      let slum = parseInt($('#region_id').val());
      
      console.log('slum', slum)
      setFiltered(true)
      console.log('filtered', filtered)

    })
    if (!map) return;
    let VectorLayer = vectorLayer
    // 
    // VectorLayer.style = vectorstyle
    /* $(document).on('click', '#search-button', function() {
      console.log('filtered_pol')
      // setFiltered(true)
      let reg = parseInt($('#region_id').val());
      let filtered_pol = getFilterd(reg)
      console.log('filtered_pol', filtered_pol)
      vectorSource.clear()                
      filtered_pol.map(
        glacier => {
          const wktFormat = new WKT();
          const geometry = wktFormat.readFeature(glacier.wkt, {
            dataProjection: "EPSG:3857",
            featureProjection: "EPSG:3857",
          });
          // geometry.setId(glacier.id)
          VectorLayer.getSource().addFeature(geometry);
        }
      )
    }) */
    map.addLayer(VectorLayer);
    VectorLayer.setZIndex(zIndex);
    VectorLayer.set('vectortype', 'filtered');
    return () => {
      if (map) {
        map.removeLayer(VectorLayer);
      }
    };
    
  }, [map]);
  return null;
};
export default FilteredGlaciers;