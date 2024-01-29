import { useState, useEffect } from "react";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { tableDashboard } from "../../redux/features/tableDashboard/tableDashboardSlice";

const TableDashboard = () => {
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();

  const handleGetListTableData = () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        access_token: token,
      },
    };
    dispatch(tableDashboard(config))
      .then((result) => {
        console.log(result.payload.orders);
        setTableData(result.payload.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetListTableData();
  }, []);

  const dataSource = tableData.map((item) => ({
    key: item.id,
    No: item.id,
    UserEmail: item.User.email,
    Car: item.Car?.name ? item.Car?.name : "Mobilio",
    StartRent: item.start_rent_at,
    FinishRent: item.finish_rent_at,
    Price: item.total_price,
    Category: item.Car?.category ? item.Car?.category : "Large",
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
    },
    {
      title: "User Email",
      dataIndex: "UserEmail",
      key: "User Email",
    },
    {
      title: "Car",
      dataIndex: "Car",
      key: "Car",
    },
    {
      title: "Start Rent",
      dataIndex: "StartRent",
      key: "Start Rent",
    },
    {
      title: "Finish Rent",
      dataIndex: "FinishRent",
      key: "Finish Rent",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
    },
  ];

  return (
    <div className="ms-4 mt-2">
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default TableDashboard;
