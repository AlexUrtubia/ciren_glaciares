import { Descriptions, Card, Typography, Button, DatePicker } from "antd";
import { FaPlay, FaStop } from "react-icons/fa";

const Text = Typography.Text;

const ModeloInversion = () => {
  return (
    <Card>
      <Descriptions
        layout="vertical"
        bordered={true}
        style={{ marginBottom: "2em" }}
      >
        <Descriptions.Item label={<Text strong>Descripción</Text>}>
          {
            "Proceso para estimar las flujos de gases de efecto invernadero a partir de observaciones satelitales de los gases. Este proceso de inversión necesita los archivos generados por el 'Modelo Atmosférico', por lo cual debe ser ejecutado sólo en períodos que el modelo previamente mencionado haya sido ejecutado de manera exitosa."
          }
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title={<Text>Ejecución Periodica</Text>}
        layout="vertical"
        bordered={true}
      >
        <Descriptions.Item label={<Text strong>Estado</Text>}>
          <Text type={"success"}>{"activo"}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Última Periodo Ejecutado</Text>}>
          {"05/08/2022"}
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Próxima Ejecución</Text>}>
          {"05/011/2022"}
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Acciones</Text>}>
          <Button
            type="primary"
            icon={<FaPlay />}
            style={{ marginRight: "5px" }}
          />
          <Button type="primary" danger icon={<FaStop />} />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title={<Text>Ejecución Manual</Text>}
        layout="vertical"
        bordered={true}
        style={{marginTop:"2em"}}
      >
        <Descriptions.Item label={<Text strong>Estado</Text>}>
          <Text type={"danger"}>{"inactivo"}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Periodo a Ejecutar</Text>}>
          <DatePicker.MonthPicker/>
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Acciones</Text>}>
          <Button
            type="primary"
            icon={<FaPlay />}
            style={{ marginRight: "5px" }}
          />
          <Button type="primary" danger icon={<FaStop />} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ModeloInversion;
