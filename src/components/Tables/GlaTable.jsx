//React Utils
import { Fragment } from "react";
//Hooks & Routing
import { useNavigate, useParams, Link } from "react-router-dom";
//Components
import { Descriptions, Card, Typography, Button, Space, Row, Col } from "antd";
//Style
import "./CustomTables.css";
// Dummies
import glaciers from '../../components/Map/features/glaciers.json'
import { FaMapMarkedAlt, FaEdit, FaTrashAlt } from "react-icons/fa"
// Css antd-buttons
import 'antd-button-color/dist/css/style.css'; // or 'antd-button-color/dist/css/style.less'

const Text = Typography.Text;

const GlaTable = (props) => {

  let { id } = useParams();
  const glacier =  glaciers.find(glacier => glacier.id == id)
  console.log('glacier', glacier)

  const navigate = useNavigate()
  
  return (

    <Fragment>
      <Descriptions style={{ padding: '1em' }} bordered={true} column={1} title="Glacier Info">
        <Descriptions.Item label="Nombre"> {glacier.name} </Descriptions.Item>
        <Descriptions.Item label="Región"> {glacier.region} </Descriptions.Item>
        <Descriptions.Item label="Provincia"> {glacier.province} </Descriptions.Item>
        <Descriptions.Item label="Fecha">{glacier.creation} </Descriptions.Item>
        <Descriptions.Item label="Superficie"> {glacier.attributes.Area_P} </Descriptions.Item>
      </Descriptions>
      {/* <Card
        bodyStyle={{
          padding: '1em',
        }}
        style={{
          width: 'auto',
          padding: '0',
          // height: '3em',
          margin: '1em'
        }}
      > */}
        <Row justify={"space-between"} style={{
          width: 'auto',
          padding: '0.2em',
          // height: '3em',
          marginLeft: '2em',
          marginRight: '2em',
          marginTop: '1em',
          marginBottom: '1em',
          // border: '1px solid red'
        }}>
          <Col >
            <Link to="/glaciers/list" component={Typography.Link} >VOLVER</Link>
          </Col>
          <Col  >
            <Space>
              <Button
                // style={{ background: "green", borderColor: "green" }}
                shape="round"
                onClick={() => {
                  navigate("/editar-usuario")
                }}
                type="success"
                icon={<FaMapMarkedAlt />}
              />
              <Button
                // style={{ background: "green", borderColor: "green" }}
                shape="round"
                onClick={() => {
                  navigate("/editar-usuario")
                }}
                type={"primary"}
                icon={<FaEdit />}
              />
              <Button
                // style={{ background: "red", borderColor: "red" }}
                shape="round"
                onClick={() => {
                  navigate("/editar-usuario")
                }}
                type={"primary"}
                icon={<FaTrashAlt />}
                danger
              />
            </Space>
          
          </Col>
        </Row>
      {/* </Card> */}
    </Fragment>

  );
};

export default GlaTable;
