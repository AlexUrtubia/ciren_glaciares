import React, { useEffect, useState, useRef, useContext} from "react";
import './map.css'
import * as ol from "ol";
import MapContext2 from "../../context/MapContext2";


const Mapa2 = ({ children, zoom, center }) => {
  
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isFooterOpen, setIsFooterOpen] = useContext(MapContext2);


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
    mapObject2.setProperties('nombre', 'Mapa 1')

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