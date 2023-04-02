import React, { useState } from "react";
import { Card, Tabs, Button, Modal, Input, message } from "antd";
import TodoList from "./TodoList";
import TodoService from "../services/todoService";

const { TextArea } = Input;

export default function TodoCard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshTodoList, setRefreshTodoList] = useState(false);
  const [todo, setTodo] = useState({
    name: "",
    description: "",
  });

  const tabItems = [
    {
      key: "1",
      label: `Done`,
      children: (
        <TodoList
          status="Done"
          refreshTodoList={refreshTodoList}
          setRefreshTodoList={setRefreshTodoList}
        />
      ),
    },
    {
      key: "2",
      label: `Pending`,
      children: (
        <TodoList
          status="Pending"
          refreshTodoList={refreshTodoList}
          setRefreshTodoList={setRefreshTodoList}
        />
      ),
    },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const createTodo = async () => {
    const { name, description } = todo;
    if (name == "" || description == "") {
      message.error("Please Fill Out All The Fields");
    } else {
      const add = await TodoService.addTodo(todo);
      if (add.data.success == true) {
        message.success("Successfully Created");
        setRefreshTodoList(true);
      } else {
        message.error("An Error Occured Please Try Again Later");
      }
      setTodo({ name: "", description: "" });
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setTodo({ name: "", description: "" });
    setModalVisible(false);
  };

  return (
    <div style={{ marginTop: "1.5rem", padding: "0 50px" }}>
      <Card>
        <Tabs
          tabBarExtraContent={
            <>
              <Button onClick={() => setModalVisible(true)} type="primary">
                Create Todo
              </Button>
            </>
          }
          defaultActiveKey="1"
          type="card"
          size="small"
          items={tabItems}
          onChange={() => setRefreshTodoList(true)}
        />
        <Modal
          destroyOnClose={true}
          title="Create Todo"
          open={modalVisible}
          onOk={() => createTodo()}
          onCancel={() => handleCancel()}
        >
          <div>
            <Input
              showCount
              maxLength={15}
              placeholder="Name"
              value={todo.name}
              name="name"
              onChange={handleInputChange}
              style={{ marginBottom: "0.5rem" }}
            />
            <TextArea
              showCount
              maxLength={50}
              placeholder="Description"
              value={todo.description}
              name="description"
              onChange={handleInputChange}
              rows={2}
              style={{ marginBottom: "1.5rem" }}
            />
          </div>
        </Modal>
      </Card>
    </div>
  );
}
