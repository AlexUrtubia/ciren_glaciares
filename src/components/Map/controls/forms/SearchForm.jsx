import React from 'react'
import {
  Button,
  Space } from 'antd';
import { Typography } from 'antd';
import  { Form, Row, Col}from 'react-bootstrap';
import regiones from '../../features/regiones.json'
import { FaSearchLocation } from 'react-icons/fa';

const { Title, Text } = Typography;


export default function SearchForm() {

  return (
    <div style={{ marginTop: '-25px', marginBottom: '5px', padding: '1em'}}>
        <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
          <Title level={4}>Buscador de glaciares</Title>
        </Space>
        <Space direction="horizontal" style={{width:'100%', justifyContent: 'center', padding: '14px', textAlign: 'center'}}>
          <Text type="secondary" >Aplique filtros para desplegar los glaciares que coincidan con la búsqueda </Text>
        </Space>
        <Form>
          <Row>
            <Col sm={11}>
              <Form.Select
                id='region_id'
                size='sm'
                >
                <option value="-1">Seleccione Región</option>
                <option value="0">Todas</option>
                {regiones.map(region => <option key={region.code} value={region.code}>{region.name}</option>)}
              </Form.Select>
            </Col>
            <Col style={{ marginLeft: '-17px'}} sm={1}>
              <Button
                id='search-button'
                shape="round"
                type='primary'
                >
                <FaSearchLocation/>
              </Button>
            </Col>
          </Row>
          <Space direction="horizontal" style={{width:'100%', justifyContent: 'center', paddingTop: '12px', textAlign: 'center', marginBottom: '0px'}}>
            <Text type="danger" id='text-error'></Text>
          </Space>

        </Form>
    </div>
  )
}
