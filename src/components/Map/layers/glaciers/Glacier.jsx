import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from '../../features/glaciers.json'
import WKT from "ol/format/WKT";
import VectorSource from 'ol/source/Vector'
import { FilterContext } from "../../../../context/FilterContext";


const Glaciar = ({  style, point_style, zIndex = 0, gla_id }) => {

  const { map } = useContext(MapContext);
  const { id, setIsFooterOpen, setId } = useContext(FilterContext);

    var pointsLayer = new OLVectorLayer({
      source: new VectorSource({
        features: [],
      }),
      style: point_style,
      name: 'glacier_points'
    });

  useEffect(() => {

    if (!map) return;
    let Vectorsource = new VectorSource
    let VectorLayer = new OLVectorLayer({
      source: Vectorsource,
      style: style
    });

    const glacier =  glaciers.find(glacier => glacier.id == gla_id)
    const wktFormat = new WKT();
    const geometry = wktFormat.readFeature(glacier.wkt, {
      dataProjection: "EPSG:3857",
      featureProjection: "EPSG:3857",
    });
    
    const selectedGla = Object.entries(glacier)[13][1]
    console.log('selectedGla', selectedGla)
    selectedGla.map( point => {console.log('point', point)})

    // geometry.setId(glacier.id)
    VectorLayer.getSource().addFeature(geometry);

    map.addLayer(VectorLayer);
    VectorLayer.setZIndex(zIndex);
    VectorLayer.set('vectortype', 'glaciers');



    selectedGla.map( points => {
      var wkt = points.point.replace(',', '')
      console.log('points', wkt)
      // console.log('point', points.point.replace(',', ''))
      var wktFormat = new WKT();
      var point = wktFormat.readFeature(wkt);
      point.setId(points.id)
      // console.log('points', points.id)
      pointsLayer.getSource().addFeature(point);
    })

    map.addLayer(pointsLayer);
    pointsLayer.setZIndex(9);

          map.on('click', function(event) {
        // Obtener la feature clickeada
        var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
          return layer.get('zIndex') === 9 ? feature : undefined;
        }, 
        {
          hitTolerance: 40
        }
        );
        // Si hay una feature, obtener su ID
        if (feature) {
          var featureId = feature.getId();
          console.log('ID del punto clickeado:', featureId);
          setId(featureId);
          // setIsFooterOpen(false)
          setIsFooterOpen(true)
        }
        // setCenter(event.coordinate);
      });

    map.getView().fit(
      VectorLayer.getSource().getExtent(),
    {"maxZoom":12} );   
      
    // var layer = map.getLayerByName('glacier_points');

/*     layer.on('click', function(event) {
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

      }); */

    return () => {
      if (map) {
        map.removeLayer(VectorLayer);
      }
    };
  }, [map]);

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
        radius = 12; // aumenta el radio para zooms más cercanos
      } else if (resolution > 100 && resolution <= 300) {
        radius = 6;
      } else if (resolution > 300 && resolution <= 500) {
        radius = 4;
      } else if (resolution > 500) {
        radius = 2;
      }
      pointsLayer.getStyle().getImage().setRadius(radius)
    })
  }, [map, id ]);

  return null;
};
export default Glaciar;