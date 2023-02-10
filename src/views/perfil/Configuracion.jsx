//React Utils
import { useState } from "react";
//Components
import { Card, Form, Input, Checkbox, Typography, Button } from "antd";
//Import Icons
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaUserTag,
  FaCogs
} from "react-icons/fa";

import CardTitle from "../../components/UI/CardTitle";

const Configuracion = (props) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("admin@admin.cl");
  const [emailReport, setEmailReport] = useState(false);

  const handle_onCheckEmailReport = () => {
    setEmailReport((checked) => !checked);
  };
  const handle_onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <Card style={{ margin: "1em" }} title={<CardTitle title={"Configuracion"} icon={FaCogs} />}>
      <Form layout={"vertical"} name="basic" form={form}>
        <Form.Item label="Usuario">
          <Input
            addonBefore={<FaUser/>}
            disabled={true}
            value="Administrador"
          />
        </Form.Item>
        <Form.Item
          label="Correo Electrónico"
          name="email"
          initialValue={email}
          rules={[
            {
              required: true,
              message: "Ingrese correo electrónico válido",
              //pattern: /(\w+)@(\w+)\.(\w+)/,
              type: "email",
            },
          ]}
        >
          <Input
            addonBefore={<FaEnvelope/>}
            value={email}
            onChange={handle_onChangeEmail}
          />
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
          <Input addonBefore={<FaIdCard/>} />
        </Form.Item>
        <Form.Item label="Tipo de Usuario">
          <Input
            addonBefore={<FaUserTag/>}
            disabled={true}
            value="Administrador"
          />
        </Form.Item>
        <Form.Item>
          <Checkbox checked={emailReport} onChange={handle_onCheckEmailReport}>
            <Typography.Text>
              Habilitar correos electrónicos con reportes
            </Typography.Text>
          </Checkbox>
        </Form.Item>
        <Typography.Text
          style={{ color: "#17a2b8", fontSize: "0.8rem", fontWeigh: "400" }}
        >
          Si desea modificar su contraseña, ingrese la información a
          continuación
        </Typography.Text>
        <Form.Item
          name="pass"
          rules={[
            {
              message:
                "La contraseña debe tener 8 caracteres como mínimo, una letra mayúscula, una letra minúscula y un número",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue("pass").match(
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
                  )
                ) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error(
                    "La contraseña debe tener 8 caracteres como mínimo, una letra mayúscula, una letra minúscula y un número"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirmar Contraseña"
          dependencies={["pass"]}
          rules={[
            {
              message: "Las constraseñas ingresadas no son iguales!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("pass") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Las constraseñas ingresadas no son iguales!!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Actualizar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Configuracion;
