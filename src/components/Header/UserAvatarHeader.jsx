import { useContext } from "react";
import {Link} from "react-router-dom";

//Components
import { Popover, Button } from "antd";
import { FaUser } from "react-icons/fa";

const UserAvatarHeader = () => {
  // const {logout, user} = useContext(AuthContext)
  return (
    <Popover
      content={<Link to={"/login"}><p style={{margin:"2px"}}>Cerrar Sesión</p></Link>}
      trigger={"click"}
      className={"text_header"}
    >
      <Button
        icon={<FaUser style={{ paddingRight: "5px", fontSize:"1.3em", verticalAlign:"middle" }} />}
        className={"button_header"}
        type={"text"}
      >
        Admin
      </Button>
    </Popover>
  );
};

export default UserAvatarHeader;
