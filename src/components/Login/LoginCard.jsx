//Components
import { Card } from "antd";
import LoginForm from "../Forms/LoginForm";
//Import CSS Files
import "./Login.css";
import cepal_logo from "../../assets/cepal_full.png"

const LoginCard = (props) => {
  return (
    <Card className="login_container">
      <img src={cepal_logo} style={{width:"auto", height:"10em", marginBottom:"2em"}}/>
      <LoginForm />
    </Card>
  );
};

export default LoginCard;
