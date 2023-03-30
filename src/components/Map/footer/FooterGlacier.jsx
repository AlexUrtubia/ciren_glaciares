import React from 'react';
import { Descriptions, Image, Badge, Row, Col } from 'antd';
import glaciers from "../features/glaciers.json"


export default function FooterGlacier({ id }) {

    var id_code = id.split('-')
    const glacier =  glaciers.find(glacier => glacier.id == id_code[0])
    var dateFormat = new Date(glacier.creation);
    var fecha = dateFormat.getDate()+ "/" + (dateFormat.getMonth()+1)+ "/"+dateFormat.getFullYear()

    return (
      <>
        <Row gutter={[0,0]} style={{height: 353, marginTop: '', alignItems: 'center'}}> 
          <Col span={7}>
            <Descriptions title={`Glaciar ${glacier.name}`} 
              className="custom-top" 
              layout="vertical" 
              style={{ padding: '2em' }} 
              bordered={true} 
              column={2}
            >
              <Descriptions.Item span={2} className="custom-label-img" contentStyle={{ textAlign: 'center', justifyContent: 'center' }}>
                <Image preview={false} style={{  maxHeight: 250 }} src={glacier.img}/>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={17}  style={{marginLeft: ''}}>
            <Descriptions
            layout="vertical" 
            style={{ padding: '', marginTop: '45px', paddingRight:'', height: '' }} 
            bordered={true} 
            column={3}>
              <Descriptions.Item span={1} className="custom-label" label="Región"> {glacier.attributes.NOM_REG} </Descriptions.Item>
              <Descriptions.Item span={1} className="custom-label" label="Comuna"> {glacier.attributes.NOM_COM} </Descriptions.Item>
              <Descriptions.Item span={1} className="custom-label" label="Folio"> {glacier.folio} </Descriptions.Item>
              <Descriptions.Item span={1} className="custom-label" label="Categoría"> {glacier.attributes.Categoria} </Descriptions.Item>
              <Descriptions.Item span={1} className="custom-label" label="Fecha"> {fecha} </Descriptions.Item>
              <Descriptions.Item span={1} className="custom-label" label="Estado">
              { glacier.active ? 
                <Badge status="success" text="A" /> :
                <Badge status="processing" text="B" />
              } 
              </Descriptions.Item>
              <Descriptions.Item span={3} className="custom-label" labelStyle={{ textAlign: 'center'}} label="Descripción">{glacier.description} </Descriptions.Item>
              
            </Descriptions>
          </Col>
        </Row>
      </>
    );
  }

