import $ from 'jquery';
import { MultiPolygon } from "ol/geom";
import { Feature } from "ol";

export const mappingElements = (elements, layer, finded, mapaId ) => {
  elements.map(
    element => {

      const feature = new Feature({
        geometry: new MultiPolygon(element.wkt)
      });

      feature.setId(element.id)
      layer.getSource().addFeature(feature);

      var value = parseInt(element.id)
      var text = element.name
      const selectId = `finded_id-${mapaId}`;
      const selectElement = $(`#${selectId}`);

      if (finded) selectElement.append(new Option(text, value));
      
      return null
    }
  )
}