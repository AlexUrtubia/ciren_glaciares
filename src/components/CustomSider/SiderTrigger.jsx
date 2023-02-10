//Components
import { Button } from "antd";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

const SiderTrigger = ({ collapsed }) => {
  const icon = collapsed ? (
    <AiOutlineMenuUnfold style={{ fontSize: "1.2rem" }} />
  ) : (
    <AiOutlineMenuFold style={{ fontSize: "1.2rem" }} />
  );
  return <Button type="text" icon={icon}></Button>;
};

export default SiderTrigger;
