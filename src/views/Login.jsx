import { useContext } from "react";
import { Col, Row } from "antd";
import LoginCard from "../components/Login/LoginCard";
import AuthContext from "../store/auth-context";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const { CheckLogIn, isLoggedIn } = useContext(AuthContext);
  CheckLogIn();

  return (
    <>
      {!isLoggedIn && (
        <Row
          justify="center"
          align="middle"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <Col style={{ width: "25em" }}>
            <LoginCard />
          </Col>
        </Row>
      )}
      {isLoggedIn && <Navigate replace to="/dashboard" />}
    </>
  );
};

export default Login;
