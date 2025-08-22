import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        localStorage.removeItem("user");
        message.success("Logged out successfully");
        navigate("/");
      },
    });
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-semibold text-indigo-600 hover:text-indigo-800"
          >
            POCKETLY
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* User info */}
            <div className="flex items-center text-gray-800">
              <UserOutlined className="mr-2 text-lg text-indigo-600" />
              {loginUser && (
                <span className="font-medium">{loginUser.name}</span>
              )}
            </div>

            {/* Logout Button */}
            <button
              className={`${
                isLoggingOut
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-100"
              } py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-300`}
              onClick={logoutHandler}
              onMouseDown={() => setIsLoggingOut(true)}
              onMouseUp={() => setIsLoggingOut(false)}
              onMouseLeave={() => setIsLoggingOut(false)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
