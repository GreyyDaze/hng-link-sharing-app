"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { data: session, } = useSession();
  const userId = session?.user?.id;
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white m-0 md:m-6 md:rounded-xl">
      <div className="flex items-center space-x-2">
        <Image src="/icons/logo.png" alt="Devlinks" width={32} height={32} />
        <span className="text-2xl font-bold text-gray-dark hidden md:inline-block">
          devlinks
        </span>
      </div>
      <div className="flex space-x-2">
        <Link href="/links">
          <span
            className={`flex items-center space-x-2 rounded-lg py-1 px-2  ${
              pathname === "/links" ? "bg-primary-lighter" : ""
            }`}
          >
            <Button variant="ghost" className="flex items-center">
              <Image
                src="/icons/link.svg"
                alt="Links"
                width={20}
                height={20}
                className="mr-0 md:mr-2"
              />
              <span className="text-body-m text-primary-default hidden md:inline-block">
                Links
              </span>
            </Button>
          </span>
        </Link>

        <Link href="/profile">
          <span
            className={`flex items-center space-x-2 rounded-lg py-1 px-2 ${
              pathname === "/profile" ? "bg-primary-lighter" : ""
            }`}
          >
            <Button
              variant="ghost"
              className="flex items-center text-gray-default hover:text-primary-default"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={
                  isHovered ? "/icons/profile-purple.svg" : "/icons/profile.svg"
                }
                alt="Profile Details"
                width={20}
                height={20}
                className="mr-0 md:mr-2 hover:text-primary-default"
              />
              <span className="text-body-m hidden md:inline-block">
                Profile Details
              </span>
            </Button>
          </span>
        </Link>
      </div>
      <Link href={`/preview/${userId}`}>
        <span
          className={`flex items-center space-x-2 rounded-lg py-1 px-2  ${
            pathname === `/preview/${userId}` ? "bg-primary-lighter" : ""
          }`}
        >
          <Button
            variant="outline"
            className="border-primary-default hover:bg-primary-lighter flex justify-center items-center"
          >
            <Image
              src="/icons/preview.svg"
              alt="Preview"
              width={20}
              height={20}
              className="inline-block md:hidden"
            />
            <span className="text-body-m hidden md:inline-block text-primary-default">
              Preview
            </span>
          </Button>
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
