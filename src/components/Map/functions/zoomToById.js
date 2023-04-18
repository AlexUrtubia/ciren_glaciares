import $ from 'jquery';

export function zoomToById (map, vectorLayer, id) {
  
  $(`${id}`).on('click', function () {
  
    let glaciar_id = parseInt($('#finded_id').val());
  
    map.getView().fit(
      vectorLayer.getSource().getFeatureById(glaciar_id).getGeometry().getExtent(),
      { maxZoom: 17 }
    )
  })
}