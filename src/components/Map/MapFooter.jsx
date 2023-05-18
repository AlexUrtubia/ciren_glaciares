import React, { useState } from "react";
import { Layout, Button, Tabs } from "antd";
import FooterTimeSeries from "./footer/FooterTimeSeries";
import FooterGlacier from "./footer/FooterGlacier";
import { CloseSquareFilled } from '@ant-design/icons'


const { Footer } = Layout;
const { TabPane } = Tabs;

const MapFooter = ({ isOpen, onClose, pointId }) => {

  const [key, setKey] = useState(0); // Nuevo estado local para forzar la actualización del componente
  console.log('setKey', setKey)
  return (
    <Footer className="map-footer" style={{ display: isOpen ? "block" : "none", padding: 15}}>
      <Tabs size="small" type="card"
        tabBarExtraContent={
          <Button onClick={onClose} type="" icon={ <CloseSquareFilled  style={{ fontSize: '20px', borderRadius: '2px', backgroundColor: '#212121', color:"#efefef", position: 'absolute', top: -2}}  />}
      />}>
        <TabPane  tab="Serie de Tiempo" key="1">
          <FooterTimeSeries id={pointId} key={key}/>
        </TabPane>
        <TabPane tab="Glaciar" key="2">
          <FooterGlacier id={pointId}/>
        </TabPane>
      </Tabs>
    </Footer>
  
  );
};

export default MapFooter;
