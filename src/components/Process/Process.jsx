import { Descriptions, Card, Typography, Button } from "antd";
import { FaPlay, FaStop } from "react-icons/fa";

const Text = Typography.Text;

const Process = ({ description, last_execution, status, title }) => {
  return (
    <Card type="inner" style={{ margin: "1rem" }}>
      <Descriptions title={title} layout="vertical" bordered={true}>
        <Descriptions.Item label={<Text strong>Estado</Text>}>
          <Text type={status==="success"? "success":"danger"}> 
          {status==="success"? "activo":"inactivo"}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Acciones</Text>}>
          <Button
            type="primary"
            icon={<FaPlay />}
            style={{ marginRight: "5px" }}
          />
          <Button type="primary" danger icon={<FaStop />} />
        </Descriptions.Item>

        <Descriptions.Item label={<Text strong>Última ejecución</Text>}>
          {last_execution}
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Descripción</Text>}>
          {description}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Process;
