import React from "react";
import { Card, Tabs, Button } from "antd";
import TodoList from "./TodoList";

export default function TodoCard() {

  const tabItems = [
    {
      key: "1",
      label: `Done`,
      children: <TodoList status="Done" />,
    },
    {
      key: "2",
      label: `Pending`,
      children: <TodoList status="Pending" />,
    },
  ];

  return (
    <div style={{ marginTop: "1.5rem", padding: "0 50px" }}>
      <Card>
        <Tabs
          tabBarExtraContent={<><Button type="primary">Add Todo</Button></>}
          defaultActiveKey="1"
          type="card"
          size="small"
          items={tabItems}
        />
      </Card>
    </div>
  );
}
