import { Layout, Image } from "antd";
// import PublicHeader from "../components/Header";
import PublicHeader from "../components/Header/PublicHeaders";
import CustomSider from "../components/CustomSider/CustomSider";
import Mapa from "../components/Map/Map";
// import cepal_logo from '../static/img/logo_ciren.png'
import { Outlet } from "react-router-dom";


const { Content, Footer } = Layout;


const PublicLayout = (props) => {
  return (
    <>
    <Layout
      style={{
        minHeight: "100vh",
      }}
      className="site-layout"
    >
      <PublicHeader/>
      <Layout>
          <CustomSider routes={props.routes} layout={"dashboard"} />
          <Layout >
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

        {/* <Footer style={{ 
              borderTop: '1px solid #e8e8e8',
              position: 'fixed',
              left: 0,
              bottom: 0,
              width: '100%',
              backgroundColor: 'white',
              textAlign: 'center',
              paddingTop: '0px',
              paddingBottom: '0px'
            }}
            >
          <Image src={cmm_logo}  height={50} preview={'false'}/>
          <Image src={cepal_logo} style={{marginLeft:'20px'}} width={160}preview='false' />
          <Image src={anid_logo} height={60} style={{paddingTop: '15px', marginLeft: '40px'}} preview='false' />

        </Footer> */}
      </Layout>

    </Layout>
    </>
  );
};

export default PublicLayout;
