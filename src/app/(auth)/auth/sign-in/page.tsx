'use client'
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";


// Define the schema for validation
const FormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must not be less than 3 characters")
    .max(25, "Username must not be greater than 25 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The username must contain only letters, numbers, and underscores (_)"
    ),
  password: z
    .string()
    .min(3, "Password must not be less than 3 characters")
    .max(16, "Password must not be greater than 16 characters"),
});

type IFormInput = z.infer<typeof FormSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-50 dark:bg-stone-900 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg p-6 bg-white dark:bg-stone-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-stone-900 dark:text-stone-100">Sign in</CardTitle>
          <CardDescription className="text-stone-600 dark:text-stone-400">Welcome Back</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
              <Button variant="outline" className="flex-1 flex items-center justify-center space-x-2">
                <AiOutlineGoogle className="h-5 w-5" />
                <span>Sign in with Google</span>
              </Button>
              <Button variant="outline" className="flex-1 flex items-center justify-center space-x-2">
                <AiOutlineGithub className="h-5 w-5" />
                <span>Sign in with GitHub</span>
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-stone-900 dark:text-stone-100">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100 border-stone-300 dark:border-stone-600 focus:border-stone-500 dark:focus:border-stone-500 focus:ring-stone-500 dark:focus:ring-stone-500"
                {...register("username", { required: true })}
              />
              {errors.username && <p className="text-red-600">{errors.username.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-stone-900 dark:text-stone-100">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100 border-stone-300 dark:border-stone-600 focus:border-stone-500 dark:focus:border-stone-500 focus:ring-stone-500 dark:focus:ring-stone-500 pr-10"
                  {...register("password", { required: true })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
                >
                  {showPassword ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-stone-600 hover:bg-stone-700 text-white dark:bg-stone-400 dark:hover:bg-stone-500 dark:text-stone-900">
              Sign In
            </Button>
          </form>
          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <a href ="/auth/forgot-password" className="text-stone-600 dark:text-stone-400 underline">
              Forgot Password?
            </a>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Not registered? <a href="/auth/sign-up" className="text-stone-900 dark:text-stone-100 underline">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
