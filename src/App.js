import React, { useState } from "react";
import "../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import LoginForm from "./login/Login";
import Logo from "./home/sidebar/logo/Logo";
import MenuList from "./home/sidebar/menu/Menu";
import ToggleButton from "./home/sidebar/toggleButtun/ToggleButton";
import Home from "./home/content/Home";
import Faq from "./home/faq/Faq";
import SupportModal from "./home/support/Support";
// import Assignment from "./home/assignment/Assignment";

const { Sider, Content, Header } = Layout;

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapse, setCollapse] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  //support
  const handleSupportOk = () => {
    setIsSupportModalVisible(false);
  };

  const handleSupportCancel = () => {
    setIsSupportModalVisible(false);
  };

  // Faqs
  const handleFaqOk = () => {
    setIsFaqModalVisible(false);
  };

  const handleFaqCancel = () => {
    setIsFaqModalVisible(false);
  };

  // click sidebar button
  const handleMenuClick = (key) => {
    if (key === "support") {
      setIsSupportModalVisible(true);
    } else if (key === "faq") {
      setIsFaqModalVisible(true);
    }
    setSelectedMenu(key);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/home"
          element={
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                collapsed={collapse}
                theme={darkTheme ? "dark" : "light"}
                className="sidebar"
              >
                <Logo />

                <MenuList
                  darkTheme={darkTheme}
                  setSelectedMenu={setSelectedMenu}
                  handleMenuClick={handleMenuClick}
                />
                <ToggleButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
              </Sider>
              <Layout>
                <Header
                  style={{
                    padding: "0",
                    height: "45px",
                    background: colorBgContainer,
                  }}
                >
                  <Button
                    type="text"
                    className="toggle"
                    onClick={() => setCollapse(!collapse)}
                    icon={
                      collapse ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
                    }
                  />
                </Header>
                <Content style={{ padding: "24px" }}>
                  <Home
                    selectedMenu={selectedMenu}
                    // //support
                    // isSupportModalVisible={isSupportModalVisible}
                    // handleSupportOk={handleSupportOk}
                    // handleSupportCancel={handleSupportCancel}
                    // // faq
                    // isFaqModalVisible={isFaqModalVisible}
                    // handleFaqOk={handleFaqOk}
                    // handleFaqCancel={handleFaqCancel}
                  />
                </Content>
              </Layout>
            </Layout>
          }
        />
      </Routes>
      <Faq show={isFaqModalVisible} handleClose={handleFaqCancel} />
      <SupportModal
        show={isSupportModalVisible}
        handleClose={handleSupportCancel}
      />
    </Router>
  );
}

export default App;
