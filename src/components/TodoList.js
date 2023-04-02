import React, { useState, useEffect } from "react";
import { Table } from "antd";
import TodoService from "../services/todoService";

export default function TodoList({status, refreshTodoList, setRefreshTodoList}) {
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      width: "20%"
    },
    {
      title: "Name",
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
  }, [refreshTodoList]);

  const listTodos = async () => {
    const rawdata = await TodoService.listTodo(status);
    const data = rawdata.data.data
    setTableData(data)
    setRefreshTodoList(false);
  }

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={{ pageSize: 10 }}
    />
  );
}
