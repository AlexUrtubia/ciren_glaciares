import React from "react";
//Hooks & Routing
import { Table, Typography, Button } from "antd";
import { FaCogs } from "react-icons/fa";

const Text = Typography.Text;

const COLUMNS = [
  {
    title: <Text strong>Satelite</Text>,
    dataIndex: "nombre",
    sorter: (a, b) => (a.nombre < b.nombre ? -1 : 1),
  },
  {
    title: <Text strong>Estado</Text>,
    dataIndex: "status",
    sorter: (a, b) =>
      a.status.props.childen < b.status.props.childen ? -1 : 1,
    filters: [
      { text: "Activo", value: "Activo" },
      { text: "Inactivo", value: "Inactivo" },
    ],
    onFilter: (value, record) => value === record.status.props.children,
  },
  {
    title: <Text strong>Fecha de creación</Text>,
    dataIndex: "fecha_creacion",
    sorter: (a, b) => a.tipo - b.tipo,
  },
  {
    title: <Text strong>Fecha de actualización</Text>,
    dataIndex: "fecha_actualizacion",
    sorter: (a, b) =>
      Date(a.fecha_creacion) < Date(b.fecha_creacion) ? -1 : 1,
  },
  {
    dataIndex: "actions",
    key: "y",
    render: (_, record) => {
      return (
        <React.Fragment>
              <Button
                onClick={() => {
                  console.log(_);
                  console.log(record);
                }}
                type={"primary"}
                icon={<FaCogs size={"1.2em"} />}
              />
        </React.Fragment>
      );
    },
  },
];

const DUMMY_DATA = [
  {
    key: "1",
    nombre: "Satelite A",
    tipo: 1,
    status: <Text type="danger">Inactivo</Text>,
    fecha_creacion: new Date(2020, 3, 5).toUTCString(),
    fecha_actualizacion: new Date(2022, 3, 5).toUTCString(),
    actions: "",
  },
  {
    key: "2",
    nombre: "Satelite B",
    tipo: 0,
    status: <Text type="success">Activo</Text>,
    fecha_creacion: new Date(2021, 4, 6).toUTCString(),
    fecha_actualizacion: new Date(2022, 3, 5).toUTCString(),
    actions: "",
  },
];

const SatellitesTable = () => {
  return (
    <React.Fragment>
      <Table
        columns={COLUMNS}
        scroll={{ x: 800 }}
        dataSource={DUMMY_DATA}
        style={{ width: "100%" }}
        pagination={{ position: ["topRight"] }}
      ></Table>
    </React.Fragment>
  );
};

export default SatellitesTable;
