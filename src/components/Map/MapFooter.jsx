import React, { useState, useEffect } from "react";
import { Layout, Button, Tabs } from "antd";
import { FilterContext } from '../../context/FilterContext';
import FooterTimeSeries from "./footer/FooterTimeSeries";
import FooterGlacier from "./footer/FooterGlacier";
import { FaWindowClose } from "react-icons/fa"
import { CloseSquareFilled } from '@ant-design/icons'
import {Chart} from 'chart.js';


const { Footer } = Layout;
const { TabPane } = Tabs;

const MyFooter = ({ isOpen, onClose }) => {

  const { id, setIsFooterOpen } = React.useContext(FilterContext);
  const [key, setKey] = useState(0); // Nuevo estado local para forzar la actualización del componente
  const chart = Chart.getChart("grafico_id");

  const tabPane1 = () => {
    // const chart = Chart.getChart("grafico_id");
    // console.log('chart', chart.options.plugins.title.text)
    // chart.options.plugins.title.display = false; // actualizar las opciones del gráfico
    // chart.update({ redraw: true }); // forzar un re-renderizado
    // setKey(key => key + 1);
    // chart.draw()
  }

/*   useEffect(() => {
    setKey(key => key + 1);
    
  }, [id]); */

  return (
    <Footer className="map-footer" style={{ display: isOpen ? "block" : "none", padding: 15}}>
    <Tabs size="small" type="card" onTabClick={tabPane1}
      tabBarExtraContent={
        <Button onClick={onClose} type="" icon={ <CloseSquareFilled  style={{ fontSize: '20px', borderRadius: '2px', backgroundColor: '#212121', color:"#efefef", position: 'absolute', top: -2}}  />}
    />}>
      <TabPane  tab="Serie de Tiempo" key="1">
        <FooterTimeSeries id={id} key={key}/> {/* Agregar el estado local como prop "key" */}
      </TabPane>
      <TabPane tab="Glaciar" key="2">
        <FooterGlacier id={id}/>
      </TabPane>
    </Tabs>
  </Footer>
  
  );
};

export default MyFooter;
