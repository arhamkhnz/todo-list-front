import React from "react";
import TopNav from "../components/TopNav";
import TodoCard from "../components/TodoCard";
import ProjectInfoModal from "../components/ProjectInfoModal";

export default function home() {
  return (
    <>
      <ProjectInfoModal />
      <TopNav />
      <TodoCard />
    </>
  );
}
