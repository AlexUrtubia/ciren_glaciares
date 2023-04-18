import $ from 'jquery';
import { mappingElements } from "./mappingElements";
import { zoomToById } from "./zoomToById";
import { clearLayerByName } from './clearLayerByName';
import { addingWktPoints } from './addWktPoints';


export function handleSearchButtom (map, glaciers, vectorSource, vectorLayer, point_style) {

  const finded = document.getElementById('finded')
  const rowForm = document.getElementById('rowform')
  const textError = document.getElementById('text-error')
  
  finded.style.visibility = 'hidden';
  rowForm.style.height = '0px';

  let reg = parseInt($('#region_id').val());

  let filtrados = glaciers.filter(
    glacier => glacier.region_code == reg
  );

  vectorSource.clear();
  clearLayerByName(map, 'glacier_points')
  addingWktPoints(map, point_style);

  if (filtrados.length > 0) {

    textError.innerText = '';
    finded.style.visibility = 'visible';
    rowForm.style.height = '50px';

    $('#finded_id').empty()

    mappingElements(filtrados, vectorLayer, true)
    zoomToById(map, vectorLayer, '#zoom-to')

  } else {

    if (reg == 0 || reg == -1) {
      textError.innerText = '';
    } else {
      textError.innerText =
        'No se encontraron resultados';
    }
    mappingElements(glaciers, vectorLayer, false);
  }
}