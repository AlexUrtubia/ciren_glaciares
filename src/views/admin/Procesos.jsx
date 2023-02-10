//Components
import { Card } from "antd";
import CardTitle from "../../components/UI/CardTitle";
import { FaLaptopCode } from "react-icons/fa";
import Process from "../../components/Process/Process";
import ModeloAtmosferico from "../../components/Process/ModeloAtmosferico";
import { useState } from "react";
import ModeloInversion from "../../components/Process/ModeloInversion";

const tabList = [
  {
    key: "tab1",
    tab: "Modelo Atmosférico",
  },
  {
    key: "tab2",
    tab: "Modelo de Inversión",
  },
];

const contentList = {
  tab1: <ModeloAtmosferico />,
  tab2: <ModeloInversion/>,
};

const Procesos = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const onTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <Card
      title={<CardTitle title="Procesos" icon={FaLaptopCode} />}
      style={{ margin: "1em" }}
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={(key) => {
        onTabChange(key);
      }}
    >
      {contentList[activeTab]}
    </Card>
  );
};

export default Procesos;
