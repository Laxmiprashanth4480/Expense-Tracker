import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Serve images from /public/assets
  const loginHero1 = "/assets/loginhero.png";

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE}/users/login`,
        values
      );
      message.success("Login Successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/home");
    } catch (error) {
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong";
      message.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {loading && <Spinner />}

      {/* Left Side - Illustration */}
      <div className="w-full lg:w-1/2 bg-blue-600 flex justify-center items-center p-8 lg:p-16">
        <img src={loginHero1} alt="Login Hero" className="max-w-full h-auto" />
      </div>

      {/* Back Arrow */}
      <div className="absolute top-4 left-4">
        <div className="bg-white rounded-full p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
          <ArrowLeftOutlined onClick={() => navigate("/")} className="text-blue-600 text-2xl" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-white flex flex-col justify-center items-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-600">POCKETLY</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Welcome Back :)</h2>
        <p className="text-gray-600 text-center">
          Log in to effortlessly track your expenses and gain control of your financial journey.
        </p>

        <Form
          layout="vertical"
          onFinish={submitHandler}
          className="w-full max-w-md space-y-4"
          autoComplete="on"
        >
          {/* Email */}
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              disabled={loading}
              className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              autoComplete="current-password"
              disabled={loading}
              className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login Now"}
          </button>

          {/* Link to Register */}
          <Link to="/register" className="text-blue-600 text-sm hover:underline">
            Don’t have an account? Create one
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
