//React Utils
import { Fragment } from "react";
//Hooks & Routing
import { useNavigate } from "react-router-dom";
//Components
import { Table, Button, Typography, Row, Col } from "antd";
import { FaUserEdit, FaTrash, FaPlus } from "react-icons/fa";
//Style
import "./CustomTables.css";



const Text = Typography.Text;



const date_format = {
  day: "numeric",
  year: "numeric",
  month: "numeric",
};

const DUMMY_DATA = [
  {
    key: "1",
    nombre: "Angel A",
    tipo: "Administrador",
    status: <Text type="danger">Inactivo</Text>,
    fecha_creacion: new Date(2020, 3, 5).toLocaleString([], date_format),
  },
  {
    key: "2",
    nombre: "Bastian B",
    tipo: "Pais",
    status: <Text type="success">Activo</Text>,
    fecha_creacion: new Date(2021, 4, 6).toLocaleString([], date_format),
  },
];

const UsersTable = (props) => {
  const navigate = useNavigate()
  const COLUMNS = [
    {
      title: <Text strong>Nombre</Text>,
      dataIndex: "nombre",
      sorter: (a, b) => (a.nombre < b.nombre ? -1 : 1),
    },
    {
      title: <Text strong>Tipo</Text>,
      dataIndex: "tipo",
      sorter: (a, b) => (a.tipo < b.tipo ? -1 : 1),
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
      title: <Text strong>Fecha de creacion</Text>,
      dataIndex: "fecha_creacion",
      sorter: (a, b) =>
        Date(a.fecha_creacion) < Date(b.fecha_creacion) ? -1 : 1,
    },
    {
      dataIndex: "actions",
      key: "x",
      render: (_, record) => (
        <Fragment>
          <Row gutter={5}>
            <Col>
              <Button
                onClick={() => {
                  console.log(_);
                  console.log(record);
                  navigate("/editar-usuario")
                }}
                type={"primary"}
                icon={<FaUserEdit />}
              />
            </Col>
            <Col>
              <Button
                onClick={() => {
                  console.log(_);
                  console.log(record);
                  alert("Funcionalidad no implementada")
                }}
                danger={true}
                type={"primary"}
                icon={<FaTrash/>}
              />
            </Col>
          </Row>
        </Fragment>
      ),
    },
  ];
  return (
    <Fragment>
      <Table
        columns={COLUMNS}
        scroll={{ x: 800 }}
        dataSource={DUMMY_DATA}
        pagination={{ position: ["topRight"] }}
      ></Table>
      <Button type="primary" icon={<FaPlus style={{marginRight:"3px"}}/>} className="button_create" onClick={()=>navigate("/admin/crear-usuario")}>
      Crear Usuario
      </Button>
    </Fragment>
  );
};

export default UsersTable;
