import React from 'react'
import { Button, Space, Typography} from 'antd';
import  { Form, Row, Col}from 'react-bootstrap';
import regiones from '../../../features/regiones.json'
import { FaSearchLocation } from 'react-icons/fa';
import { MdMyLocation } from 'react-icons/md';

const { Text } = Typography;


function SearchFilterForm({mapaId = ''}) {
  return (
    <Form>
      <Row>
        <Col sm={11}>
          <Form.Select
            // id='region_id'
            id={`region_id-${mapaId}`}
            size='sm'
            >
            <option value="-1">Seleccione Región</option>
            <option value="0">Todas</option>
            {regiones.map(region => <option key={region.code} value={region.code}>{region.name}</option>)}
          </Form.Select>
        </Col>
        <Col style={{ marginLeft: '-15px'}} sm={1}>
          <Button
            id={`search-button-${mapaId}`}
            shape="round"
            type='primary'
            >
            <FaSearchLocation/>
          </Button>
        </Col>
      </Row>
      <Space direction="horizontal" style={{width:'100%', justifyContent: 'center', textAlign: 'center', marginTop: '14px'}}>
        <Text type="danger" id={`text-error-${mapaId}`}></Text>
      </Space>
      <Row id={`rowform-${mapaId}`} style={{height: '0px'}}>
        <Space id={`finded-${mapaId}`} style={{justifyContent: 'center', visibility: 'hidden',  height: '0px', marginTop: '12px'}}>
          <Form.Select
            id={`finded_id-${mapaId}`}
            size='sm'
            >
            <option value="-1">Zoom a</option>
          </Form.Select>
          <Button
            id={`zoom-to-${mapaId}`}
            shape="round"
            type='primary'
            >
            <MdMyLocation/>
          </Button>
        </Space>
      </Row>
    </Form>
  )
}

export default SearchFilterForm