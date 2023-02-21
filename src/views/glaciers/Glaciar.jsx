//Components
import { Card } from "antd";
import CardTitle from "../../components/UI/CardTitle";
import { GiMountainCave } from 'react-icons/gi'
import GlaTable from "../../components/Tables/GlaTable";
import { useParams } from "react-router-dom";
import glaciers from '../../components/Map/features/glaciers.json'



const Glaciares = () => {

    const { id } = useParams()
    
    let glacier = glaciers.find(glacier => glacier.id == id)

    return (
        <Card title={<CardTitle title={`Glaciar ${glacier.name}`} icon={GiMountainCave}/>} style={{ margin: "1rem" }}>
            <GlaTable/>
        </Card>
    )
}

export default Glaciares