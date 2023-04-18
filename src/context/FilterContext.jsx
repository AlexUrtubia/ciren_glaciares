import React from "react";
import VectorSource from 'ol/source/Vector'
import OLVectorLayer from "ol/layer/Vector";


export const FilterContext = new React.createContext();

export const FilterProvider = ({children}) => {

  // const [filtered, setFiltered] = React.useState((false))
  const [isFooterOpen, setIsFooterOpen] = React.useState(false);
  const [id, setId] = React.useState('0-0');
  const [center, setCenter] = React.useState([-7871356.531809503, -3972601.1183426552])
  const [hitTolerance, setHitTolerance] = React.useState(10)

  return  <FilterContext.Provider value={{ isFooterOpen, setIsFooterOpen, id, setId, center, setCenter, hitTolerance, setHitTolerance }} >
            {children}
          </FilterContext.Provider>
}
