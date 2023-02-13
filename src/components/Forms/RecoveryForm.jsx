import { Card, Row, Col, Button, Form, Input } from "antd";
//Import Antd Components
import { FaEnvelope } from "react-icons/fa";

const RecoveryForm = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div style={{ width: '25em', justifyContent: 'center'}}>
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
          <Row align="center" 
            style={{ marginBottom: '20px'}}
          >
            <Col >
              <Button
                type="primary"
                className="form_button"
                style={{ borderRadius: "10px 0 0 10px" }}
              >
                <a href="login">Cancelar</a>
              </Button>
            </Col>

            <Col >
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
          <a
              className={"login_form_forgot login_form_href"}
              href="login"
            >
              Volver
            </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RecoveryForm;
