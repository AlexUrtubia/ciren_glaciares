//Components
import { Card, Col, Row } from "antd";
import LoginForm from "../Forms/LoginForm";

//Import CSS Files
import "./Login.css";
import cepal_logo_login from "../../static/img/logo_ciren_login.png"

const LoginCard = (props) => {
  return (
    <Card className="login_container">
      <Row
        justify="center"
        align="middle"
      >
        <Col style={{ width: "auto" }}>
          <img src={cepal_logo_login} alt='cepal_logo' style={{width:"auto", height:"9em", marginBottom:"2em"}}/>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
      >
        <Col style={{ width: "auto" }}>
          <LoginForm />
        </Col>
      </Row>
    </Card>
  );
};

export default LoginCard;
