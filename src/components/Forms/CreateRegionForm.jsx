//React utilities
import { useState, useRef } from "react";
//Hooks
import { useNavigate } from "react-router-dom";
//Routing
//Components
import {
  Row,
  Form,
  Col,
  Input,
  Button,
  Checkbox,
  Select,
  Dropdown,
  DatePicker,
  Menu,
} from "antd";
import { FaUserTag, FaIdCard, FaLanguage, FaCalendarAlt } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
//Images
//Styles

const { Option } = Select;

const CreateRegionForm = (props) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [nInputs, setNInputs] = useState(1);
  const [nselected, setNSelected] = useState(0);
  const hiddenFileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState("");

  const [form] = Form.useForm();

  const addInput_onClick = () => {
    setNInputs((current) => current + 1);
  };
  const removeInput_onClick = () => {
    if (nInputs > 0) {
      setNInputs((current) => current - 1);
    }
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const handleChange = async (event) => {
    const streamFile = await event.target.files[0].stream();

    // shapefile.open(streamFile).then((source) =>
    //   source.read().then(function log(result) {
    //     if (result.done) return;
    //     console.log(result.value);
    //     return source.read().then(log);
    //   })
    // );
    console.log(streamFile);
    setSelectedFile(event.target.files[0].name);
    console.log(selectedFile);
  };

  const handleMenuClick = (e) => {
    return null;
  };

  const handleCheckboxClick = (e) => {
    let nModify = 0;
    e.target.checked ? (nModify = 1) : (nModify = -1);
    setNSelected((prev) => prev + nModify);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: "1",
          label: <Checkbox onClick={handleCheckboxClick}>Usuario 1</Checkbox>,
        },
        {
          key: "2",
          label: <Checkbox onClick={handleCheckboxClick}>Usuario 2</Checkbox>,
        },
        {
          key: "3",
          label: <Checkbox onClick={handleCheckboxClick}>Usuario 3</Checkbox>,
        },
      ]}
    />
  );

  return (
    <Form layout={"vertical"} name="basic" form={form}>
      <Form.Item
        label="Nombre Corto"
        name="short_name"
        rules={[
          {
            required: true,
            message: "Ingrese un nombre de al menos 3 caracteres",
            min: 4,
          },
        ]}
      >
        <Input addonBefore={<FaIdCard />} />
      </Form.Item>
      <Form.Item
        label="Nombre Completo"
        name="full_name"
        rules={[
          {
            required: true,
            message: "Ingrese un nombre de al menos 3 caracteres",
            min: 5,
          },
        ]}
      >
        <Input addonBefore={<FaIdCard />} />
      </Form.Item>
      <Form.Item label="Archivo vectorial (.shp)" rules={[{ required: true }]}>
        <Input
          disabled
          value={selectedFile}
          addonAfter={
            <Button size="small" type="text" onClick={handleClick}>
              Browse
            </Button>
          }
        />
        <input
          className="input_shapefile"
          type="file"
          style={{ display: "none" }}
          ref={hiddenFileInput}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: "5px" }}>
        <Checkbox>Publicar</Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox>Generar Informe</Checkbox>
      </Form.Item>
      <Form.Item label="Reciven Informes" >
        <Input.Group compact >
          {Array.from(Array(nInputs).keys()).map((x, index) => {
            return <Input key={index} type="email" />;
          })}
        </Input.Group>
        <Button
          type="secondary"
          onClick={addInput_onClick}
          shape="circle"
          size="small"
          style={{ marginRight: "5px", marginTop: "3px" }}
          icon={<AiOutlinePlus />}
        ></Button>
        {nInputs > 0 && (
          <Button
            onClick={removeInput_onClick}
            type="secondary"
            shape="circle"
            size="small"
            style={{ marginTop: "3px" }}
            icon={<AiOutlineMinus />}
          ></Button>
        )}
      </Form.Item>
      <Form.Item label="Fechas">
        <Input.Group compact>
          <Input
            disabled
            style={{ width: "3em", cursor: "default" }}
            prefix={<FaCalendarAlt style={{ color: "rgba(0,0,0,.85)" }} />}
          />
          <DatePicker.RangePicker
            suffixIcon={null}
            style={{ width: "calc(100% - 3em)" }}
          />
        </Input.Group>
      </Form.Item>
      <Form.Item label="Idioma">
        <Input.Group compact>
          <Input
            disabled
            style={{ width: "3em", cursor: "default" }}
            prefix={
              <FaLanguage
                style={{ color: "rgba(0,0,0,.85)", fontSize: "1.5em" }}
              />
            }
          />
          <Select style={{ width: "calc(100% - 3em)" }}>
            <Option value="En">Inglés</Option>
            <Option value="Es">Español</Option>
            <Option value="Pr">Portugués</Option>
          </Select>
        </Input.Group>
      </Form.Item>
      <Form.Item label={"Propietarios"}>
        <Dropdown
          overlay={menu}
          onVisibleChange={handleVisibleChange}
          visible={visible}
          placement="topLeft"
          trigger={"click"}
        >
          <Button type="primary" style={{ width: "100%" }}>
            {nselected} Seleccionados
          </Button>
        </Dropdown>
      </Form.Item>
      <Form.Item>
        <Row gutter={3}>
          <Col>
            <Button
              type="primary"
              danger={true}
              onClick={() => navigate("/regiones")}
            >
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => alert("'Ver Mapa' no implementado")}
            >
              Ver Mapa
            </Button>
          </Col>

          <Col>
            <Button type="primary" htmlType="submit">
              {!props.edit && "Crear Región"}
              {props.edit && "Actualizar Región"}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CreateRegionForm;
