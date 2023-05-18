import React, { useEffect, useState, useRef} from "react";
import { MapContext } from "../../context";
import './map.css'
import * as ol from "ol";


const Mapa = ({ children, zoom, center }) => {
  
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isFooterOpen, setIsFooterOpen] = React.useState(false);

  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: []
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    
    return () => mapObject.setTarget(undefined);
  }, [ zoom, center ]);
  
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom, map]);
  

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center)
  }, [center, map])
  
  return (
    
    <MapContext.Provider value={{ map, isFooterOpen, setIsFooterOpen }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  )
}
export default Mapa;