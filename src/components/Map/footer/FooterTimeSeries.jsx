import React from 'react';
import { Descriptions, Image, Badge, Button } from 'antd';
import 'antd-button-color/dist/css/style.css'; // or 'antd-button-color/dist/css/style.less'
import { FaEdit } from "react-icons/fa"
import ChartComponent from "../../charts/ChartComponent"
import glaciers from "../features/glaciers.json"
import WKT from "ol/format/WKT";
import proj4 from 'proj4';
import { FilterContext } from '../../../context/FilterContext';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import { transform } from 'ol/proj';
import View from 'ol/View';


function convertCoords(point) {
  // Definimos la proyección de origen y destino
  const source = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs';
  const dest = '+proj=longlat +datum=WGS84 +no_defs';

  // Convertimos las coordenadas de formato WKT a un array
  const coords = point.replace('POINT (', '').replace(')', '').split(' ');

  // Creamos un objeto point de la clase Point de proj4js
  const pointObj = new proj4(source, dest).forward([parseFloat(coords[0]), parseFloat(coords[1])-8000]);

  // Retornamos las coordenadas convertidas como un objeto { lat, lng }
  return { lat: pointObj[1], lng: pointObj[0] };
}

export default function FooterTimeSeries({ id }) {

  const { setCenter, center, setIsFooterOpen } = React.useContext(FilterContext);
  /* React.useEffect(() => {
    
    // console.log("coords", coords);
    // setCenter([coords["lng"], coords["lat"]]);
    setCenter(center);

  },); */
  // var id = toString(id);

  React.useEffect(() => {
    if (!id) {
    console.log('es undefined')
      return null;
  
    }
  }, [id]);

  if (!id) {
    console.log('es undefined')
    
    return null;

  } else {
    
    const glacier = glaciers.find((glacier) => glacier.id == 10);
    var selectedPoint = glacier.points.find((point) => point.id == id);
    const coords = convertCoords(selectedPoint.point);
  
    return (
      <>
        { id && glacier && selectedPoint && coords &&
        <Descriptions
          title={`Point ${selectedPoint.id}`}
          className="custom-top"
          layout="vertical"
          style={{ padding: "1em" }}
          bordered={true}
          column={2}
        >
          <Descriptions.Item
            span={2}
            className="custom-label-img"
            contentStyle={{ textAlign: "center", justifyContent: "center" }}
          >
            <ChartComponent point_id={id} gla_id={10} />
          </Descriptions.Item>
          <Descriptions.Item
            span={1}
            className="custom-label"
            labelStyle={{ textAlign: "center" }}
            label="Latitud"
          >
            {coords.lat}{" "}
          </Descriptions.Item>
          <Descriptions.Item
            span={1}
            className="custom-label"
            label="Longitud"
          >
            {" "}
            {coords.lng}{" "}
          </Descriptions.Item>
        </Descriptions>
        }
      </>
    );
  }


  

  

  
  


  
}


/* export default function FooterTimeSeries({ id }) {

    const { setCenter, setIsFooterOpen } = React.useContext(FilterContext);
    // const [showChart, setShowChart] = React.useState(null)
    if (id === undefined) {
      setIsFooterOpen(false);
      return null;
    }

    const glacier =  glaciers.find(glacier => glacier.id == 10)
    var selectedPoint = glacier.points.find(point => point.id == id)
    const coords = convertCoords(selectedPoint.point);

    React.useEffect(() => {
      console.log('coords', coords);
      setCenter([coords.lng, coords.lat]);
    }, [id, setCenter]);

    /* React.useEffect(() => {
      
      if (id == undefined) {
        setIsFooterOpen(false)
        return
      } else {
       
        console.log('coords', coords)
        setCenter([coords['lng'], coords['lat']])
      }
    }, [id]); */

  //   return (
  //     <>
  //       <Descriptions title={`Point ${selectedPoint.id}`} 
  //         className="custom-top" 
  //         layout="vertical" 
  //         style={{ padding: '1em' }} 
  //         bordered={true} 
  //         column={2}
  //       >
  //         <Descriptions.Item span={2} className="custom-label-img" contentStyle={{ textAlign: 'center', justifyContent: 'center' }}>
  //           <ChartComponent point_id={id} gla_id={10}/>
  //         </Descriptions.Item>
  //         <Descriptions.Item span={1} className="custom-label" labelStyle={{ textAlign: 'center'}} label="Latitud">{coords.lat} </Descriptions.Item>
  //         <Descriptions.Item span={1} className="custom-label" label="Longitud"> {coords.lng} </Descriptions.Item>
  //       </Descriptions>
  //     </>
  //   );
  // } */

