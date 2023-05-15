import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import TileLayer from "./layers/TileLayer"
import Map from "./Map"
import Layers from './layers/Layers'
import { osm } from "./source";
import { xyz } from "./source";
import { FullScreenControl, Controls, LayerSwitcherControl, SearchFilterControl, ZoomControl } from "./controls"
import Styles from "./features/Styles"
import Glaciers from "./layers/glaciers/Glaciers"
import Glacier from "./layers/glaciers/Glacier"
import { FilterContext } from '../../context/FilterContext';
import MapFooter from './MapFooter';



function ReMap({ compare = false }) {
  
  let { id } = useParams()
  const { center } = React.useContext(FilterContext);
  const [isFooterOpen, setIsFooterOpen] = React.useState(false);
  const [ pointId, setPointId ] = React.useState('0-0');
  

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

  let numeroMapa = compare ? 'Mapa1' : ''

  const handleCloseFooter = () => {
    setIsFooterOpen(false);
  };

  const handleOpenFooter = () => {
    setIsFooterOpen(true);
  };

  return (   
    
    <Map 
      zoom={6.5} 
      center={ center }
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
          openFooter={handleOpenFooter}
          setPointId={setPointId}
          numeroMapa={numeroMapa}
          style={Styles.Filtered}
          point_style={ Styles.SinglePoint }
          zIndex={1}
        /> }

        {/* { !id && <Points
          style={ Styles.Point }
          zIndex={2}
          /> } */}

        { id && <Glacier
          openFooter={handleOpenFooter}
          setPointId={setPointId}
          pointId={pointId}
          style={ Styles.MultiPolygon }
          point_style={ Styles.SinglePoint }
          gla_id = { id }
          zIndex={100}
        /> }
      </Layers>
      <Controls>
        <LayerSwitcherControl />
        { !compare && <ZoomControl 
          />}
        { !compare && <FullScreenControl 
          />}
        { !id && <SearchFilterControl 
          compare={compare}
          numeroMapa={numeroMapa}
          />}
      </Controls>
      <MapFooter
        isOpen={isFooterOpen}
        onClose={handleCloseFooter}
        pointId={pointId}
      /> 
    </Map>
  )
}

export default ReMap