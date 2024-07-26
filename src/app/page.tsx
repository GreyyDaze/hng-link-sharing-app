"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import AuthHeader from "@/components/common/AuthHeader";
import CustomButton from "@/components/common/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error); 
      } else {
        toast.success("Login successful!");
        router.push("/links"); 
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="block md:flex md:justify-center md:items-center md:h-full md:w-full ">
      <div className="flex flex-col bg-white md:bg-inherit pt-9 pb-20 md:pt-30">
        <AuthHeader />
        <Card className="md:mt-10 mt-9 bg-white md:rounded-xl p-5 sm:p-8 md:p-10 md:w-[476px] max-w-full md:border border-none">
          <CardHeader className="p-0 pb-10 ">
            <CardTitle className="text-2xl md:text-heading-m font-bold text-gray-dark">
              Login
            </CardTitle>
            <CardDescription
              className="text-body-m text-gray-default"
              style={{ marginTop: "0.7rem" }}
            >
              Add your details below to get back into the app
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col"
              method="Post"
            >
              <div className="flex flex-col">
                <div className="text-body-s text-gray-dark mb-1">
                  Email address
                </div>
                <div
                  className={`flex items-center gap-1 px-4 py-2 text-body-m bg-white rounded-lg border border-solid ${
                    errors.email ? "border-error" : "border-gray-light"
                  } focus-within:border-primary-default focus-within:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]`}
                >
                  <div className="flex gap-3">
                    <Image
                      loading="lazy"
                      src="/icons/envelope.svg"
                      className="shrink-0 my-auto w-4 aspect-square"
                      alt="Email Icon"
                      width={16}
                      height={16}
                    />
                    <Input
                      type="email"
                      placeholder="e.g. alex@email.com"
                      className="border-none focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent p-0"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-error text-body-s ml-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-6">
                <div className="text-body-s text-gray-dark mb-1">Password</div>
                <div
                  className={`flex items-center gap-1 px-4 py-2 text-body-m bg-white rounded-lg border border-solid ${
                    errors.password ? "border-error" : "border-gray-light"
                  } focus-within:border-primary-default focus-within:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]`}
                >
                  <div className="flex gap-3">
                    <Image
                      loading="lazy"
                      src="/icons/lock.svg"
                      className="shrink-0 my-auto w-4 aspect-square"
                      alt="Password Icon"
                      width={16}
                      height={16}
                    />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="border-none focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent "
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.password && (
                    <span className="text-error text-body-s ml-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <CardFooter className="flex flex-col items-center p-0 mt-6 ">
                <CustomButton type="submit" className="font-normal w-full">
                  Login
                </CustomButton>
                <div className="mt-6 text-center flex flex-col justify-center md:flex-row">
                  <span className="text-body-m text-gray-default mr-[.1rem]">
                    Don’t have an account?
                  </span>
                  <Link
                    href="/register"
                    className="text-primary-default cursor-pointer"
                  >
                    Create account
                  </Link>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
