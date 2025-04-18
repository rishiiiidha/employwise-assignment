
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/users");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-employwise-gray p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-employwise-blue">EmployWise</h1>
        <p className="text-gray-600">User Management System</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
