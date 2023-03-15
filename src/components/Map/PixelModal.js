import React, { Fragment, useState, useContext, useEffect } from "react";
import MapContext from "../../context/MapContext";
import Overlay from "ol/Overlay";
import { renderToString } from "react-dom/server";
import glaciers from "./features/glaciers.json";
import ModalMapDesc from "../Tables/ModalMapDesc";
import ChartComponent from "../charts/ChartComponent";
import { createPortal } from "react-dom";
import { Popover } from "antd";
import { render } from "react-dom";
import MyFooter from "./MapFooter";
import { Button } from 'antd';

const OpenModal = () => {
  const { map } = useContext(MapContext);

  const [overlayContent, setOverlayContent] = useState(null);
  const [overlayElement, setOverlayElement] = useState(null);

  useEffect(() => {
    if (!map) return;

    const container = document.createElement('div');
    container.className = "ol-popup";
    const closer = document.createElement('a');
    closer.href = '#';
    closer.className = 'ol-popup-closer';
    container.appendChild(closer);

    const content = document.createElement('div');
    container.appendChild(content);

    const overlay = new Overlay({
      element: container,
      id:'pop-up',
      autoPan: true,
      offset: [0, -10],
      positioning: 'bottom-center'
    });

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    setOverlayElement(container);
    map.addOverlay(overlay);

    return () => {
      map.removeOverlay(overlay);
    };
  }, [map]);

  useEffect(() => {
    
    if (!overlayElement) return;

    if (overlayContent) {
      render(overlayContent, overlayElement.lastChild);
    } else {
      render(null, overlayElement.lastChild);
    }
  }, [overlayElement, overlayContent]);

  useEffect(() => {
    if (!map) return;

    map.on("click", (e) => {
      var coord = e.coordinate;
      let pixel = map.getEventPixel(e.originalEvent);
      map.forEachFeatureAtPixel(pixel, (feature, layer) => {
        if (layer.getVisible()) {
          let vtype = layer.get("vectortype");
          let featureId = feature.getId();
          if (vtype == "glaciers") {
            console.log('olaaa')
            setOverlayContent(
              <ModalMapDesc
                id={featureId}
                glaciers={glaciers}
              /> 
            );
            map.getOverlayById("pop-up").setPosition(coord);
          }
        }
      });
    });

    return () => {
      map.un("click");
    };
  }, [map, glaciers]);

  // return <div id="popup" />;
};

export default OpenModal;




// const OpenModal = () => {
//   const { map } = useContext(MapContext);
//   const [overlayContent, setOverlayContent] = useState(null);

//   useEffect(() => {
//     if (!map) return;

//     var container = document.createElement("div");
//     container.className = "ol-popup";
//     var closer = document.createElement("a");
//     closer.href = "#";
//     // closer.id = 'popup-closer'
//     closer.className = "ol-popup-closer";
//     container.appendChild(closer);

//     var overlay = new Overlay({
//       element: container,
//       autoPan: true,
//       offset: [0, -10],
//     });

//     closer.onclick = function () {
//       overlay.setPosition(undefined);
//       closer.blur();
//       return false;
//     };

//     map.addOverlay(overlay);

//     map.on("click", (e) => {
//       var coord = e.coordinate;
//       let pixel = map.getEventPixel(e.originalEvent);
//       map.forEachFeatureAtPixel(pixel, (feature, layer) => {
//         if (layer.getVisible()) {
//           let vtype = layer.get("vectortype");
//           let featureId = feature.getId();
//           if (vtype == "glaciers") {
//             setOverlayContent(
//               <ModalMapDesc
//                 id={featureId}
//                 glaciers={glaciers}
//                 chart={<ChartComponent />}
//               />
//             );
//             overlay.setPosition(coord);
//           }
//         }
//       });
//     });
//   }, [map]);

//   return overlayContent ? (
//     createPortal(
//       <div className="ol-popup">
//         {overlayContent}
//       </div>,
//       document.body
//     )
//   ) : null;
// };

// export default OpenModal;

// const OpenModal = () => {
//   const { map } = useContext(MapContext);

//   useEffect(() => {
//     if (!map) return;

//     var container = document.getElementById("popup"),
//       content_element = document.getElementById("popup-content"),
//       closer = document.getElementById("popup-closer");

//     var overlay = new Overlay({
//       element: container,
//       autoPan: true,
//       offset: [0, -10],
//     });

//     closer.onclick = function () {
//       overlay.setPosition(undefined);
//       closer.blur();
//       return false;
//     };

//     map.addOverlay(overlay);

//     map.on("click", (e) => {
//       var coord = e.coordinate;
//       let pixel = map.getEventPixel(e.originalEvent);
//       map.forEachFeatureAtPixel(pixel, (feature, layer) => {
//         if (layer.getVisible()) {
//           let vtype = layer.get("vectortype");
//           let featureId = feature.getId();
//           if (vtype == "glaciers") {
//             content_element.innerHTML = renderToString(
//               <ModalMapDesc id={featureId} glaciers={glaciers} chart={
//                 renderToString(<ChartComponent/>)
//               } />
//             );
//             overlay.setPosition(coord);
//           }
//         }
//       });
//     });
//   }, [map]);
// };
// export default OpenModal;
