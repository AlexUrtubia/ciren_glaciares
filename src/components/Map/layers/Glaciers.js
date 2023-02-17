import { useContext, useEffect } from "react";
import MapContext from "../../../context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from '../features/glaciers.json'
import WKT from "ol/format/WKT";
import VectorSource from 'ol/source/Vector'


const Glaciares = ({  style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let Vectorsource = new VectorSource
    let VectorLayer = new OLVectorLayer({
      source: Vectorsource,
      style
    });

    glaciers.map(
      glacier => {
        const wktFormat = new WKT();
        const geometry = wktFormat.readFeature(glacier.wkt, {
          dataProjection: "EPSG:3857",
          featureProjection: "EPSG:3857",
        });
        VectorLayer.getSource().addFeature(geometry);
      }
    )

    map.addLayer(VectorLayer);
    VectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(VectorLayer);
      }
    };
  }, [map]);
  return null;
};
export default Glaciares;