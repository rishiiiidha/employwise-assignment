
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the appropriate page based on authentication status
    if (isAuthenticated) {
      navigate("/users");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-employwise-gray">
      <div className="text-center">
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
