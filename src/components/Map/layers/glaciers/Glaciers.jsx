import { useContext, useEffect } from "react";
import { MapContext, MapContext2 } from "../../../../context";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from "../../features/glaciers.json";
import vectorSource from "ol/source/Vector";
import $ from "jquery";
import { addingWktPoints, hitToleranceByZoom, handleSearchButtom, mappingElements, openMapFooter } from "../../functions";


const Glaciares = ({ style, point_style, zIndex = 0, openFooter, numeroMapa = '', setPointId }) => {

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

    const resolution = map.getView().getResolution();
    const hitTolerance = hitToleranceByZoom(resolution);
    openMapFooter(map, setPointId, openFooter, hitTolerance);

    let VectorSource = new vectorSource();
    let VectorLayer = new OLVectorLayer({
      source: VectorSource,
      style,
    });

    $(document).on("click", `#search-button-${numeroMapa}`, function () {
      VectorSource.clear();
      handleSearchButtom(map, glaciers, VectorSource, VectorLayer, point_style, numeroMapa);
    });

    addingWktPoints(map, point_style );
    mappingElements(glaciers, VectorLayer, false);

    map.addLayer(VectorLayer);
    VectorLayer.setZIndex(zIndex);
    VectorLayer.set("vectortype", "glaciers");

    return () => {
      if (map) {
        map.removeLayer(VectorLayer);
      }
    };
  }, [map]);

  return null;
};

export default Glaciares; 
