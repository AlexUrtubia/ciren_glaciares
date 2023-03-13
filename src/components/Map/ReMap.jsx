import React from 'react';
import MapContext from "../../context/MapContext";
import TileLayer from "./layers/TileLayer"
import Map from "./Map"
import Layers from './layers/Layers'
import Controls from "./controls/Controls"
import { fromLonLat } from 'ol/proj';
import { osm } from "./source";
import FullScreen from "./controls/FullScreenControl"
import Zoom from "./controls/ZoomControl"
import Styles from "./features/Styles"
import Glaciers from "./layers/glaciers/Glaciers"
import Glacier from "./layers/glaciers/Glacier"
import { useParams } from "react-router-dom";
import OpenModal from "./PixelModal"
import SearchFilterControl from "./controls/SearchFilter/SearchFilterControl";
import { FilterContext } from '../../context/FilterContext';

function ReMap() {

  let { id } = useParams()
  // let { filtered } = React.useContext(FilterContext)


  return (   
    
    <Map zoom={4.5} 
    center= { fromLonLat([-70.66, -40.44]) }
    >
      <div id="zoom-container" />
      {/* <div id="popup" className="ol-popup">
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        <div id="popup-content">
        </div>
      </div> */}
      <Layers>

        <TileLayer 
        source={osm()}
        zIndex={0}
        />
        
        { !id && <Glaciers
          style={Styles.Filtered}
        /> }

        { id && <Glacier
          style={ Styles.MultiPolygon }
          id = { id }
        /> }

      </Layers>
      <OpenModal/>
      <Controls>
        <Zoom />
        <FullScreen />
        { !id &&
          <SearchFilterControl />
        }
      </Controls>
    
    </Map>
  )
}

export default ReMap