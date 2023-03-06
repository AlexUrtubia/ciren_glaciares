import { Layout, Image, Divider, Button } from "antd";
import LanguageSelector from "./LanguageSelector";
import cepal_logo from "../../static/img/ciren1.png"
import "./CustomHeader.css";

const { Header } = Layout;

const PublicHeader = (props) => {
  return (
    <Header className={"header_style"}>
      {/* <div className="logo">
        <a
          href="https://www.cepal.org/es"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={cepal_logo} preview={false} />
        </a>
      </div> */}
      <div style={{ float: "right" }}>
        {/* <Divider type="vertical" style={{ height: "2em" }} /> */}
        <Button
          style={{ padding: "5px" }}
          type={"text"}
        >
          <a href="/login" style={{ color: "black", textDecorationLine: 'none' }}>
            Iniciar Sesion
          </a>
        </Button>
      </div>
      {/* <div style={{ float: "right" }}>
        <Divider type="vertical" style={{ height: "2em" }} />
        <LanguageSelector />
      </div> */}
    </Header>
  );
};

export default PublicHeader;
