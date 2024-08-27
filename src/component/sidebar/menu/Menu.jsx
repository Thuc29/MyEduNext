import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  FileTextFilled,
  CarryOutFilled,
  FilePdfFilled,
  CustomerServiceFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";

function MenuList({ darkTheme, handleMenuClick }) {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
      onClick={(e) => handleMenuClick(e.key)}
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="assignments" icon={<FileTextFilled />}>
        Assignments
      </Menu.Item>
      <Menu.Item key="us" icon={<CarryOutFilled />}>
        Upcoming slots
      </Menu.Item>
      <Menu.Item key="rag" icon={<FilePdfFilled />}>
        Read user guide
      </Menu.Item>
      <Menu.Item key="support" icon={<CustomerServiceFilled />}>
        Contact Support
      </Menu.Item>
      <Menu.Item key="faq" icon={<QuestionCircleFilled />}>
        Frequently Asked Questions
      </Menu.Item>
    </Menu>
  );
}

export default MenuList;
