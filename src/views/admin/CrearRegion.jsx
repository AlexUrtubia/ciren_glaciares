import { Card } from "antd";
import CardTitle from "../../components/UI/CardTitle";
import { RiMapPinAddFill } from "react-icons/ri";
import CreateRegionForm from "../../components/Forms/CreateRegionForm";

const CrearRegion = () => {
  return (
    <Card
      title={<CardTitle title="Crear Región" icon={RiMapPinAddFill} />}
      style={{ margin: "1rem" }}
    >
        <CreateRegionForm/>
    </Card>
  );
};

export default CrearRegion;
