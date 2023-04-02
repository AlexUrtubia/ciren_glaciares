import { useContext, useEffect } from "react";
import MapContext from "../../../context/MapContext";
import OLTileLayer from "ol/layer/Tile";


const TileLayer = ({ source, zIndex = 0, title, type }) => {

  const { map } = useContext(MapContext); 
  
  useEffect(() => {
    if (!map) return;
    
    let tileLayer = new OLTileLayer({
      source,
      zIndex,
      title,
      type,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);
  return null;
};
export default TileLayer;