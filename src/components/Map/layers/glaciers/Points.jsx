import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from '../../features/glaciers.json'
import WKT from "ol/format/WKT";
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature.js';
import { FilterContext } from "../../../../context/FilterContext";
import View from 'ol/View';
import { transform } from 'ol/proj';

const Points = ({  style, zIndex = 999 }) => {

  const { map } = useContext(MapContext);
  const { id, setCenter, center, setIsFooterOpen, setId } = useContext(FilterContext);

  var pointsLayer = new OLVectorLayer({
    source: new VectorSource({
      features: [],
    }),
    style
  });

  let resolution

  useEffect(() => {

    if (!map) return;

    glaciers.map(
      glacier => {
        var selectedGla = Object.entries(glacier)[13][1]
        selectedGla.map( points => {
          var wkt = points.point.replace(',', '')
          // console.log('point', points.point.replace(',', ''))
          var wktFormat = new WKT();
          var point = wktFormat.readFeature(wkt);
          point.setId(points.id)
          // console.log('points', points.id)
          pointsLayer.getSource().addFeature(point);

          /* const geometry = wktFormat.readGeometry(points.point.replace(',', ''), {
            dataProjection: "EPSG:3857",
            featureProjection: "EPSG:3857",
          });
          const feature = new Feature({
            geometry: geometry,
            id: points.id
          });
          vectorLayer.getSource().addFeature(feature); */
        })
        
      })
      map.addLayer(pointsLayer);
      pointsLayer.setZIndex(zIndex);
      pointsLayer.set('vectortype', 'glaciers_points');

      map.on('click', function(event) {
        // Obtener la feature clickeada
        var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
          return feature;
        }, 
        // {
        //   hitTolerance: 10
        // }
        );
        let vtype = pointsLayer.get("vectortype");
        console.log('vtype', vtype)
        // Si hay una feature, obtener su ID
        if (feature) {
          var featureId = feature.getId();
          console.log('ID del punto clickeado:', featureId);
          setId(featureId);
        }
        setCenter(event.coordinate);
      });

    return () => {
      if (map) {
        map.removeLayer(pointsLayer);
      }
    };
  }, [map]);

  if (map) {
    resolution = map.getView().getResolution()
  }

  useEffect(() => {

    if (!map) return;
    // console.log('resolution', resolution)
    // var features = pointsLayer.getSource().getFeatures()
    console.log('features', )
    // features.getStyle().getImage().setRadius(radius)
    map.getView().on('change:resolution', function() {
      
      let resolution = this.getResolution();
      // console.log('resolution', resolution, vectorLayer.get('vectortype'))
      var radius = 3
      if (resolution <= 100) {
        radius = 9; // aumenta el radio para zooms más cercanos
      } else if (resolution > 100 && resolution <= 500) {
        radius = 6;
      } else if (resolution >= 500) {
        radius = 2;
      }
      pointsLayer.getStyle().getImage().setRadius(radius)
    })
  }, [map, id, center]);

  // useEffect(() => {
  //   if (!map) return;
    
  //   map.on("click", (e) => {
  //     let tolerance = 1000;
  //     let pixel = map.getEventPixel(e.originalEvent);
      
  //     // Transforma las coordenadas del pixel a la proyección del mapa
  //     let coord = map.getCoordinateFromPixel(pixel);
  //     console.log('coord', coord)
  //     // coord = transform(coord, map.getView().getProjection(), 'EPSG:4326');
  //     // console.log('coord2', coord)
  //     // Añade el radio de tolerancia alrededor del punto clickeado
  //     let extent = [coord[0] - tolerance, coord[1] - tolerance, coord[0] + tolerance, coord[1] + tolerance];
    
  //     // Busca las features dentro del radio de tolerancia
  //     map.forEachFeatureAtPixel(pixel, (feature, layer) => {
  //       console.log('first', pixel)
  //       if (layer.getVisible()) {
  //         let vtype = layer.get("vectortype");
  //         console.log('vtype', vtype);
  //       } else {
  //         console.log('no hay na');
  //       }
  //     }, {hitTolerance: tolerance, layerFilter: (layer) => layer.get('vectortype') === 'glaciers_points' && layer.getVisible(), extent: extent});
  //   });
    
    
  //   // map.on("click", (e) => {
  //   //   console.log('e.coordinate', e.coordinate)
  //   //   let pixel = map.getEventPixel(e.originalEvent);
  //   //   console.log('vtype', pixel)
  //   //   map.forEachFeatureAtPixel(pixel, (feature, layer) => {
  //   //     if (layer.getVisible()) {
  //   //       let vtype = layer.get("vectortype");
  //   //       // let featureId = feature.getId();
  //   //       /* if (vtype == "glaciers_points") {
  //   //         setIsFooterOpen(true);
  //   //         setId(featureId);

  //   //         var distance = -5000; // Distancia en metros
  //   //         var bearing = 180; // Dirección en grados (0° = norte, 90° = este, 180° = sur, 270° = oeste)
  //   //         var coord = e.coordinate;
            
  //   //         var newCoordinates = [
  //   //           coord[0] + (distance * Math.sin(bearing * Math.PI / 180)),
  //   //           coord[1] - (distance * Math.cos(bearing * Math.PI / 180))
  //   //         ];
  //   //         // setCenter(fromLonLat([newCoordinates[0], newCoordinates[1]]));

  //   //         console.log('coord', coord, featureId, newCoordinates)
            
  //   //         var newView = new View({
  //   //           center: newCoordinates,
  //   //           zoom: 11 // Zoom deseado
  //   //         });
  //   //         map.setView(newView);
  //   //       } */
  //   //     } else {
  //   //       console.log('no hay na')
  //   //     }
  //   //   },  {
  //   //     hitTolerance: 999
  //   //   });
  //   // });

  //   return 
    
  // }, [map, glaciers, id]);


  return null;
};
export default Points;