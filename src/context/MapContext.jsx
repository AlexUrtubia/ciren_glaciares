import React from "react";

const MapContext = new React.createContext({
  map: null,
  isFooterOpen: false,
  setIsFooterOpen: () => {},
});

export default MapContext;
