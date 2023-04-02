import React, { useEffect, useContext } from 'react';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import MapContext from "../../../context/MapContext";


function LayerSwitcherControl() {

  const { map } = useContext(MapContext);

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
