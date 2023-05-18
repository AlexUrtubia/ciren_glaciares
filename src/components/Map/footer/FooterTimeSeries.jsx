import React from 'react';
import { Descriptions } from 'antd';
import ChartComponent from "../../charts/ChartComponent"
import glaciers from "../features/glaciers.json"
import { convertCoords } from '../functions/convertCoords';

export default function FooterTimeSeries({ id }) {

  if (typeof id === 'number') {
    return null
  }
  if (id.includes('-') && id !== '0-0' ) {
    
    var id_code = id.split('-')
    const glacier = glaciers.find((glacier) => glacier.id === Number(id_code[0]));
    var selectedPoint = glacier.points.find((point) => point.id === id);
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
            <ChartComponent point_id={id} gla_id={id_code[0]} />
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
  } else {

    return null;
  }
}
