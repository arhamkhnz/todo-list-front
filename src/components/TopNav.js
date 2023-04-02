import React from "react";
import { Menu } from "antd";

const { Item } = Menu;

export default function TopNav() {
  return (
    <Menu theme="dark" mode="horizontal">
      <Item style={{ fontSize: "20px", fontWeight: "bold", color: "#FFFFFF" }}>
        TODO LIST
      </Item>
    </Menu>
  );
}
