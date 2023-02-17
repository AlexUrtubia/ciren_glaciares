import React, { useContext, useEffect } from "react";
import { Zoom } from "ol/control";
import MapContext from "../../../context/MapContext";

const ZoomControl = () => {
  const { map } = useContext(MapContext);
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
