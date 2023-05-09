import React, { useEffect, useContext } from 'react';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import MapContext from "../../../context/MapContext";
import MapContext2 from "../../../context/MapContext2";


function LayerSwitcherControl({numeroMapa = null}) {

  const mapContext = useContext(MapContext);
  const mapContext2 = useContext(MapContext2);
  let contextMap = mapContext
  if (numeroMapa === 'Mapa1' ) {
    contextMap = mapContext;
  } if (numeroMapa === 'Mapa2' ) {
    contextMap = mapContext2;
  }
  const { map } = contextMap;

  useEffect(() => {

    if (!map) return;

    const switcher = new LayerSwitcher({
      reverse: true,
      groupSelectStyle: 'children',
    });
    map.addControl(switcher);

    return () => map.removeControl(switcher);
  }, [map]);

  return null
}

export default LayerSwitcherControl
