"use client";
import React, { useState, ChangeEvent, use, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { useLinks } from "@/contexts/LinksContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { set } from "mongoose";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfileDetails: React.FC = () => {
  const { setProfilePic, setName, setEmail } = useLinks();
  const [image, setImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const { data: session, status } = useSession();
  const router = useRouter();

  const userId = session?.user?.id;
  const token = session?.accessToken;

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      toast.error("You are not authenticated. Redirecting to home...");
      router.push("/");
      return;
    }
  });

  const onSubmit: SubmitHandler<ProfileFormData> = async (
    data: ProfileFormData
  ) => {
    setProfilePic(image);
    setName(`${data.firstName} ${data.lastName}`);
    setEmail(data.email);
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("userId", userId?.toString() ?? "");
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      if (image) {
        formData.append("profilePic", image);
      }

      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await response.json();

      if (result.message === "Profile updated successfully") {
        setName(`${data.firstName} ${data.lastName}`);
        setEmail(data.email);
        if (image) {
          setProfilePic(image);
        }
        console.log(result.user);
        toast.success("Profile updated successfully");
      } else {
        console.error(result.message);
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 className="text-heading-s md:text-2xl lg:text-heading-m text-gray-dark mb-2">
        Profile Details
      </h1>
      <p className="text-body-s md:text-body-m text-gray-default mb-10">
        Add your details to create a personal touch to your profile.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-gray-lighter p-6 rounded-xl ">
          <div className="flex justify-between md:items-center mb-4 flex-col w-full max-w-full md:flex-row">
            <Label className="text-body-s text-gray-default">
              Profile picture
            </Label>

            <div className="w-[160px] h-[160px] md:w-[193px] md:h-[193px] bg-primary-lighter rounded-xl overflow-hidden -mr-10 mt-4 md:mt-0 ">
              <Button
                type="button"
                variant="ghost"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="w-full h-full p-0 flex flex-col items-center justify-center text-primary-default hover:text-primary-default relative"
              >
                {image && (
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt="Profile Preview"
                      layout="fill"
                      className="object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                  </div>
                )}
                <div className="absolute flex flex-col justify-center items-center">
                  <FaImage
                    className={`w-10 h-10 mb-2 hover:text-primary-default ${
                      image && "text-white"
                    }`}
                  />
                  <span
                    className={`text-body-s md:text-body-m font-medium ${
                      image && "text-white"
                    }`}
                  >
                    {image ? "Change Image" : "+ Upload Image"}
                  </span>
                </div>
              </Button>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-body-s text-gray-default mt-4 md:mt-0 md:text-right">
              Image must be below 1024x1024px.
              <br />
              Use PNG or JPG format.
            </span>
          </div>
        </div>

        <div className="space-y-3 bg-primary-lighter p-5 rounded-xl">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Label
              htmlFor="firstName"
              className="text-body-s md:text-body-m text-gray-default mb-1 block "
            >
              First name*
            </Label>
            <div className="relative md:max-w-[70%] md:w-[70%]">
              <Input
                id="firstName"
                {...register("firstName", { required: "Can't be empty" })}
                className={`w-full border focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent ${
                  errors.firstName
                    ? "border-error focus:border-error"
                    : "border-gray-light focus:border-primary-default"
                } rounded-lg px-4 py-3 text-body-m text-gray-dark placeholder-gray-default focus:ring-0 focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]`}
                placeholder="e.g. John"
              />
              {errors.firstName && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-error text-body-s">
                  {errors.firstName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Label
              htmlFor="lastName"
              className="text-body-s text-gray-default mb-1 block"
            >
              Last name*
            </Label>
            <div className="relative md:max-w-[70%] md:w-[70%]">
              <Input
                id="lastName"
                {...register("lastName", { required: "Can't be empty" })}
                className={`w-full border focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent ${
                  errors.lastName
                    ? "border-error focus:border-error"
                    : "border-gray-light focus:border-primary-default"
                } rounded-lg px-4 py-3 text-body-m text-gray-dark placeholder-gray-default focus:ring-0 focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]`}
                placeholder="e.g. Appleseed"
              />
              {errors.lastName && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-error text-body-s">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row  md:justify-between md:items-center">
            <Label
              htmlFor="email"
              className="text-body-s md:text-body-m text-gray-default mb-1 block"
            >
              Email
            </Label>
            <div className="relative md:max-w-[70%] md:w-[70%]">
              <Input
                id="email"
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full border focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent${
                  errors.email
                    ? "border-error focus:border-error"
                    : "border-gray-light focus:border-primary-default"
                } rounded-lg px-4 py-3 text-body-m text-gray-dark placeholder-gray-default focus:ring-0 focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]`}
                placeholder="e.g. email@example.com"
              />
              {errors.email && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-error text-body-s">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div className="absolute left-0 right-0 border-t border-gray-light"></div>

          <div className="w-full md:flex md:justify-end pt-6">
            <Button
              type="submit"
              className="w-full md:w-fit bg-primary-default hover:bg-primary-light text-white px-7 py-3 rounded-lg"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileDetails;
