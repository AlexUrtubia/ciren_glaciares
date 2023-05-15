import { useContext, useEffect } from "react";
import { FullScreen } from "ol/control";
import { MapContext, MapContext2 } from "../../../context";

export const FullScreenControl = () => {

  const mapContext = useContext(MapContext);
  const mapContext2 = useContext(MapContext2);
  const { map } = mapContext || mapContext2;
  
  useEffect(() => {
    if (!map) return;
    let fullScreenControl = new FullScreen({});
    map.controls.push(fullScreenControl);
    
    const button = document.querySelector('.ol-full-screen-false');
    button.innerHTML = '';
    
    return () => map.controls.remove(fullScreenControl);
  }, [map]);
  
  return null;
};