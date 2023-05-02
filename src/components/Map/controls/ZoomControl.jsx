import { useContext, useEffect } from "react";
import { Zoom } from "ol/control";
import MapContext from "../../../context/MapContext";
import MapContext2 from "../../../context/MapContext2";

const ZoomControl = () => {

  const mapContext = useContext(MapContext);
  const mapContext2 = useContext(MapContext2);
  const { map } = mapContext || mapContext2;
  
  useEffect(() => {
    if (!map) return;
    let zoomControl = new Zoom({
      target: document.getElementById('zoom-container')
    });
    map.controls.push(zoomControl);
    
    return () => map.controls.remove(zoomControl);
  }, [map]);
  return null;
};
export default ZoomControl;
