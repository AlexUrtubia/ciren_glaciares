import React from 'react'
import { Space } from 'antd';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function SearchFilterContainer({title, secondary, form}) {

  return (
      <div style={{ marginTop: '-25px', marginBottom: '5px', padding: '1em'}}>
        <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
          <Title level={4}>{title}</Title>
        </Space>
        <Space direction="horizontal" style={{width:'100%', justifyContent: 'center', padding: '10px', textAlign: 'center', marginTop: '-11px'}}>
          <Text italic >{secondary}</Text>
        </Space>
        {form}
    </div>
  )
}
