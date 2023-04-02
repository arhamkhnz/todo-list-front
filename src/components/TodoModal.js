import React from "react";
import { Modal, Input, Select } from "antd";
const { Option } = Select;

export default function TodoModal(props) {
  const { type, visible, handleOk, handleCancel, todo, handleInputChange } =
    props;

  const statusOptions = ["Pending", "Done"];
  return (
    <Modal
      title={type === "edit" ? "Edit Todo" : "Create Todo"}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={type === "edit" ? "Update" : "Create"}
    >
      <div>
        {type === "edit" && (
          <Select
            style={{ marginBottom: "0.5rem", width: "100%" }}
            placeholder="Select Status"
            value={todo.status}
            onChange={(value) =>
              handleInputChange({ target: { name: "status", value } })
            }
          >
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        )}
        <Input
          showCount
          maxLength={15}
          placeholder="Name"
          value={todo.name}
          name="name"
          onChange={handleInputChange}
          style={{ marginBottom: "0.5rem" }}
        />
        <Input.TextArea
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
  );
}
