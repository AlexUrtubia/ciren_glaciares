import React from 'react';
import { Descriptions, Image, Badge, Button } from 'antd';
import 'antd-button-color/dist/css/style.css'; // or 'antd-button-color/dist/css/style.less'
import { FaEdit } from "react-icons/fa"
import ChartComponent from "../charts/ChartComponent"
import glaciers from "../Map/features/glaciers.json"

export default function ModalMapDesc({ id, chart }) {
    const [showChart, setShowChart] = React.useState(null)
    console.log('id from modal ', id)
    const glacier =  glaciers.find(glacier => glacier.id == id)
    var dateFormat = new Date(glacier.creation);
    var fecha = dateFormat.getDate()+ "/" + (dateFormat.getMonth()+1)+ "/"+dateFormat.getFullYear()

    React.useEffect(() => {
      setShowChart(true)

    }, [id])
    

    return (
      <>
        <Descriptions title={`Glaciar ${glacier.name}`} 
          className="custom-top" 
          layout="vertical" 
          style={{ padding: '1em' }} 
          bordered={true} 
          column={3}
          extra={
            <a href={`/glaciers/${glacier.id}`}>
              <Button
                title="Editar"
                type={"primary"}
                icon={<FaEdit />}
              />
            </a>
          }
        >
          <Descriptions.Item span={3} className="custom-label-img" contentStyle={{ textAlign: 'center', justifyContent: 'center' }}>
            {/* { chart } */}
            { showChart &&

            <ChartComponent id={glacier.id}/>
            }
            {/* <Image preview={false}  src={glacier.img} width={'100%'} /> */}
          </Descriptions.Item>
          <Descriptions.Item span={3} className="custom-label" labelStyle={{ textAlign: 'center'}} label="Descripción">{glacier.description} </Descriptions.Item>
          <Descriptions.Item span={1} className="custom-label" label="Región"> {glacier.attributes.NOM_REG} </Descriptions.Item>
          <Descriptions.Item span={1} className="custom-label" label="Fecha">{fecha} </Descriptions.Item>
          <Descriptions.Item span={1} className="custom-label" label="Tipo">
          { glacier.active ? 
            <Badge status="success" text="A" /> :
            <Badge status="processing" text="B" />
          } 
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  }

