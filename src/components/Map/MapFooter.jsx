import React from "react";
import { Layout } from "antd";
import { FilterContext } from '../../context/FilterContext';
import ModalMapDesc from "../Tables/ModalMapDesc";

const { Footer } = Layout;

const MyFooter = ({ isOpen, onClose, title, description }) => {

  const { id } = React.useContext(FilterContext);



  return (
    <Footer className="map-footer" style={{ display: isOpen ? "block" : "none"}}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onClose}>Cerrar</button>
      <ModalMapDesc id={id}/>
    </Footer>
  );
};

export default MyFooter;