import React, { useState, useEffect } from "react";
import { Button, Table, Modal, message, Spin, Input } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import TodoService from "../services/todoService";
import TodoModal from "./TodoModal";
import moment from "moment";
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Search } = Input;

export default function TodoList({
  status,
  refreshTodoList,
  setRefreshTodoList,
}) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [todo, setTodo] = useState({
    name: "",
    description: "",
    status: "",
  });

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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: (text) => moment(text).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      width: "15%",
      render: (id) => (
        <>
          <Button
            onClick={() => getTodoDetails(id)}
            style={{ margin: "1px" }}
            type="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => showConfirm(id)}
            style={{ margin: "1px" }}
            type="primary"
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    listTodos();
  }, [refreshTodoList]);

  const listTodos = async () => {
    setLoading(true);
    const rawdata = await TodoService.listTodo(status);
    const data = rawdata.data.data;
    setTableData(data);
    setRefreshTodoList(false);
    setLoading(false);
  };

  const getTodoDetails = async (id) => {
    setId(id);
    const rawdata = await TodoService.getTodoDetail(id);
    const data = rawdata.data.data;
    setTodo({
      name: data.name,
      description: data.description,
      status: data.status,
    });
    setModalVisible(true);
  };

  const deleteTodo = async (id) => {
    const delTodo = await TodoService.deleteTodo(id);
    if (delTodo.data.success === true) {
      message.success("Successfully Deleted");
    } else {
      message.error("An Error Occured Please Try Again Later");
    }
    setRefreshTodoList(true);
  };

  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete this Todo?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteTodo(id);
      },
      onCancel() {},
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const updateTodo = async () => {
    const { name, description, status } = todo;
    todo.id = id;
    if (name === "" || description === "" || status === "") {
      message.error("Please Fill Out All The Fields");
    } else {
      const update = await TodoService.updateTodo(todo);
      if (update.data.success === true) {
        message.success("Successfully Updated");
        setRefreshTodoList(true);
      } else {
        message.error("An Error Occured Please Try Again Later");
      }
      setTodo({ name: "", description: "", status: "" });
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setTodo({ name: "", description: "" });
    setModalVisible(false);
  };

  const handleSearch = (value) => {
    // setSearchText(value);
    const filteredData = tableData.filter((todo) =>
      todo.name.toLowerCase().includes(value.toLowerCase())
    );
    setTableData(filteredData);
  };

  const handleClearSearch = () => {
    setSearchValue(null)
    listTodos(status)
  };

  return (
    <>
      <Spin spinning={loading}>
        <div>
          <Search 
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            allowClear
            placeholder="Search"
            onSearch={handleSearch}
            style={{ width: 200, marginBottom: 16 }}
            addonAfter={<CloseCircleOutlined onClick={handleClearSearch} style={{marginLeft: "5px", cursor: "pointer", fontSize: "16px"}} />}
            enterButton
          />
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 10 }}
        />
      </Spin>
      <TodoModal
        type="edit"
        visible={modalVisible}
        handleOk={updateTodo}
        handleCancel={handleCancel}
        todo={todo}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
