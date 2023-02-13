import { Layout } from "antd";
import { Outlet } from "react-router-dom";
// import CustomHeader from "../components/CustomHeader/CustomHeader";
// import CustomHeader from "../components/CustomSider";
// import PublicHeader from "../components/CustomHeader/PublicHeaders";



const { Content } = Layout;


const loginDashboard = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* <PublicHeader/> */}
      <Layout>
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
    </Layout>
  );
};

export default loginDashboard;