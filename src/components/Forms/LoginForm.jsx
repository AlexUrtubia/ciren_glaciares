import { useState, useContext } from "react";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import { FaUser, FaLock } from "react-icons/fa";
import AuthContext from "../../store/auth-context";

const LoginForm = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext)
  console.log(authCtx, setIsLogin)

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setIsLoading(true);
    if (isLogin) {
    } else {
      fetch("http://localhost:3081/api/v1/auth/signin", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept",
        },
        credentials: "include",
        body: JSON.stringify({
          email: values.username,
          password: values.password,
        }),
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              let errorMessage = "Error de autentificación";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage)
            });
          }
        })
        .then((data) => {
          console.log(data)
          authCtx.login(data.payload.firstName, data.payload.sudo)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  };
  return (
    <div style={{ width: '25em', justifyContent: 'center'}}>
      <Form
        name="login_form"
        className="login_form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          style={{ marginBottom: "5px" }}
          name="username"
          rules={[
            {
              required: true,
              message: "Ingrese su usuario",
            },
          ]}
        >
          <Input
            //prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Usuario"
            addonBefore={<FaUser />}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "5px" }}
          name="password"
          rules={[
            {
              required: true,
              message: "Ingrese su contraseña",
            },
          ]}
        >
          <Input
            //prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Contraseña"
            addonBefore={<FaLock />}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "left", marginBottom: "10px" }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Recordar Usuario</Checkbox>
          </Form.Item>
        </Form.Item>

        {!isLoading && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login_form_button"
            >
              Ingresar
            </Button>
            <a
              className={"login_form_forgot login_form_href"}
              href="restaurar-contrasena"
            >
              Olvide mi contraseña
            </a>
          </Form.Item>
        )}
        {isLoading && (
          <>
            <p color="rgb(0,0,0,0.8)">Cargando</p> <Spin size="large"></Spin>
          </>
        )}
      </Form>

    </div>
  );
};

export default LoginForm;
