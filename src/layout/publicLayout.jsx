import { Layout } from "antd";
// import PublicHeader from "../components/Header";
import PublicHeader from "../components/Header/PublicHeaders";
import CustomSider from "../components/CustomSider/CustomSider";
import Mapa from "../components/Map/Map";
import cepal_logo from '../static/img/logo_ciren.png'
import { Outlet } from "react-router-dom";


const { Content } = Layout;


const PublicLayout = (props) => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      className="site-layout"
    >
      <PublicHeader/>
      <Layout>
        <Layout hasSider>
          <CustomSider routes={props.routes} layout={"dashboard"} />
          <Content>
            <div
              style={{
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
        {/* <Content>
          <div
            style={{
              minHeight: 360,
            }}
          >
          
          </div>
        </Content> */}
      </Layout>
    </Layout>
  );
};

export default PublicLayout;
