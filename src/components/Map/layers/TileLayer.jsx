import { useContext, useEffect } from "react";
import MapContext from "../../../context/MapContext";
import MapContext2 from "../../../context/MapContext2";
import OLTileLayer from "ol/layer/Tile";


const TileLayer = ({ source, zIndex = 0, title, type, numeroMapa = null }) => {

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
    let tileLayer = new OLTileLayer({
      source,
      zIndex,
      title,
      type,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };

  }, [map]);
  return null;
};
export default TileLayer;