import React from "react";

export const MapContext = new React.createContext({
  map: null,
  isFooterOpen: false,
  setIsFooterOpen: () => {},
});

