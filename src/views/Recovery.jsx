import { Col, Row } from "antd";
import RecoveryCard from "../components/Recovery/RecoveryCard";


const Recovery = () => {
  return (
    <Row justify="center" align="middle" style={{height:"calc(100vh - 64px)"}}>
      <Col style={{width:"auto"}} >
          <RecoveryCard/>
      </Col>
    </Row>
  );
};

export default Recovery;
