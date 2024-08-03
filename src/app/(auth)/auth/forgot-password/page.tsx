"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type IFormInput = z.infer<typeof FormSchema>;

export default function ForgotPassword() {
  const router = useRouter(); 

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: IFormInput) => {
    router.push('/auth/reset-password');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-50 dark:bg-stone-900 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg p-6 bg-white dark:bg-stone-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-stone-900 dark:text-stone-100">Forgot Password</CardTitle>
          <CardDescription className="text-stone-600 dark:text-stone-400">Reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-stone-900 dark:text-stone-100">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100 border-stone-300 dark:border-stone-600 focus:border-stone-500 dark:focus:border-stone-500 focus:ring-stone-500 dark:focus:ring-stone-500"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-stone-600 hover:bg-stone-700 text-white dark:bg-stone-400 dark:hover:bg-stone-500 dark:text-stone-900">
              Send Reset Link
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Button className="text-sm text-stone-600 dark:text-stone-400 px-8">
            <a href="/auth/sign-in" className="text-white dark:text-stone-100 ">Sign in</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
