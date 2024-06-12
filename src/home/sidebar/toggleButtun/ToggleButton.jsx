import React from "react";
import "../toggleButtun/ToggleButtun.css";
import { Button } from "antd";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const ToggleButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme}>
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

export default ToggleButton;
