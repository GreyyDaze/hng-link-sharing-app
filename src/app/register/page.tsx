"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthHeader from "@/components/common/AuthHeader";
import Image from "next/image";
import CustomButton from "@/components/common/Button";
import { toast, Toaster } from 'react-hot-toast';

type FormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message); 
        router.push("/"); 
      } else {
        toast.error(result.message); 
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred while registering. Please try again."); 
    }
  };

  const password = watch("password");


  return (
    <div className="min-h-screen flex flex-col pt-9 pb-0 md:pb-10 gap-10 md:items-center justify-center bg-white md:bg-gray-lighter">
      <AuthHeader />
      <Card className="w-full max-w-md p-7 pt-6 md:p-10 border-none">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-heading-m text-gray-dark">Create account</h1>
            <p className="text-body-m text-gray-default">
              Let&rsquo;s get you started sharing your links!
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-body-s text-gray-dark">
                Email address
              </label>
              <div className="relative">
                <Image
                  width={200}
                  height={200}
                  src="/icons/envelope.svg"
                  alt="Email address"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-default h-5 w-5"
                />
                <Input
                  id="email"
                  {...register("email", {
                    required: "Can't be empty",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please use a valid email address",
                    },
                  })}
                  placeholder="e.g. alex@email.com"
                  className={`pl-12 text-body-m border ${
                    errors.email ? "border-error" : "border-gray-light"
                  } focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent focus:outline-none focus:border-primary-default focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]`}
                />
                {errors.email && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-error text-body-s">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-body-s text-gray-dark">
                Create password
              </label>
              <div className="relative">
                <Image
                  src="/icons/lock.svg"
                  alt="Lock"
                  width={200}
                  height={200}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-default h-5 w-5"
                />
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Can't be empty",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="At least 8 characters"
                  className={`pl-12 text-body-m border ${
                    errors.password ? "border-error" : "border-gray-light"
                  } focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent  focus:outline-none focus:border-primary-default focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]`}
                />
                {errors.password && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-error text-body-s">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-body-s text-gray-dark"
              >
                Confirm password
              </label>
              <div className="relative">
                <Image
                  src="/icons/lock.svg"
                  alt="Lock"
                  width={200}
                  height={200}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-default h-5 w-5"
                />
                <Input
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Can't be empty",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="At least 8 characters"
                  className={`pl-12 text-body-m border ${
                    errors.confirmPassword
                      ? "border-error"
                      : "border-gray-light"
                  } focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent focus:outline-none focus:border-primary-default focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]`}
                />
                {errors.confirmPassword && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-error text-body-s">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <p className="text-body-s text-gray-default">
              Password must contain at least 8 characters
            </p>
            <CustomButton
              type="submit"
              className="w-full font-normal"
            >
              Create new account
            </CustomButton>
          </form>
          <p className="text-body-m text-center text-gray-default">
            Already have an account?{" "}
            <Link
              href="/"
              className="text-primary-default hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
      <Toaster/>
    </div>
  );
};

export default CreateAccount;
