import React, { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import MapContext2 from "../../../../context/MapContext2";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from "../../features/glaciers.json";
import vectorSource from "ol/source/Vector";
import $ from "jquery";
import { mappingElements } from "../../functions/mappingElements";
import { handleSearchButtom } from "../../functions/searchButtonHandler";
import { addingWktPoints } from "../../functions/addWktPoints";
import { openMapFooter } from "../../functions/openMapFooter";
import { FilterContext } from "../../../../context/FilterContext";
import { hitToleranceByZoom } from "../../functions/hitToleranceByZoom";
import { clearLayerByName } from "../../functions/clearLayerByName";

const Glaciares = ({ style, point_style, zIndex = 0, openFooter }) => {

  const mapContext = useContext(MapContext);
  const mapContext2 = useContext(MapContext2);
  // console.log('mapContex1', mapContext)
  // console.log('mapContex2', mapContext2)
  const { map } = mapContext || mapContext2;

  // const map = contextMap
  // const {  } = React.useContext(MapContext)

  const { setId } = useContext(FilterContext);


  useEffect(() => {

    if (!map) return;

    const resolution = map.getView().getResolution();
    const hitTolerance = hitToleranceByZoom(resolution);
    openMapFooter(map, setId, openFooter, hitTolerance);

    // falta limpiar puntos al hacer search
    let VectorSource = new vectorSource();
    let VectorLayer = new OLVectorLayer({
      source: VectorSource,
      style,
    });

    $(document).on("click", "#search-button", function () {
      handleSearchButtom(map, glaciers, VectorSource, VectorLayer, point_style);
    });

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
