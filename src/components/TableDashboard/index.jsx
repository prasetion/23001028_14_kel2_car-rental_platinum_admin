import { useState, useEffect } from "react";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { tableDashboard } from "../../redux/features/tableDashboard/tableDashboardSlice";
import dayjs from "dayjs";

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
    StartRent: dayjs(item.start_rent_at).format("D MMM YYYY, HH:mm"),
    FinishRent: dayjs(item.finish_rent_at).format("D MMM YYYY, HH:mm"),
    Price: "Rp " + Intl.NumberFormat("es-ES").format(item.total_price),
    Category: item.Car?.category ? item.Car?.category : "Large",
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
      sorter: (a, b) => a.No - b.No,
    },
    {
      title: "User Email",
      dataIndex: "UserEmail",
      key: "User Email",
      sorter: (a, b) => a.UserEmail.localeCompare(b.UserEmail),
    },
    {
      title: "Car",
      dataIndex: "Car",
      key: "Car",
      sorter: (a, b) => a.Car.localeCompare(b.Car),
    },
    {
      title: "Start Rent",
      dataIndex: "StartRent",
      key: "Start Rent",
      sorter: (a, b) => dayjs(a.StartRent).valueOf() - dayjs(b.StartRent).valueOf(),
    },
    {
      title: "Finish Rent",
      dataIndex: "FinishRent",
      key: "Finish Rent",
      sorter: (a, b) => dayjs(a.FinishRent).valueOf() - dayjs(b.FinishRent).valueOf(),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      sorter: (a, b) => {
        const priceA = parseFloat(a.Price.replace(/[^\d.]/g, ""));
        const priceB = parseFloat(b.Price.replace(/[^\d.]/g, ""));
        return priceA - priceB;
      },
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
      sorter: (a, b) => a.Category.localeCompare(b.Category),
    },
  ];

  return (
    <div className="ms-4 mt-2">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default TableDashboard;
