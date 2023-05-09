import $ from 'jquery';

export function zoomToById (map, vectorLayer, id, mapaId) {
  
  $(`${id}`).on('click', function () {

    const inputSelector = `#finded_id-${mapaId}`
    const glaciar_id = parseInt($(inputSelector).val());
    console.log('glaciar_id', glaciar_id)
    map.getView().fit(
      vectorLayer.getSource().getFeatureById(glaciar_id).getGeometry().getExtent(),
      { maxZoom: 17 }
    )
  })
}