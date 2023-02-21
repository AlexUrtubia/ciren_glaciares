import TileLayer from "./layers/TileLayer"
import Map from "./Map"
import Layers from './layers/Layers'
import VectorLayer from "./layers/VectorLayer"
import Controls from "./controls/Control"
import { fromLonLat, get } from 'ol/proj';
import { osm, vector } from "./source";
import FullScreen from "./controls/FullScreenControl"
import Zoom from "./controls/ZoomControl"
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Styles from "./features/Styles"
import GeoJSON from 'ol/format/GeoJSON';
import features from './features/features'
import WKT from "ol/format/WKT";
import VectorSource from 'ol/source/Vector'
import VectorLayerFalopa from 'ol/layer/Vector'
import Glaciers from "./layers/Glaciers"

const obj1 = features.geojsonObject


function ReMap() {

  return (   
    
    <Map zoom={4.5} 
      center= { fromLonLat([-70.66, -40.44]) }
      >
      <div id="zoom-container" />
      <Layers>
        <TileLayer 
        source={osm()}
        zIndex={0}
        />
        
        <VectorLayer 
          source={
            vector({ 
              features: new GeoJSON().readFeatures(obj1, { featureProjection: get('EPSG:3857') }) })}
          style={Styles.MultiPolygon}
        />
        
        <Glaciers
          style={Styles.MultiPolygon}
          />
      
      </Layers>
      <Controls>
        <Zoom />
        <FullScreen />
      </Controls>
    </Map>
  )
}

export default ReMap