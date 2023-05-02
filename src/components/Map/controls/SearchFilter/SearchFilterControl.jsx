import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import { CustomControl } from "../../functions/customControl"
import { Control } from "ol/control";
import { renderToString } from "react-dom/server";
import SearchForm from "./SearchFilterContainer";
import MapContext2 from "../../../../context/MapContext2";

const SearchFilterControl = ({compare}) => {

  const mapContext = useContext(MapContext);
  const mapContext2 = useContext(MapContext2);
  const { map } = mapContext || mapContext2;

  const customSearch = new CustomControl({
    content: 
      renderToString(
        <SearchForm
          title={'Buscador de glaciares'}
          secondary={'Aplique filtros para desplegar los glaciares que coincidan con la búsqueda '}
        />
      ),
    target: 'map',
    icon: 'search',
    position: {
      id: 'search-filter-region',
      top: compare ? '9px' : '94px',
      left: compare ? '10px' : '10px'
    },
    width: '560px'
  });
  
  useEffect(() => {

    if (!map) return;

    let searchControl = new Control({
      element: customSearch.element,
    }) 

    map.controls.push(searchControl);
    
    return () => map.controls.remove(searchControl);

  }, [map]);

  return null;
};
export default SearchFilterControl;