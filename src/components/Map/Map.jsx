import React, { useEffect, useState, useRef} from "react";
import './map.css'
import * as ol from "ol";
import MapContext from "../../context/MapContext";


const Mapa = ({ children, zoom, center }) => {
  
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
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    mapObject.setProperties('nombre', 'Mapa 1')
    /* let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject); */
    
    return () => mapObject.setTarget(undefined);
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
    
    <MapContext.Provider value={{ map, isFooterOpen, setIsFooterOpen }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  )
}
export default Mapa;