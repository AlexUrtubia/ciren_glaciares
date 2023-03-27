import React, {useEffect, useState} from 'react';
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
import MyFooter from './MapFooter';
import Points from './layers/glaciers/Points';

function ReMap() {

  let { id } = useParams()
  const { center, isFooterOpen, setIsFooterOpen } = React.useContext(FilterContext);

  const [footerContent, setFooterContent] = useState({ title: "ola", description: "chao" });

  const handleFeatureClick = (feature) => {

    // Define el contenido del footer según la feature clickeada
    setFooterContent({ 
      title: feature.get("name"), 
      description: feature.get("description")
    });
    // Abre el footer
    // setIsFooterOpen(true);
  };

  const handleCloseFooter = () => {
    // Cierra el footer
    setIsFooterOpen(false);
  };


  return (   
    
    <Map zoom={6.5} 
    center= { center }
    isFooterOpen = {true}
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
          zIndex={1}

        /> }

        { !id && <Points
          style={ Styles.Point }
          zIndex={2}
          />
        }
        { id && <Glacier
          style={ Styles.MultiPolygon }
          point_style={ Styles.Point }

          gla_id = { id }
          zIndex={100}
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
      {  <MyFooter
        isOpen={isFooterOpen}
        onClose={handleCloseFooter}
        title={footerContent.title}
        description={footerContent.description}
      />}
    </Map>
  )
}

export default ReMap