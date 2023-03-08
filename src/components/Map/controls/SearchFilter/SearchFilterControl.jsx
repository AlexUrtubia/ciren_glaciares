import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
// import {OpenLayersContent} from "./content"
import { CustomControl } from "../customControl"
import { Control } from "ol/control";
import { renderToString } from "react-dom/server";
import SearchForm from "./SearchFilterContainer";
import SearchFilterForm from "./Forms/SearchFilterForm"
// import { FilterContext } from '../../../../context/FilterContext';


const customControl = new CustomControl({
  content: renderToString(
  <SearchForm 
    title={'Buscador de glaciares'}
    secondary={'Aplique filtros para desplegar los glaciares que coincidan con la búsqueda '}
    form={<SearchFilterForm/>}
  />),
  target: 'map',
  icon: 'search',
  position: {
    top: '90px', // Distancia en píxeles desde la esquina superior izquierda del mapa
    left: '10px'
  },
  width: '560px'
});


const SearchFilterControl = () => {

  const { map } = useContext(MapContext);
  // const { filtered, setFiltered, vectorSource, vectorLayer } =  useContext(FilterContext)
  
  useEffect(() => {

    if (!map) return;
    let searchControl = new Control({
      element: customControl.element,
    }) 
    
    map.controls.push(searchControl);
    
    return () => map.controls.remove(searchControl);
  }, [map]);
  return null;
};
export default SearchFilterControl;
