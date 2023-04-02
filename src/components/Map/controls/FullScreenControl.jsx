import { useContext, useEffect } from "react";
import { FullScreen } from "ol/control";
import MapContext from "../../../context/MapContext";

const FullScreenControl = () => {

  const { map } = useContext(MapContext);
  
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

export default FullScreenControl;