//Components
import { Card } from "antd";
import CardTitle from "../../components/UI/CardTitle";
import { GiMountainCave } from 'react-icons/gi'
import GlaciersTable from "../../components/Tables/GlaListTable";


const Glaciares = () => {
    return (
        <Card title={<CardTitle title="Glaciares" icon={GiMountainCave}/>} style={{ margin: "1rem" }}>
            <GlaciersTable/>
        </Card>
    )
}

export default Glaciares