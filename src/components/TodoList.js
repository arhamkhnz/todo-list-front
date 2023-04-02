import React, { useState, useEffect } from "react";
import { Table } from "antd";
import TodoService from "../services/todoService";

export default function TodoList({status}) {
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Todo",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  useEffect(() => {
      listTodos()
  }, []);

  const listTodos = async () => {
    const rawdata = TodoService.listTodo(status);
    console.log(rawdata)
  }

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={{ pageSize: 10 }}
    />
  );
}
