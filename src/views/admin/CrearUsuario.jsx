//Components
import { Card } from "antd";
import CardTitle from "../../components/UI/CardTitle";
import { FaUserPlus } from "react-icons/fa";
import CreateUserForm from "../../components/Forms/CreateUserForm";

const CrearUsuario = () => {
    return (
        <Card
      title={<CardTitle title="Crear Usuarios" icon={FaUserPlus} />}
      style={{ margin: "1rem" }}
    >
      <CreateUserForm/>
    </Card>
    )
}

export default CrearUsuario;