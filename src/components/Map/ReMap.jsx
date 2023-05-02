import React, {useEffect, useState} from 'react';
import TileLayer from "./layers/TileLayer"
import Map from "./Map"
import MapContext from "./Map"
import Layers from './layers/Layers'
import Controls from "./controls/Controls"
import { osm } from "./source";
import { xyz } from "./source";
import FullScreen from "./controls/FullScreenControl"
import Zoom from "./controls/ZoomControl"
import Styles from "./features/Styles"
import Glaciers from "./layers/glaciers/Glaciers"
import Glacier from "./layers/glaciers/Glacier"
import GeoGlacier from "./layers/glaciers/GeoGlacier"
import { useParams, useLocation  } from "react-router-dom";
import SearchFilterControl from "./controls/SearchFilter/SearchFilterControl";
import { FilterContext } from '../../context/FilterContext';
import MapFooter from './MapFooter';
import Points from './layers/glaciers/Points';
import LayerSwitcher from './controls/LayerSwitcher';
// import MapContext from '../../context/MapContext';


function ReMap({compare = false, mapContext }) {
  
  // const { map } = React.useContext(MapContext)
  // const map = mapContext
  let { id } = useParams()
  // const location = useLocation().pathname
  // const { center, isFooterOpen, setIsFooterOpen } = React.useContext(FilterContext);
  const { center } = React.useContext(FilterContext);
  const [isFooterOpen, setIsFooterOpen] = React.useState(true);
  // const { isFooterOpen, setIsFooterOpen } = React.useContext(MapContext); // utiliza el hook useContext para acceder al contexto

  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaADDDDDDDDDDDDDSDSdSDSDmap', setIsFooterOpen)

  useEffect(() => {

    setTimeout(() => {
      const layerSwitchers = document.querySelectorAll('.layer-switcher');

      layerSwitchers.forEach(layerSwitcher => {
        if (layerSwitcher) {
          if (compare) {
            layerSwitcher.style.top = '0';
          } else {
            layerSwitcher.style.top = '1';
          }
        }
      });
    }, 100);
  }, [compare]);


  const handleCloseFooter = () => {
    // Cierra el footer
    setIsFooterOpen(false);
    // const footer = document.getElementById("map-footer");
    // footer.classList.add("slide-bottom");
  };

  const handleOpenFooter = () => {
    // Cierra el footer
    setIsFooterOpen(true);
    // const footer = document.getElementById("map-footer");
    // footer.classList.add("slide-bottom");
  };

  return (   
    
    <Map 
      zoom={6.5} 
      center={ center }
    >
      <div id="zoom-container" />
      <Layers>
        <TileLayer 
          // map={map}
          source={osm()}
          zIndex={0}
          title={'Open Street Maps'}
          type={'base'}
        />
        <TileLayer 
          // map={map}
          source={xyz(
            {
              url:'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
              mazZoom: 16
            }
          )}
          zIndex={0}
          title={'Satelital'}
          type={'base'}
        />
        { !id && <Glaciers
          openFooter={handleOpenFooter}
          // map={map}
          // contextMap={map}
          style={Styles.Filtered}
          point_style={ Styles.SinglePoint }
          zIndex={1}
        /> }

        { !id && <Points
          style={ Styles.Point }
          zIndex={2}
          /> }

        { id && <Glacier
          // map={map}

          style={ Styles.MultiPolygon }
          point_style={ Styles.SinglePoint }
          gla_id = { id }
          zIndex={100}
        /> }
      </Layers>
      <Controls>
        <LayerSwitcher 
          // map={map}
        />
        { !compare && <Zoom 
          // map={map}
          />}
        { !compare && <FullScreen 
          // map={map}
          />}
        { !id && <SearchFilterControl compare={compare}
          // map={map}
          />}
      </Controls>
      <MapFooter
        isOpen={isFooterOpen}
        onClose={handleCloseFooter}
      /> 
    </Map>
  )
}

export default ReMap