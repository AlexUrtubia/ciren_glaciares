//React utilities
import { useState } from "react";
//Hooks & Routing
import { useNavigate } from "react-router-dom";
//Components
import { Row, Form, Col, Input, Button, Dropdown, Menu } from "antd";
import { FaUser, FaEnvelope, FaIdCard, FaUserTag } from "react-icons/fa";



const CreateUserForm = (props) => {
  const [userType, setUserType] = useState("Administrador")
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const menu = (
    <Menu
      onClick={(e)=>(setUserType(e.key))}
      items={[
        {
          label: "Publico",
          key: "Publico",
        },
        {
          label: "Pais",
          key: "Pais",
        },
        {
          label: "Administrador",
          key: "Administrador",
        },
      ]}
    />
  );
  return (
    <Form layout={"vertical"} name="basic" form={form}>
      <Form.Item
        label="Correo Electrónico"
        name="email"
        rules={[
          {
            required: true,
            message: "Ingrese correo electrónico válido",
            //pattern: /(\w+)@(\w+)\.(\w+)/,
            type: "email",
          },
        ]}
      >
        <Input addonBefore={<FaEnvelope />} />
      </Form.Item>
      <Form.Item
        label="Nombre / Apellido"
        name="full_name"
        initialValue={"admin"}
        rules={[
          {
            required: true,
            message: "Ingrese un nombre de al menos 4 caracteres",
            min: 4,
          },
        ]}
      >
        <Input addonBefore={<FaIdCard />} />
      </Form.Item>
      <Form.Item label="Usuario">
        <Input addonBefore={<FaUser />} value={""} />
      </Form.Item>
      <Form.Item label="Tipo de Usuario">
        <Dropdown placement="bottom" overlay={menu} trigger={"click"}>
          <Input className="input-dropdown" addonBefore={<FaUserTag />} value={userType} style={{cursor:"pointer"}}/>
          
        </Dropdown>
      </Form.Item>
      <Form.Item>
        <Row gutter={3}>
          <Col>
            <Button type="danger" onClick={() => navigate("/usuarios")}>
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {!props.edit && "Crear Usuario"}
              {props.edit && "Actualizar"}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CreateUserForm;
