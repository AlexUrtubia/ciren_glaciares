import React, { useEffect, useState, useRef} from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat} from 'ol/proj';
import Zoom from 'ol/control/Zoom';
import './map.css'

function Mapa ({ zoom = 1 }) {
  
  const ref = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    console.log("I'm mounting!");
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({ 
          center: fromLonLat([-70.66, -40.44]),
          zoom: 0,
        }),
        controls: [
          new Zoom({
            className: 'ol-control',
            target: document.getElementById('zoom-container')

          })
        ],
        target: ref.current
      });
    }
  }, [ref, mapRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom]);

  // useEffect(() => {
  //   mapRef.current?.getView().setCenter(center);
  // }, [mapRef, center]);

  return (
    <div>
      <div ref={ref} style={{ width: "100%", height:'93.5vh', minHeight:'800px', position: 'relative' }} >
        <div id="zoom-container" />
      </div>
    </div>
  )
};

export default Mapa;