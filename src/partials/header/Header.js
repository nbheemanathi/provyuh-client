import React, { useContext } from "react";
import { Layout } from "antd";
import { AuthContext } from "../../context/auth";
import UserMenu from "./UserMenu";
import MainHeader from "../MainHeader";

export default function Header() {
  const { Header } = Layout;
  const { user } = useContext(AuthContext);

  return (
     user && <MainHeader/>
  );
}
