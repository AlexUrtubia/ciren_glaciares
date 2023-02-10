import { useContext } from "react";
import {Link} from "react-router-dom";

//Components
import { Popover, Button } from "antd";
import { FaUser } from "react-icons/fa";
import AuthContext from "../store/auth-context";

const UserAvatarHeader = () => {
  const {logout, user} = useContext(AuthContext)
  return (
    <Popover
      content={<Link to={"/login"}><p onClick={logout} style={{margin:"2px"}}>cerrar sesión</p></Link>}
      trigger={"click"}
      className={"text_header"}
    >
      <Button
        icon={<FaUser style={{ paddingRight: "5px", fontSize:"1.3em", verticalAlign:"middle" }} />}
        className={"button_header"}
        type={"text"}
      >
        {user}
      </Button>
    </Popover>
  );
};

export default UserAvatarHeader;
