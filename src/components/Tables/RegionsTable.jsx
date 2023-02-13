//Hooks & Routing
import { useNavigate } from "react-router-dom";
//Components
import { Table, Button, Typography, Col, Row } from "antd";
import { FaPlus, FaEye, FaTrash, FaEdit } from "react-icons/fa";

const Text = Typography.Text;

const DUMMY_DATA = [
  {
    key: "1",
    nombre: "Region A",
    nombre_completo: "Region A-5935",
    tipo: 1,
    status: 0,
    fecha_creacion: new Date(2020, 3, 5).toUTCString(),
  },
  {
    key: "2",
    nombre: "Region B",
    nombre_completo: "Region B-1245",
    tipo: 0,
    status: 0,
    fecha_creacion: new Date(2021, 4, 6).toUTCString(),
  },
];

const RegionsTable = () => {
  const navigate = useNavigate();
  const COLUMNS = [
    {
      title: <Text strong>Nombre</Text>,
      dataIndex: "nombre",
      sorter: (a, b) => (a.nombre < b.nombre ? -1 : 1),
    },
    {
      title: <Text strong>Nombre Completo</Text>,
      dataIndex: "nombre_completo",
      sorter: (a, b) => (a.nombre < b.nombre ? -1 : 1),
    },
    {
      dataIndex: "actions",
      key: "x",
      render: (_, record) => (
        <>
          <Row gutter={5}>
            <Col>
              <Button
                onClick={() => {
                  console.log(_);
                  console.log(record);
                  navigate("/editar-region");
                }}
                type={"primary"}
                icon={<FaEdit />}
              />
            </Col>
            <Col>
              <Button
                onClick={() => {
                  console.log(_);
                  console.log(record);
                  alert("Funcionalidad todavía no implementada")
                }}
                type="primary"
                className="button_watch"
                icon={<FaEye />}
              />
            </Col>
            <Col>
              <Button
                onClick={() => {
                  console.log(_);
                  console.log(record);
                  alert("Funcionalidad todavía no implementada")
                }}
                danger={true}
                type="primary"
                icon={<FaTrash />}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={COLUMNS}
        scroll={{ x: 800 }}
        dataSource={DUMMY_DATA}
        style={{ width: "100%" }}
        pagination={{ position: ["topRight"] }}
      ></Table>
      <Button
        type="primary"
        icon={<FaPlus style={{ marginRight: "3px" }} />}
        className={"button_create"}
        onClick={() => navigate("/crear-region")}
      >
        Crear Región
      </Button>
    </>
  );
};

export default RegionsTable;
