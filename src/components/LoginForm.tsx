
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2, Sparkles } from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    const success = await login(data.email, data.password);
    if (success) {
      navigate("/users");
    }
  };

  return (
    <Card className="w-full max-w-md border-violet-200 dark:border-violet-800 overflow-hidden animate-scale-in">
      <div className="h-1.5 bg-gradient-to-r from-violet-500 to-cyan-400"></div>
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <Sparkles className="h-8 w-8 text-violet-500 animate-pulse" />
        </div>
        <CardTitle className="text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">
          Login to EmployWise
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the user management system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="eve.holt@reqres.in"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 transition-all duration-300" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="px-8 text-center text-sm text-muted-foreground">
          Use the preloaded credentials to log in with the Reqres API
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
