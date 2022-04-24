import React, { useState, useContext, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import {
  ExperimentOutlined,
  CalendarOutlined,
  AppstoreAddOutlined,
  BoxPlotOutlined,
  SearchOutlined,
  UserOutlined
} from "@ant-design/icons";

export default function SideMenu(props) {
  const location = useLocation();
  const { Sider } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    props.OnCollapse(collapsed);
  };
  const { user } = useContext(AuthContext);
  const unAuthRoutes = ["/login", "/register", "/"];
  // console.log(unAuthRoutes.includes(location.pathname));

  useEffect(() => {
    if (unAuthRoutes.includes(location.pathname)) {
      props.SideMenuVisible(false);
    } else {
      props.SideMenuVisible(true);
    }
  }, [location.pathname]);

  return (
    user && (
      <Sider
        breakpoint="lg"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="text-base select-none"
        >
          <Menu.Item key="1" icon={<AppstoreAddOutlined style={{ fontSize: "1.2rem" }} />}>
            Dashboard
            <Link exact to="/dashboard" />
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined style={{ fontSize: "1.2rem" }} />}>
            Scheduler
            <Link exact to="/scheduler" />

          </Menu.Item>
          <SubMenu
            key="sub1"
            className="text-base"
            title={
              <span className="flex items-center">
                <ExperimentOutlined style={{ fontSize: "1.2rem" }} />
                <span>Recipes</span>
              </span>
            }
          >
            <Menu.Item key="3" icon={<SearchOutlined style={{ fontSize: "1.2rem" }} />}>
              <span className="text-base">Search</span>
              <Link exact to="/recipes" />
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined style={{ fontSize: "1.2rem" }} />}>
              <span className="text-base">User Recipes</span>
              <Link exact to="/userRecipes" />
            </Menu.Item>
          </SubMenu>
          {/* <Menu.Item key="6" icon={<ExperimentOutlined style={{ fontSize: "1.2rem" }} />}>
            Recipes
            <Link exact to="/recipes" />
          </Menu.Item> */}
          <Menu.Item key="7" icon={<BoxPlotOutlined style={{ fontSize: "1.2rem" }} />}>
            Workout
          </Menu.Item>
        </Menu>
      </Sider>
    )
  );
}
