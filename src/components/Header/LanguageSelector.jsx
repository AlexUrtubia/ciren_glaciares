//React utilities
import { useState } from "react";
//Components
import { Popover, Button, Divider } from "antd";
import { FaLanguage } from "react-icons/fa";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("Español");
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
 /*  const handleOnSelect_Menu = (e) => {
    setLanguage(e.key);
    setVisible(false);
  }; */
  // const menu = (
  //   <Menu
  //     onSelect={handleOnSelect_Menu}
  //     items={[
  //       {
  //         label: "Español",
  //         key: "Español",
  //       },
  //       {
  //         label: "English",
  //         key: "English",
  //       },
  //       {
  //         label: "Portugues",
  //         key: "Portugues",
  //       },
  //     ]}
  //   />
  // );
  const menu = (
      <div onClick={()=>setVisible(false)}>
        <p onClick={()=>setLanguage("Español")} style={{margin:"5px", cursor:"pointer"}}>Español</p>
        <Divider style={{margin:"4px"}}/>
        <p onClick={()=>setLanguage("English")} style={{margin:"5px", cursor:"pointer"}}>English</p>
        <Divider style={{margin:"4px"}}/>
        <p onClick={()=>setLanguage("Portugues")} style={{margin:"5px", cursor:"pointer"}}>Portugues</p>

      </div>
  );

  return (
    <Popover
      onVisibleChange={handleVisibleChange}
      visible={visible}
      content={menu}
      trigger={"click"}
      className={"text_header"}
    >
      <Button
        icon={
          <FaLanguage
            style={{
              paddingRight: "5px",
              fontSize: "2.3em",
              verticalAlign: "middle",
            }}
          />
        }
        style={{ padding: "5px" }}
        type={"text"}
      >
        {language}
      </Button>
    </Popover>
  );
};

export default LanguageSelector;
