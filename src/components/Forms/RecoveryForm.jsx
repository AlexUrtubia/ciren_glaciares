import { Card, Row, Col, Button, Form, Input } from "antd";
//Import Antd Components
import { FaEnvelope } from "react-icons/fa";

const RecoveryForm = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="recovery_form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        style={{ marginBottom: "10px" }}
        name="Email"
        rules={[
          {
            required: true,
            message: "Ingrese su correo electrónico o usuario",
          },
        ]}
      >
        <Input
          placeholder="Correo Electrónico o Usuario"
          addonBefore={<FaEnvelope />}
        />
      </Form.Item>
      <Form.Item>
        <Row>
          <Col span={10}>
            <Button
              type="primary"
              className="form_button"
              style={{ borderRadius: "10px 0 0 10px" }}
            >
              <a href="login">Cancelar</a>
            </Button>
          </Col>

          <Col span={14}>
            <Button
              type="primary"
              htmlType="submit"
              className="form_button"
              style={{ borderRadius: "0 10px 10px 0" }}
            >
              Generar Contraseña
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default RecoveryForm;
