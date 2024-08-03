"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from "react-hook-form";

const FormSchema = z.object({
    code: z.string().min(6, "Code must be at least 6 characters long"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

type IResetFormInput = z.infer<typeof FormSchema>;

export default function ResetPassword() {
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IResetFormInput>({
        resolver: zodResolver(FormSchema),
    });

    useEffect(() => {
        if (timer > 0 && !canResend) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (timer === 0) {
            setCanResend(true);
        }
    }, [timer, canResend]);

    const onSubmit = (data: IResetFormInput) => {
      
    };

    const handleResend = () => {
        setTimer(60);
        setCanResend(false);
       
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-stone-50 dark:bg-stone-900 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-lg p-6 bg-white dark:bg-stone-800 shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-stone-900 dark:text-stone-100">Reset Password</CardTitle>
                    <CardDescription className="text-stone-600 dark:text-stone-400">Enter the verification code and your new password</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label htmlFor="code" className="text-stone-900 dark:text-stone-100">Verification Code</Label>
                            <Input
                                id="code"
                                type="text"
                                placeholder="Enter the verification code"
                                className="bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100 border-stone-300 dark:border-stone-600 focus:border-stone-500 dark:focus:border-stone-500 focus:ring-stone-500 dark:focus:ring-stone-500"
                                {...register("code", { required: true })}
                            />
                            {errors.code && <p className="text-red-600">{errors.code.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-stone-900 dark:text-stone-100">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                placeholder="Enter your new password"
                                className="bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100 border-stone-300 dark:border-stone-600 focus:border-stone-500 dark:focus:border-stone-500 focus:ring-stone-500 dark:focus:ring-stone-500"
                                {...register("newPassword", { required: true })}
                            />
                            {errors.newPassword && <p className="text-red-600">{errors.newPassword.message}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-stone-600 hover:bg-stone-700 text-white dark:bg-stone-400 dark:hover:bg-stone-500 dark:text-stone-900">
                            Continue
                        </Button>
                    </form>
                    {canResend ? (
                        <Button
                            variant="link"
                            className="mt-4"
                            onClick={handleResend}
                        >
                            Resend Code
                        </Button>
                    ) : (
                        <p className="mt-4 text-center text-stone-600 dark:text-stone-400">
                            Resend code in {timer} seconds.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
