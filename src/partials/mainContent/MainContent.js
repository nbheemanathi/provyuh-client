import React, { useContext } from "react";
import { Layout } from "antd";
import { AuthContext } from "../../context/auth";
export default function MainContent(props) {
  const { Content } = Layout;
  const { user } = useContext(AuthContext);

  return (
    <Content className={` ${user ? "mx-4 my-4 p-6 min-h-50 overflow-auto" : ""}`}>
      {props.children}
    </Content>
  );
}
