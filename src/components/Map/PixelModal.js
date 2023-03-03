import React, { Fragment, useContext, useEffect } from "react";
import MapContext from "../../context/MapContext";
import Overlay from "ol/Overlay";
import { renderToString } from "react-dom/server";
import glaciers from "./features/glaciers.json";
import ModalMapDesc from "../Tables/ModalMapDesc";

const OpenModal = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    var container = document.getElementById("popup"),
      content_element = document.getElementById("popup-content"),
      closer = document.getElementById("popup-closer");

    var overlay = new Overlay({
      element: container,
      autoPan: true,
      offset: [0, -10],
    });

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    map.addOverlay(overlay);

    map.on("click", (e) => {
      var coord = e.coordinate;
      let pixel = map.getEventPixel(e.originalEvent);
      map.forEachFeatureAtPixel(pixel, (feature, layer) => {
        if (layer.getVisible()) {
          let vtype = layer.get("vectortype");
          let featureId = feature.getId();
          if (vtype == "glaciers") {
            content_element.innerHTML = renderToString(
              <ModalMapDesc id={featureId} glaciers={glaciers} />
            );
            overlay.setPosition(coord);
          }
        }
      });
    });
  }, [map]);
};
export default OpenModal;
