import { useContext, useEffect } from "react";
import { MapContext } from "../../../../context";
import glaciers from '../../features/glaciers.json'
import { addGlacierPoints, openMapFooter } from "../../functions";
// ol
import { Feature } from "ol";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from 'ol/source/Vector'
import { MultiPolygon, } from "ol/geom";

const Glaciar = ({  style, point_style, zIndex = 0, gla_id, openFooter, pointId, setPointId }) => {

  const { map } = useContext(MapContext);

  useEffect(() => {

    if (!map) return;
    let Vectorsource = new VectorSource
    let VectorLayer = new OLVectorLayer({
      source: Vectorsource,
      style: style
    });

    const glacier =  glaciers.find(glacier => glacier.id == gla_id)

    const feature = new Feature({
      geometry: new MultiPolygon(glacier.wkt)
    });
    
    VectorLayer.getSource().addFeature(feature);

    map.addLayer(VectorLayer);
    VectorLayer.setZIndex(zIndex);
    VectorLayer.set('vectortype', 'glaciers');

    addGlacierPoints(map, point_style, glacier)
    openMapFooter(map, setPointId, openFooter);

    map.getView().fit(
      VectorLayer.getSource().getExtent(),
    {"maxZoom":12} );   

    return () => {
      if (map) {
        map.removeLayer(VectorLayer);
      }
    };

  }, [map]);

  return null;
};
export default Glaciar;