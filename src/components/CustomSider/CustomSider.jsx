//Hooks
import { useState, useContext } from "react";
//Routing
import { Link, useLocation } from "react-router-dom";
//Components
import { Layout, Menu } from "antd";
import SiderTrigger from "./SiderTrigger";
//Style
import "./CustomSider.css";
import { useEffect } from "react";
import AuthContext from "../../store/auth-context";

const { Sider } = Layout;

//Generate Sider's Items
const getItems = (routes, parentPath, layout, admin) => {
  const items = [];
  items.push({ type: "divider" });
  routes.forEach((route) => {
    if (route.hide) {
      return;
    }
    let children = [];
    let name = "";
    let pathToRoute = parentPath + route.path + "/";
    name = <Link to={pathToRoute}>{route.name}</Link>;

    if (route.collapse) {
      if (route.admin) {
        if (admin) {
          children = getItems(route.views, pathToRoute, layout, admin);
          name = route.name;
        } else {
          return;
        }
      } else {
        children = getItems(route.views, pathToRoute, layout, admin);
        name = route.name;
      }
    }

    if (children.length === 0 && route.layout !== layout) {
      return;
    }

    items.push({
      label: name,
      key: route.path,
      children: children.length === 0 ? undefined : children,
      icon: route.icon,
    });
    
    items.push({ type: "divider" });
  });
  return items;
};

const CustomSider = ({ routes, layout }) => {

  const { admin, CheckLogIn, isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const [pressedKey, setPressedKey] = useState(
    location.pathname.split("/").slice(-1)
  );

  useEffect(() => {
    setPressedKey(location.pathname.split("/").slice(-1));
  }, [location.pathname]);

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapse_state) => {
    setCollapsed(collapse_state);
  };

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="sider_style"
      trigger={<SiderTrigger collapsed={collapsed} />}
    >
      <Menu
        className="menu_style"
        items={getItems(routes, "", layout, admin)}
        theme="light"
        defaultSelectedKeys={pressedKey}
        selectedKeys={pressedKey}
        mode="inline"
      ></Menu>
    </Sider>
  );
};

export default CustomSider;
