import React from "react";
import { Table } from "antd";
import { FaFilePdf, FaFileImage } from "react-icons/fa";

const COLUMNS = [
  {
    title: "Region",
    dataIndex: "region",
    sorter: (a, b) => (a.region < b.region ? -1 : 1),
  },
  {
    title: "Fecha",
    dataIndex: "date",
    sorter: (a, b) => (Date(a.date) < Date(b.date) ? -1 : 1),
  },
  {
    title: "Descargar",
    dataIndex: "download",
    key: "download",
    render: (_, record) => {
      return (
        <React.Fragment>
          <a
            onClick={() => {
              console.log("PDF");
              console.log(record);
            }}
          >
            {<FaFilePdf />}
            {"PDF"}
          </a>{" "}
          <a
            onClick={() => {
              console.log("GeoTIFF");
              console.log(record);
            }}
          >
            {<FaFileImage />}
            {"GeoTIFF"}
          </a>
        </React.Fragment>
      );
    },
  },
];

const date_format = {
  year: "numeric",
  month: "numeric",
};

const ReportTable = (props) => {
  const dateRange = props.dateRange;
  console.log(dateRange);

  const region = props.region;
  if (!dateRange && !region) {
    return <Table columns={COLUMNS}></Table>;
  }
  const date_start = dateRange[0];
  const date_end = dateRange[1];
  const dummy_data = [];
  let loop = new Date(date_start);
  console.log(loop);
  while (loop <= date_end) {
    dummy_data.push(loop);
    let newDate = loop.setMonth(loop.getMonth() + 1);
    loop = new Date(newDate);
  }
  const DUMMY_DATA = dummy_data.map((e, key) => {
    return {
      key: key,
      region: region,
      date: new Date(e).toLocaleString([], date_format),
      download: "",
    };
  });

  return <Table columns={COLUMNS} dataSource={DUMMY_DATA}></Table>;
};

export default ReportTable;
