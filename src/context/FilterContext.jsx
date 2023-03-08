import React from "react";
import VectorSource from 'ol/source/Vector'
import OLVectorLayer from "ol/layer/Vector";


export const FilterContext = new React.createContext();

export const FilterProvider = ({children}) => {

  const [filtered, setFiltered] = React.useState((false))
  
  let vectorSource = new VectorSource
  
  let vectorLayer = new OLVectorLayer({
      source: vectorSource,
      // style
  }); 
    
  React.useEffect(() => {
    console.log('filtered from context', filtered)
    
  }, [filtered]);
  
  return  <FilterContext.Provider value={{filtered, setFiltered, vectorLayer, vectorSource}} >
            {children}
          </FilterContext.Provider>
}
