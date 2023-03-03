//React Utils
import { Fragment } from "react";
//Hooks & Routing
import { useNavigate, Link, useParams } from "react-router-dom";
//Components
import { Table, Button, Typography, Row, Col } from "antd";
import { FaEye, FaTrash, FaPlus } from "react-icons/fa";
//Style
import "./CustomTables.css";
// Dummies
import glaciers from '../../components/Map/features/glaciers.json'

const Text = Typography.Text;



const date_format = {
  day: "numeric",
  year: "numeric",
  month: "numeric",
};

const DUMMY_DATA = glaciers
console.log('DUMMY_DATA', DUMMY_DATA)

const GlaListTable = (props) => {

  const navigate = useNavigate()
  const COLUMNS = [
    {
      title: <Text strong>Nombre</Text>,
      dataIndex: "name",
      sorter: (a, b) => (a.name < b.name ? -1 : 1),
      key: "name"
    },
    {
      title: <Text strong>Provincia</Text>,
      dataIndex: ['attributes', 'NOM_PROV'],
      sorter: (a, b) => (a.attributes.NOM_PROV < b.attributes.NOM_PROV ? -1 : 1),
      key: ['attributes', 'NOM_PROV'],
    },
    {
      title: <Text strong>Región</Text>,
      dataIndex: ['attributes', 'NOM_REG'],
      sorter: (a, b) => (a.attributes.NOM_REG < b.attributes.NOM_REG ? -1 : 1),
      key: ['attributes', 'NOM_REG'],
    },
    {
      title: <Text strong>Superficie</Text>,
      dataIndex: ['attributes', 'SUP_M2'],
      sorter: (a, b) => (a.attributes.SUP_M2 < b.attributes.SUP_M2 ? -1 : 1),
      key: ['attributes', 'SUP_M2'],
      render: (value) => <Fragment> { Math.round((value  + Number.EPSILON) * 100) / 100 } m<sup>2</sup></Fragment>,
    },
    {
      title: <Text strong>Fecha detección</Text>,
      dataIndex: "creation",
      sorter: (a, b) =>
      Date(a.creation) < Date(b.creation) ? -1 : 1,
      key: "creation",
      render: (value) => 
      <Fragment> 
        { new Date(value).getDate() + "/" 
        + (new Date(value).getMonth()+1) + "/"
        + new Date(value).getFullYear() } 
      </Fragment>,
    },
    {
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Fragment>
          <Row gutter={5}>
            <Col>
              <Button
                onClick={() => {
                  console.log(_);
                  console.log(record);
                  navigate(`/glaciers/${record.id}`)
                }}
                type={"primary"}
                icon={<FaEye />}
              />
            </Col>
            <Col>
              <Button
                onClick={() => {
                  console.log(_);
                  console.log(record);
                  alert("Funcionalidad no implementada")
                }}
                danger={true}
                type={"primary"}
                icon={<FaTrash/>}
              />
            </Col>
          </Row>
        </Fragment>
      ),
    },
  ];
  
  return (
    <Fragment>
      <Table
        columns={COLUMNS}
        scroll={{ x: 800 }}
        dataSource={DUMMY_DATA}
        rowKey={(DUMMY_DATA) => DUMMY_DATA.id}
        pagination={{ position: ["bottomRight"] }}
      />
    </Fragment>
  );
};

export default GlaListTable;
