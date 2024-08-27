import React, { useState } from "react";
import "../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Button, theme, Switch } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import LoginForm from "./login/Login";
import Logo from "./component/sidebar/logo/Logo";
import MenuList from "./component/sidebar/menu/Menu";
import ToggleButton from "./component/sidebar/toggleButtun/ToggleButton";
import Home from "./component/home/Home";
import Faq from "./component/sidebar/faq/Faq";
import SupportModal from "./component/sidebar/support/Support";
import Assignments from "./component/sidebar/assignment/Assignment";
import CourseControls from "./component/course/FormSlot";
import Materials from "./component/course/matrrials/Materials";
import Assign from "./component/course/assign/Assign";
import Activities from "./component/course/activities/Activities";

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
  const handleSupportCancel = () => {
    setIsSupportModalVisible(false);
  };
  // Faqs


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

  const renderContent = () => {
    switch (selectedMenu) {
      case "home":
        return <Home />;
      case "assignments":
        return <Assignments />;
      default:
        return <Home />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/course/:courseId" element={<CourseControls />} /> 
        <Route path="/material/:courseId" element={<Materials/>} />
        <Route path="/assignment/:courseId" element={<Assign/>} />
        <Route path="/activity/:courseId" element={<Activities/>} />
        <Route path="/home" element={
          <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsed={collapse} theme={darkTheme ? "dark" : "light"}
              className="sidebar">
              <Logo />
              <MenuList
                darkTheme={darkTheme}
                setSelectedMenu={setSelectedMenu}
                handleMenuClick={handleMenuClick}
              />
              <ToggleButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
            </Sider>
            <Layout>
              <Header style={{ padding: "0", height: "45px", background: colorBgContainer }}>
                <Button
                  type="text"
                  className="toggle"
                  onClick={() => setCollapse(!collapse)}
                  icon={
                    collapse ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />} />
              </Header>
              <Content style={{ padding: "24px" }}>
                <Home
                  selectedMenu={selectedMenu}
                />
                {renderContent()}
                 <Faq show={isFaqModalVisible} handleClose={handleFaqCancel} />
                <SupportModal
                  show={isSupportModalVisible}
                  handleClose={handleSupportCancel}
                />
              </Content>
            </Layout>
          </Layout>
        }
        />
        
      </Routes>
      
    </Router>
  );
}

export default App;
