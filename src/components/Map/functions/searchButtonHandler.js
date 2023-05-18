import $ from 'jquery';
import { mappingElements } from "./mappingElements";
import { zoomToById } from "./zoomToById";
import { clearLayerByName } from './clearLayerByName';
import { addingWktPoints } from './addWktPoints';

export function handleSearchButtom (map, glaciers, vectorSource, vectorLayer, point_style, mapaId = '') {

  const finded = document.getElementById(`finded-${mapaId}`)
  const rowForm = document.getElementById(`rowform-${mapaId}`)
  const textError = document.getElementById(`text-error-${mapaId}`)
  
  finded.style.visibility = 'hidden';
  rowForm.style.height = '0px';
  const inputSelector = `#region_id-${mapaId}`
  const reg = parseInt($(inputSelector).val());

  console.log('map desde hnaldesearh', reg)

  let filtrados = glaciers.filter(
    glacier => reg === 0 ? true : Number(glacier.region_code) === reg
  );

  vectorSource.clear();
  clearLayerByName(map, 'glacier_points')
  addingWktPoints(map, point_style);

  if (filtrados.length > 0) {

    textError.innerText = '';
    finded.style.visibility = 'visible';
    rowForm.style.height = '50px';

    $(`#finded_id-${mapaId}`).empty()

    mappingElements(filtrados, vectorLayer, true, mapaId)
    zoomToById(map, vectorLayer, `#zoom-to-${mapaId}`, mapaId)

  } else {

    if (reg === 0 || reg === -1) {
      textError.innerText = '';
    } else {
      textError.innerText =
        'No se encontraron resultados';
    }
    mappingElements(glaciers, vectorLayer, false, mapaId);
  }
}