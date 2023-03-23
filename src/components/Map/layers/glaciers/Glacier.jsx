import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from '../../features/glaciers.json'
import WKT from "ol/format/WKT";
import VectorSource from 'ol/source/Vector'


const Glaciar = ({  style, zIndex = 0, id }) => {

  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let Vectorsource = new VectorSource
    let VectorLayer = new OLVectorLayer({
      source: Vectorsource,
      style
    });

    const glacier =  glaciers.find(glacier => glacier.id == id)
    const wktFormat = new WKT();
    const geometry = wktFormat.readFeature(glacier.wkt, {
      dataProjection: "EPSG:3857",
      featureProjection: "EPSG:3857",
    });
    
    const selectedGla = Object.entries(glacier)[13][1]
    console.log('selectedGla', selectedGla)
    selectedGla.map( point => {console.log('point', point)})

    // geometry.setId(glacier.id)
    VectorLayer.getSource().addFeature(geometry);

    map.addLayer(VectorLayer);
    VectorLayer.setZIndex(zIndex);
    VectorLayer.set('vectortype', 'glaciers');

    map.getView().fit(
      VectorLayer.getSource().getExtent(),
    {"maxZoom":14} );   
    
    map.on('singleclick', function (evt) {
      console.log(evt.coordinate);
  
      // convert coordinate to EPSG-4326
      // console.log(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
    });

    return () => {
      if (map) {
        map.removeLayer(VectorLayer);
      }
    };
  }, [map]);
  return null;
};
export default Glaciar;