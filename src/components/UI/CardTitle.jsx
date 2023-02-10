//Components
import { Typography } from "antd";
//Models & Types

const CardTitle = ({title, icon : Icon}) => {
    return(
        <Typography.Title level={4}>
            <Icon/> {" " + title} 
        </Typography.Title>
    )
}

export default CardTitle