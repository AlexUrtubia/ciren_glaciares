import React from "react";

const MapContext2 = new React.createContext({
  map: null,
  isFooterOpen: false,
  setIsFooterOpen: () => {},
});

export default MapContext2;
