import React, { Fragment, useState, useContext, useEffect } from "react";
import MapContext from "../../context/MapContext";
import { FilterContext } from "../../context/FilterContext";
import Overlay from "ol/Overlay";
import { renderToString } from "react-dom/server";
import glaciers from "./features/glaciers.json";
import FooterTimeSeries from "./footer/FooterTimeSeries";
import ChartComponent from "../charts/ChartComponent";
import { Popover } from "antd";
import { render } from "react-dom";
import { translate } from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import { transform } from 'ol/proj';
import View from 'ol/View';


import MyFooter from "./MapFooter";
import { Button } from 'antd';
import {getCenter, getHeight, getTop} from 'ol/extent';
import { fromLonLat } from 'ol/proj';



const OpenModal = () => {
  const { map } = useContext(MapContext);
  const { setIsFooterOpen, setId, id, setCenter} = useContext(FilterContext);

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
      console.log('e.coordinate', e.coordinate)
      let pixel = map.getEventPixel(e.originalEvent);
      map.forEachFeatureAtPixel(pixel, (feature, layer) => {
        if (layer.getVisible()) {
          let vtype = layer.get("vectortype");
          let featureId = feature.getId();
          if (vtype == "glaciers") {
            setIsFooterOpen(true);
            setId(featureId);

            var distance = -5000; // Distancia en metros
            var bearing = 180; // Dirección en grados (0° = norte, 90° = este, 180° = sur, 270° = oeste)
            var coord = e.coordinate;
            
            var newCoordinates = [
              coord[0] + (distance * Math.sin(bearing * Math.PI / 180)),
              coord[1] - (distance * Math.cos(bearing * Math.PI / 180))
            ];
            // setCenter(fromLonLat([newCoordinates[0], newCoordinates[1]]));

            console.log('coord', coord, featureId, newCoordinates)
            
            var newView = new View({
              center: newCoordinates,
              zoom: 11 // Zoom deseado
            });
            map.setView(newView);
          }
        }
      });
    });

    return 
    
  }, [map, glaciers, id]);

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
