import { useContext, useEffect } from "react";
import MapContext from "../../../../context/MapContext";
import { CustomControl } from "../../functions/customControl"
import { Control } from "ol/control";
import { renderToString } from "react-dom/server";
import SearchForm from "./SearchFilterContainer";

const SearchFilterControl = () => {

  const { map } = useContext(MapContext);

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
      top: '90px',
      left: '10px'
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