//React utilities
import React, { useState } from "react";
//Hooks & Routing
import { useNavigate } from "react-router-dom";
//Components
import { Row, Form, Col, Input, Button, Dropdown, Menu } from "antd";
import { FaUser, FaEnvelope, FaIdCard, FaUserTag } from "react-icons/fa";
import { DownOutlined } from '@ant-design/icons';



const CreateUserForm = (props) => {
  const userTypeRef = React.useRef(null); // Crea una referencia al input

  React.useEffect(() => {
    console.log(userTypeRef); // Verifica la referencia en la consola
  }, [userTypeRef]);

  const handleSuffixClick = () => {
    if (userTypeRef.current) {
      // Llama al método click en la referencia del Dropdown
      userTypeRef.current.click();
    } else {
      console.log('no existe')
    }
  };
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
          label: "General",
          key: "General",
        },
      ]}
    />
  );

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  }
  return (

    <Form layout={"vertical"} name="basic" form={form} onFinish={onFinish} >
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
        <Input addonBefore={<FaEnvelope />} placeholder="usuario@correo.com"/>
      </Form.Item>
      <Form.Item
        label="Nombre / Apellido"
        name="full_name"
        rules={[
          {
            required: true,
            message: "Ingrese un nombre de al menos 4 caracteres",
            min: 4,
          },
        ]}
      >
        <Input addonBefore={<FaIdCard />} placeholder="Nombre Apellido"/>
      </Form.Item>
      <Form.Item label="Usuario" name={'user'}>
        <Input addonBefore={<FaUser />} placeholder="Username" />
      </Form.Item>
      <Form.Item label="Tipo de Usuario" name={'rol_id'}>
        <Dropdown placement="bottom" overlay={menu} trigger="click" ref={userTypeRef}>
          <Input
            className="input-dropdown"
            addonBefore={<FaUserTag />}
            suffix={<DownOutlined onClick={handleSuffixClick} />}
            value={userType}
          />
        </Dropdown>
      </Form.Item>
      {/* suffix={<DownOutlined /> }  */}
      <Form.Item>
        <Row gutter={3}>
          <Col>
            <Button type="primary" danger onClick={() => navigate("/admin/usuarios")}>
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
