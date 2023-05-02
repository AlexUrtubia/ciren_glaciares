import { useContext, useEffect } from "react";
import MapContext from "../../../context/MapContext";
import MapContext2 from "../../../context/MapContext2";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ source, style, zIndex = 0, map }) => {

  const mapContext = useContext(MapContext);
  const mapContext2 = useContext(MapContext2);
  const { map } = mapContext || mapContext2;
  
  useEffect(() => {
    if (!map) return;
    let vectorLayer = new OLVectorLayer({
      source,
      style
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);
  
  return null;
};
export default VectorLayer;
