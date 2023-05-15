//React Utils
import { Fragment, useState } from "react";
//Hooks & Routing
import { useNavigate, Link } from "react-router-dom";
//Components
import { Descriptions, Image, Typography, Button, Space, Row, Col, Badge, Modal,
  // Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
} from "antd";
//Style
import "./CustomTables.css";
// Dummies
// import glaciers from '../../components/Map/features/glaciers.json'
import { FaMapMarkedAlt, FaEdit, FaTrashAlt } from "react-icons/fa"
// Css antd-buttons


const GlaTable = ({glaciers, id }) => {

  const [modal2Open, setModal2Open] = useState(false);
  // let { id } = useParams();
  const glacier =  glaciers.find(glacier => glacier.id == id)
  console.log('glaciers', glaciers, id)
  var dateFormat = new Date(glacier.creation);
  var fecha = dateFormat.getDate()+ "/" + (dateFormat.getMonth()+1)+ "/"+dateFormat.getFullYear()
  var roundedM2 = Math.round((glacier.attributes.SUP_M2  + Number.EPSILON) * 100) / 100
  console.log(roundedM2)

  const navigate = useNavigate()
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (

    <Fragment>
      <Descriptions layout="horizontal" style={{ padding: '1em' }} bordered={true} column={2}>
        <Descriptions.Item span={2} labelStyle={{ visibility: ''}} contentStyle={{textAlign: 'center', marginLeft: "-9rem"}}>
          <Image src={glacier.img} width={'40%'} height={'40%'} style={{ marginLeft: "-7rem"}} />
          {/* <ChartComponent /> */}
        </Descriptions.Item>
        <Descriptions.Item label="Región"> {glacier.region} </Descriptions.Item>
        <Descriptions.Item label="Provincia"> {glacier.province} </Descriptions.Item>
        <Descriptions.Item label="Fecha">{fecha} </Descriptions.Item>
        <Descriptions.Item label="Folio"> {glacier.folio} </Descriptions.Item>
        <Descriptions.Item label="Estado">
          { glacier.active ? 
            <Badge status="success" text="Estado A" /> :
            <Badge status="processing" text="Estado B" />
          } 
        </Descriptions.Item>
        <Descriptions.Item label="Superficie">{ roundedM2 } m<sup>2</sup> </Descriptions.Item>
        <Descriptions.Item span={2} label="Descripción">{glacier.description} </Descriptions.Item>
      </Descriptions>
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
            <Link to="/glaciers/list" component={Typography.Link} >IR A DETECTADOS</Link>
          </Col>
          <Col  >
            <Space>
              <Button
                // style={{ background: "green", borderColor: "green" }}
                shape="round"
                onClick={() => {
                  navigate(`/glaciers/inmap/${id}`)
                }}
                title="Ver en mapa"
                type="success"
                icon={<FaMapMarkedAlt />}
              />
              <Button
                title="Editar"
                shape="round"
                onClick={() => setModal2Open(true)}
                type={"primary"}
                icon={<FaEdit />}
              />
              <Button
                shape="round"
                title="Eliminar"
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
      <Modal
        title={`Modificando glaciar ${glacier.name}`}
        centered
        open={ modal2Open }
        onOk={
          () => setModal2Open(false)
        }
        onCancel={() => setModal2Open(false)}
      >
        <Form
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onValuesChange={onFormLayoutChange}
      style={{
        maxWidth: 600,
        marginTop: '20px'
      }}
    >

      <Form.Item label="Nombre">
        <Input />
      </Form.Item>
      <Form.Item label="Estado">
          <Radio.Group>
            <Radio value="A"> A </Radio>
            <Radio value="B"> B </Radio>
          </Radio.Group>
        </Form.Item>
      <Form.Item label="Folio">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Fecha">
        <DatePicker />
      </Form.Item>
    </Form>
      </Modal>

    </Fragment>
    
  );
};

export default GlaTable;
