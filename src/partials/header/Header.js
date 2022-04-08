import React, { useContext } from "react";
import { Layout } from "antd";
import { AuthContext } from "../../context/auth";
import MainHeader from "../MainHeader";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
     user && <MainHeader/>
  );
}
