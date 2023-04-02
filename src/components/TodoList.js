import React, { useState, useEffect } from "react";
import { Button, Table, Modal, message } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import TodoService from "../services/todoService";

const { confirm } = Modal;

export default function TodoList({status, refreshTodoList, setRefreshTodoList}) {
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      width: "20%",
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
    {
      title: "Action",
      dataIndex: "_id",
      key: "status",
      width: "15%",
      render: (id) => (
        <>
          <Button style={{margin: "1px"}} type="primary">Edit</Button>
          <Button onClick={() => showConfirm(id)} style={{margin: "1px"}} type="primary" danger>Delete</Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    listTodos();
  }, [refreshTodoList]);

  const listTodos = async () => {
    const rawdata = await TodoService.listTodo(status);
    const data = rawdata.data.data;
    setTableData(data);
    setRefreshTodoList(false);
  };

  const deleteTodo = async (id) => {
    const delTodo = await TodoService.deleteTodo(id)
    if(delTodo.data.success == true){
      message.success("Successfully Deleted")
    } else {
      message.error("An Error Occured Please Try Again Later");
    }
    setRefreshTodoList(true)
  }

  const showConfirm = (id) => {
    confirm({
      title: 'Do you Want to delete this Todo?',
      icon: <ExclamationCircleFilled />,
      onOk() {
       deleteTodo(id)
      },
      onCancel() {}
    });
  };

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={{ pageSize: 10 }}
    />
  );
}
