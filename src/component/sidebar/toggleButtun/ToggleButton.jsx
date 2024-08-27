import React from "react";
import "./ToggleButtun.css"; // Sửa lại đường dẫn file CSS
import { Button } from "antd";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const ToggleButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme} type="text" icon={darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />} />
    </div>
  );
};

export default ToggleButton;
