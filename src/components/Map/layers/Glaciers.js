import { useContext, useEffect } from "react";
import MapContext from "../../../context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from '../features/glaciers.json'
import WKT from "ol/format/WKT";
import vectorSource from 'ol/source/Vector'
import { FilterContext } from '../../../context/FilterContext';
import $ from 'jquery';


const Glaciares = ({  style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);
  const { setFiltered } =  useContext(FilterContext)

  useEffect(() => {
    if (!map) return;

    let VectorSource = new vectorSource
    let VectorLayer = new OLVectorLayer({
        source: VectorSource,
        style
      }); 
    
    $(document).on('click', '#search-button', function() {
        setFiltered(true)
        let reg = parseInt($('#region_id').val());        
        let filtrados = glaciers.filter(glacier => glacier.region_code == reg)
        console.log('filtrados', typeof filtrados)
        VectorSource.clear()
        if (filtrados.length > 0) {
          document.getElementById("text-error").innerText = ''
          filtrados.map(
            glacier => {
              const wktFormat = new WKT();
              const geometry = wktFormat.readFeature(glacier.wkt, {
                dataProjection: "EPSG:3857",
                featureProjection: "EPSG:3857",
              });
              VectorLayer.getSource().addFeature(geometry);
            }
          )
        } else {
          if (reg == 0 || reg == -1) {
            document.getElementById("text-error").innerText = ''
          } else {
            document.getElementById("text-error").innerText = "No se encontraron resultados"
          }
          glaciers.map(
            glacier => {
              const wktFormat = new WKT();
              const geometry = wktFormat.readFeature(glacier.wkt, {
                dataProjection: "EPSG:3857",
                featureProjection: "EPSG:3857",
              });
              geometry.setId(glacier.id)
              VectorLayer.getSource().addFeature(geometry);
            }
          )
        }              
      })

    glaciers.map(
      glacier => {
        const wktFormat = new WKT();
        const geometry = wktFormat.readFeature(glacier.wkt, {
          dataProjection: "EPSG:3857",
          featureProjection: "EPSG:3857",
        });
        geometry.setId(glacier.id)
        VectorLayer.getSource().addFeature(geometry);
      }
    )

    map.addLayer(VectorLayer);
    VectorLayer.setZIndex(zIndex);
    VectorLayer.set('vectortype', 'glaciers');

    return () => {
      if (map) {
        map.removeLayer(VectorLayer);
      }
    };
  }, [map]);
  return null;
};
export default Glaciares;