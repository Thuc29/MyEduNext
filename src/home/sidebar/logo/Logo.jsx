import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./logo.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logo = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".user-icon")) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <>
      <div className="logo">
        <div className="logo-icon">
          <img
            style={{ width: "100%" }}
            src="./assets/logo_fpt.png"
            id="FptLogo"
          ></img>
        </div>
      </div>
      <div className="user-container" style={{ width: "100%" }}>
        <div className="user-icon" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        {dropdownVisible && (
          <div className="dropdown-content">
            <a href="#" style={{ height: "10px" }}>
              thuctdhe171729@fpt.edu.vn
            </a>
            <hr />
            <a href="#" onClick={handleLogout} style={{ paddingTop: "0" }}>
              <svg
                style={{ width: "20px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
              Logout
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Logo;
