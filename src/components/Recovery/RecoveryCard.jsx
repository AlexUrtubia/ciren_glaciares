import { Card, Col, Row } from "antd";
import RecoveryForm from "../Forms/RecoveryForm";
//Images
import cepal_logo_login from "../../static/img/logo_ciren_login.png"

const RecoveryCard = () => {
  return (
    <Card className="login_container">
      <Row
        justify="center"
        align="middle"
      >
        <Col style={{ width: "auto" }}>
          <img src={cepal_logo_login} style={{width:"auto", height:"9em", marginBottom:"2em"}}/>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
      >
        <Col style={{ width: "auto" }}>
          <RecoveryForm />
        </Col>
      </Row>
    </Card>
  );
};

export default RecoveryCard;
