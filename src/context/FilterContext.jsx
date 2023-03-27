import React from "react";
import VectorSource from 'ol/source/Vector'
import OLVectorLayer from "ol/layer/Vector";


export const FilterContext = new React.createContext();

export const FilterProvider = ({children}) => {

  // const [filtered, setFiltered] = React.useState((false))
  const [isFooterOpen, setIsFooterOpen] = React.useState(false);
  const [id, setId] = React.useState('0-0');
  const [center, setCenter] = React.useState([-7871356.531809503, -3972601.1183426552])
  // const [center, setCenter] = React.useState([-70.66, -40.44])

    
  React.useEffect(() => {
    console.log('filtered from context', center)
    
  }, [center]);
  
  return  <FilterContext.Provider value={{ isFooterOpen, setIsFooterOpen, id, setId, center, setCenter }} >
            {children}
          </FilterContext.Provider>
}
