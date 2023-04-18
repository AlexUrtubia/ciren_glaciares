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
import { useParams } from "react-router-dom";
import SearchFilterControl from "./controls/SearchFilter/SearchFilterControl";
import { FilterContext } from '../../context/FilterContext';
import MyFooter from './MapFooter';
import Points from './layers/glaciers/Points';
import LayerSwitcher from './controls/LayerSwitcher';


function ReMap() {

  let { id } = useParams()
  const { center, isFooterOpen, setIsFooterOpen } = React.useContext(FilterContext);

  const handleCloseFooter = () => {
    // Cierra el footer
    setIsFooterOpen(false);
    const footer = document.getElementById("map-footer");
    footer.classList.add("slide-bottom");
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
        
        {/* <GeoGlacier
          style={ Styles.GeoJson }
          zIndex={100}
        /> */}
      </Layers>
      {/* <OpenModal/> */}
      <Controls>
        <LayerSwitcher/>
        <Zoom />
        <FullScreen />
        { !id &&
          <SearchFilterControl />
        }
      </Controls>
      <MyFooter
        isOpen={isFooterOpen}
        onClose={handleCloseFooter}
      /> 
    </Map>
  )
}

export default ReMap