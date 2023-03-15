import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import glaciers from '../../features/glaciers.json'
import WKT from "ol/format/WKT";
import vectorSource from 'ol/source/Vector'
import $ from 'jquery';

const mapping_elements = (elements, layer, founded, onFeatureClick) => {
  elements.map(
    element => {
      const wktFormat = new WKT();
      const geometry = wktFormat.readFeature(element.wkt, {
        dataProjection: "EPSG:3857",
        featureProjection: "EPSG:3857",
      });
      geometry.setId(element.id)
      layer.getSource().addFeature(geometry);
      //

      geometry.on('click', () => {
        if (onFeatureClick) {
          onFeatureClick(element);
        }
      });

      var value = element.id
      var text = element.name
      {
        founded && $('#founded_id').append(new Option(text, value))
      }
    }
  )
}

const Glaciares = ({ style, zIndex = 0, onFeatureClick }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let VectorSource = new vectorSource();
    let VectorLayer = new OLVectorLayer({
      source: VectorSource,
      style,
    });

    $(document).on('click', '#search-button', function () {
      document.getElementById('founded').style.visibility = 'hidden';
      document.getElementById('rowform').style.height = '0px';

      let reg = parseInt($('#region_id').val());
      let filtrados = glaciers.filter(
        (glacier) => glacier.region_code == reg
      );
      VectorSource.clear();
      if (filtrados.length > 0) {
        document.getElementById('text-error').innerText = '';
        document.getElementById('founded').style.visibility = 'visible';
        document.getElementById('rowform').style.height = '50px';

        $('#founded_id').empty();
        mapping_elements(filtrados, VectorLayer, true, onFeatureClick);

        $('#zoom-to').click(function () {
          let glaciar_id = parseInt($('#founded_id').val());
          map.getView().fit(
            VectorLayer.getSource().getFeatureById(glaciar_id).getGeometry().getExtent(),
            { maxZoom: 17 }
          );
        });
      } else {
        if (reg == 0 || reg == -1) {
          document.getElementById('text-error').innerText = '';
        } else {
          document.getElementById('text-error').innerText =
            'No se encontraron resultados';
        }
        mapping_elements(glaciers, VectorLayer, false, onFeatureClick);
      }
    });

    mapping_elements(glaciers, VectorLayer, false, onFeatureClick);

    map.addLayer(VectorLayer);
    VectorLayer.setZIndex(zIndex);
    VectorLayer.set('vectortype', 'glaciers');

    VectorLayer.on('click', (event) => {
      if (onFeatureClick) {
        onFeatureClick(event.target);
      }
    });

    return () => {
      if (map) {
        map.removeLayer(VectorLayer);
      }
    };
  }, [map]);

  return null;
};

export default Glaciares;