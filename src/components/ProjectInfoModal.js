import React, { useState, useEffect } from "react";
import { Modal, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function ProjectInfoModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isProjectInfoModalShown = sessionStorage.getItem(
      "isProjectInfoModalShown"
    );

    if (!isProjectInfoModalShown) {
      setVisible(true);
      sessionStorage.setItem("isProjectInfoModalShown", true);
    }
  }, []);

  const handleOk = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="ToDo List"
      open={visible}
      onOk={handleOk}
      onCancel={handleOk}
    >
       <Typography>
        <Title level={4}>Description</Title>
        <Paragraph>
          This is a simple Todo List application that allows users to create,
          edit, and delete tasks. Users can also mark tasks as completed or
          pending. The application uses Ant Design for the UI components and
          Axios for the API calls.
        </Paragraph>

        <Title level={4}>Features</Title>
        <ul>
          <li>Sorting by date (click on the "Created At" column)</li>
          <li>Search functionality</li>
          <li>Create, edit, and delete tasks</li>
          <li>Mark tasks as completed or pending</li>
        </ul>

        <Title level={4}>Other Functionality</Title>
        <ul>
          <li>Deleting tasks require confirmation</li>
          <li>
            To modify the status name or description, users need to click on the
            edit button
          </li>
        </ul>

        <Title level={4}>Deployment</Title>
        <Paragraph>
          This project is deployed on a live URL: <a href="https://todo-list-front-puce.vercel.app/">Vercel Live URL</a>. It uses a live Node server deployed on Cyclic.
        </Paragraph>
      </Typography>
    </Modal>
  );
}
