import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Serve from /public/assets
  const registerHero1 = "/assets/loginhero2.png";

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_API_BASE}/users/register`, values);
      message.success("Registration successful");
      navigate("/login");
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
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {loading && <Spinner />}

      {/* Left side illustration */}
      <div className="w-full lg:w-1/2 bg-blue-600 flex justify-center items-center p-8 lg:p-16">
        <img src={registerHero1} alt="Register Hero" className="max-w-full h-auto" />
      </div>

      {/* Back arrow */}
      <div className="absolute top-4 left-4">
        <div className="bg-white rounded-full p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
          <ArrowLeftOutlined onClick={() => navigate("/")} className="text-blue-600 text-2xl" />
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-white flex flex-col justify-center items-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-600">POCKETLY</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Create Your Account</h2>
        <p className="text-gray-600 text-center">
          Sign up to get started with our services and enjoy your experience.
        </p>

        <Form
          layout="vertical"
          onFinish={submitHandler}
          className="w-full max-w-md space-y-4"
          autoComplete="on"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              placeholder="Name"
              autoComplete="name"
              disabled={loading}
              className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item
            label="Email"
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

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              autoComplete="new-password"
              disabled={loading}
              className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register Now"}
          </button>

          <Link to="/login" className="text-blue-600 text-sm hover:underline">
            Already registered? Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
