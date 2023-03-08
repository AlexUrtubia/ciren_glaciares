import { Layout, Image, Row, Col, Button } from "antd";
import LanguageSelector from "./LanguageSelector";
import ciren_logo from "../../static/img/ciren1.png"
import cmm_logo from "../../static/img/cmm_logo.png"
import anid_logo from "../../static/img/anid_logo.png"
import "./CustomHeader.css";
const { Header } = Layout;

const PublicHeader = (props) => {
  return (

    <Header className={"header_style"}>
      <Row justify={'space-between'}>
        <Col className="mx-5 ">&nbsp;</Col>
        <Col  >
          <div className="logo">
            <a
              href="https://www.ciren.cl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={ciren_logo} height={60} width={150} preview={false} />
            </a>
          </div>
          <div className="logo px-4">
            <a
              href="https://www.anid.cl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={anid_logo} height={45} style={{marginTop: '14px'}} preview={false} />
            </a>
          </div>
          <div className="logo" style={{marginTop: '3px'}}>
            <a
              href="https://www.cmm.uchile.cl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={cmm_logo} height={40} preview={false}/>
            </a>
          </div>
        </Col>
        <Col >
          <div >
            {/* <Divider type="vertical" style={{ height: "2em" }} /> */}
            <Button
              style={{ padding: "5px", marginTop:'12px' }}
              type={"text"}
            >
              <a href="/login" style={{ color: "black", textDecorationLine: 'none' }}>
                Iniciar Sesion
              </a>
            </Button>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default PublicHeader;
