import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import TileLayer from "./layers/TileLayer"
import Map2 from "./Map2"
import Layers from './layers/Layers'
import { FullScreenControl, Controls, LayerSwitcherControl, SearchFilterControl, ZoomControl } from "./controls"
import { osm } from "./source";
import { xyz } from "./source";
import Styles from "./features/Styles"
import Glaciers from "./layers/glaciers/Glaciers"
import { FilterContext } from '../../context/FilterContext';
import MapFooter from './MapFooter';


function ReMap2({compare = false}) {

  let { id } = useParams()
  const { center } = React.useContext(FilterContext);
  const [isFooterOpen, setIsFooterOpen] = React.useState(false);
  const [ pointId, setPointId ] = React.useState('0-0');

  let numeroMapa = 'Mapa2'

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
    setIsFooterOpen(false);

  };

  const handleOpenFooter = () => {
    setIsFooterOpen(true);
  };


  return (   
    
    <Map2 
      zoom={6.5} 
      center={ center }
    >
      <div id="zoom-container" />
      <Layers>
        <TileLayer 
          numeroMapa={numeroMapa}
          source={osm()}
          zIndex={0}
          title={'Open Street Maps'}
          type={'base'}
        />
        <TileLayer 
          numeroMapa={numeroMapa}
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
          numeroMapa={numeroMapa}
          setPointId={setPointId}
          style={Styles.Filtered}
          point_style={ Styles.SinglePoint }
          zIndex={1}
        /> }

      </Layers>
      <Controls>
        <LayerSwitcherControl 
          numeroMapa={numeroMapa}
        />
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
    </Map2>
  )
}

export default ReMap2