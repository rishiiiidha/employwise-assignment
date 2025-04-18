
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-employwise-gray p-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-7xl font-bold text-employwise-blue mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
