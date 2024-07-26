"use client";
import DraggableLink from "./Draggable";
import Image from "next/image";
import { LinkItem, useLinks } from "@/contexts/LinksContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const PhoneMockup = () => {
  const {
    links,
    moveLink,
    name: fullName,
    email: userEmail,
    profilePic: dp,
  } = useLinks();

  const { data: session, status } = useSession();
  const router = useRouter();

  const email = session?.user?.email || userEmail;
  const name = session?.user?.name || fullName;
  const profilePic = session?.user?.image || dp;

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      toast.error("You are not authenticated. Redirecting to home...");
      router.push("/");
      return;
    }
  });

  return (
    <div className="mx-auto relative w-[340px] h-[632px] bg-white rounded-[50px] overflow-hidden before:content-[''] before:absolute before:inset-0 before:border before:border-gray-light before:rounded-[50px] before:pointer-events-none">
      <div className="absolute inset-0 rounded-[50px] overflow-hidden">
        {/* Outer border */}
        <div className="absolute inset-2 sm:inset-3 border-[1px] border-gray-light rounded-[38px]"></div>

        {/* Notch */}
        <div className="absolute top-2 sm:top-3 left-1/2 transform -translate-x-1/2 w-[150px] h-[28px] bg-white border-b-[1px] border-x-[1px] border-gray-light rounded-b-[50px]"></div>

        {/* Inner border */}
        <div className="absolute inset-0 border-[1px] border-gray-light rounded-[35px]"></div>
      </div>

      {/* Screen content */}
      <div className="absolute top-[46px] left-[22px] right-[22px] bottom-[22px] bg-white rounded-[30px] flex flex-col items-center py-8 px-5 space-y-4 overflow-y-auto">
        {/* Profile section */}
        <div className="flex flex-col items-center space-y-4 mb-4">
          {/* Profile picture */}
          {profilePic ? (
            <Image
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full border-[4px] border-primary-default"
              width={200}
              height={200}
            />
          ) : (
            <div className="w-24 h-24 bg-[#EEE] rounded-full"></div>
          )}

          {/* Name and email */}
          {name ? (
            <span className="text-lg md:text-heading-2xl font-bold text-gray-dark">
              {name}
            </span>
          ) : (
            <div className="w-48 h-6 bg-[#EEE] rounded-full"></div>
          )}
          {email ? (
            <span className="text-sm md:text-body-m text-gray-default">
              {email}
            </span>
          ) : (
            <div className="w-32 h-4 bg-[#EEE] rounded-full"></div>
          )}
        </div>

        {/* Links */}
        <div className="w-full space-y-2">
          {links.map((link, index) => (
            <DraggableLink
              key={index}
              link={link}
              index={index}
              moveLink={moveLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
