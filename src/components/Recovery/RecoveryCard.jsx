import { Card, Col, Row } from "antd";
import RecoveryForm from "../Forms/RecoveryForm";
//Images
import cepal_logo_login from "../../static/img/logo_ciren_editado.png"
import cmm_logo from "../../static/img/logo_cmm2.png"
import uchile from "../../static/img/uchile.png"
import anid_logo from "../../static/img/anid_rojo_azul.png"

const RecoveryCard = () => {
  return (
    <Card className="login_container">
      <Row
        justify="center"
        align="middle"
      >
        <Col style={{ width: "auto" }}>
          <img src={cepal_logo_login} alt='cepal_logo' style={{width:"auto", height:"9em", marginBottom:"2em"}}/>
        </Col>
        <Col style={{ width: "auto" }}>
          <img src={anid_logo} alt='cepal_logo' style={{width:"auto", height:"9em", marginBottom:"2em", marginLeft: "2em"}}/>
        </Col>
        <Col style={{ width: "auto" }}>
          <img src={uchile} alt='cepal_logo' style={{width:"auto", height:"9em", marginBottom:"2em", marginLeft: "2em"}}/>
        </Col>
        <Col style={{ width: "auto" }}>
          <img src={cmm_logo} alt='cepal_logo' style={{width:"auto", height:"9em", marginBottom:"2em", marginLeft: "1em"}}/>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
      >
        <Col style={{ width: "auto", marginTop: "2em" }}>
          <RecoveryForm />
        </Col>
      </Row>
    </Card>
  );
};

export default RecoveryCard;
