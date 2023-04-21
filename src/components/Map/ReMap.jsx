import React, {useEffect, useState} from 'react';
import TileLayer from "./layers/TileLayer"
import Map from "./Map"
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


function ReMap({compare = false}) {

  let { id } = useParams()
  // const location = useLocation().pathname
  const { center, isFooterOpen, setIsFooterOpen } = React.useContext(FilterContext);
  const searchFilter = document.getElementById('#search-filter-region');
  console.log('searchFilter', searchFilter)
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

  return (   
    
    <Map 
      zoom={6.5} 
      center= { center }
      isFooterOpen = {true}
    >
      <div id="zoom-container" />
      <Layers>
        <TileLayer 
          source={osm()}
          zIndex={0}
          title={'Open Street Maps'}
          type={'base'}
        />
        <TileLayer 
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
          style={Styles.Filtered}
          point_style={ Styles.SinglePoint }
          zIndex={1}
        /> }

        {/* { !id && <Points
          style={ Styles.Point }
          zIndex={2}
          /> } */}

        { id && <Glacier
          style={ Styles.MultiPolygon }
          point_style={ Styles.SinglePoint }
          gla_id = { id }
          zIndex={100}
        /> }
      </Layers>
      <Controls>
        <LayerSwitcher />
        { !compare && <Zoom />}
        { !compare && <FullScreen />}
        { !id && <SearchFilterControl />}
      </Controls>
      <MapFooter
        isOpen={isFooterOpen}
        onClose={handleCloseFooter}
      /> 
    </Map>
  )
}

export default ReMap