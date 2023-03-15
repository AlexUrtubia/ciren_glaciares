import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const MyFooter = ({ isOpen, onClose, title, description }) => {
  return (
    <Footer className="map-footer" style={{ display: isOpen ? "block" : "none"}}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onClose}>Cerrar</button>
    </Footer>
  );
};

export default MyFooter;