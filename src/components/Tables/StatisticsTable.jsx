//Components
import { Table } from "antd";

const COLUMNS = [
  {
    title: "Region",
    dataIndex: "region",
    sorter: (a, b) => (a.region < b.region ? -1 : 1),
  },
  {
    title: "Flujo Máximo",
    dataIndex: "max_flux",
    sorter: (a, b) => a.max_flux - b.max_flux,
  },
  {
    title: "Flujo Mínimo",
    dataIndex: "min_flux",
    sorter: (a, b) => a.min_flux - b.min_flux,
  },
  {
    title: "Flujo Promedio",
    dataIndex: "mean_flux",
    sorter: (a, b) => a.mean_flux - b.mean_flux,
  },
  {
    title: "Flujo Total",
    dataIndex: "total_flux",
    sorter: (a, b) => a.total_flux - b.total_flux,
  },
];

const date_format = {
    year: "numeric",
    month:"numeric"
}

const DUMMY_DATA = [
  {
    key: "1",
    region: "Region 1",
    max_flux: 4500,
    min_flux: 0,
    mean_flux: 2000,
    total_flux: 30000
  },
  {
    key: "2",
    region: "Region 2",
    max_flux: 1800,
    min_flux: 0,
    mean_flux: 1000,
    total_flux: 10000
  },
  {
    key: "3",
    region: "Region 3",
    max_flux: 600,
    min_flux: 0,
    mean_flux: 200,
    total_flux: 7000
  },
  {
    key: "4",
    region: "Region 4",
    max_flux: 100,
    min_flux: 0,
    mean_flux: 50,
    total_flux: 3000
  },
];

const StatisticsTable = () => {
  return (
      <Table
        columns={COLUMNS}
        scroll={{ x: 800 }}
        dataSource={DUMMY_DATA}
        style={{ width: "100%" }}
      />
  );
};

export default StatisticsTable