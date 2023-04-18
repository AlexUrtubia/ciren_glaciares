import $ from 'jquery';
import { MultiPolygon } from "ol/geom";
import { Feature } from "ol";

export const mappingElements = (elements, layer, finded ) => {
  elements.map(
    element => {

      const feature = new Feature({
        geometry: new MultiPolygon(element.wkt)
      });

      feature.setId(element.id)
      layer.getSource().addFeature(feature);

      var value = element.id
      var text = element.name
      {
        finded && $('#finded_id').append(new Option(text, value))
      }
    }
  )
}