import React, { useEffect, useState, useRef } from "react";
import { MapContext2 } from "../../context";
import './map.css'
import * as ol from "ol";


const Mapa2 = ({ children, zoom, center }) => {
  
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isFooterOpen, setIsFooterOpen] = React.useState(false);

  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: []
    };
    let mapObject2 = new ol.Map(options);
    mapObject2.setTarget(mapRef.current);
    setMap(mapObject2);
    
    return () => mapObject2.setTarget(undefined);
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);
  
  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center)
  }, [center])
  
  return (
    
    <MapContext2.Provider value={{ map, isFooterOpen, setIsFooterOpen }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext2.Provider>
  )
}
export default Mapa2;