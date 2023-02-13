//Components
import { Card } from "antd";
import CardTitle from "../../components/UI/CardTitle";
import { FaUsers } from "react-icons/fa";
import UsersTable from "../../components/Tables/UsersTable";


const Usuarios = () => {
    return (
        <Card title={<CardTitle title="Usuarios" icon={FaUsers}/>} style={{ margin: "1rem" }}>
            <UsersTable/>
        </Card>
    )
}

export default Usuarios