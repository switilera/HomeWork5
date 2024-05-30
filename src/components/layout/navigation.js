import React, { useState } from "react";
import s from "./layout.module.css";
import { Menu } from "antd";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigation = useNavigate();

  const selectedKey = useLocation().pathname;

  const routeKeys = new Map([
    ["/", "home"],
    ["/search", "search"],
  ]);

  const items = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Главная страница",
      onClick: () => navigation("/"),
    },
    {
      key: "search",
      icon: <SearchOutlined />,
      label: "Поиск фильмов",
      onClick: () => navigation("/search"),
    },
  ];

  return (
    <Sider
      width={260}
      className={s.sidebar}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["home"]}
        selectedKeys={routeKeys.get(selectedKey)}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Navigation;
