//Components
import { Card } from "antd";
import CardTitle from "../../components/UI/CardTitle";
import { FaUserEdit } from "react-icons/fa";
import CreateUserForm from "../../components/Forms/CreateUserForm";

const EditarUsuario = () => {
    return (
        <Card
      title={<CardTitle title="Editar Usuario" icon={FaUserEdit} />}
      style={{ margin: "1rem" }}
    >
      <CreateUserForm edit={true}/>
    </Card>
    )
}

export default EditarUsuario;