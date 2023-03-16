import React from "react";
import VectorSource from 'ol/source/Vector'
import OLVectorLayer from "ol/layer/Vector";


export const FilterContext = new React.createContext();

export const FilterProvider = ({children}) => {

  // const [filtered, setFiltered] = React.useState((false))
  const [isFooterOpen, setIsFooterOpen] = React.useState(false);
  const [id, setId] = React.useState(1);
    
  /* React.useEffect(() => {
    console.log('filtered from context', filtered)
    
  }, [filtered]); */
  
  return  <FilterContext.Provider value={{ isFooterOpen, setIsFooterOpen, id, setId }} >
            {children}
          </FilterContext.Provider>
}
