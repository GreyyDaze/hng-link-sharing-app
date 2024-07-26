"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import platforms from "@/utils/logos";
import { useSession } from "next-auth/react";

export default function ProfileCard() {
  const router = useRouter();
  const { userId } = useParams();
  const [user, setUser] = useState<{
    profilePic?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null>(null);
  const [profileLinks, setProfileLinks] = useState<
    { platformName: string; url: string }[]
  >([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
          setProfileLinks(data.profileLinks.platformLinks);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  const handleShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast("The link has been copied to your clipboard!", {
        icon: "🔗",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          width: "200px !important",
        },
        position: "bottom-center",
      });
    });
  };

  return (
    <div className="min-h-screen bg-white pb-4">
      <div className=" sm:bg-primary-default w-full sm:h-[357px] sm:rounded-b-[32px] relative">
        <div className="sm:absolute top-6 left-6 right-6 flex justify-between bg-white p-4 rounded-xl">
          <Button
            className={`bg-white text-primary-default border border-5 border-primary-default hover:bg-primary-lighter hover:text-primary-default px-4 py-2 h-10 rounded-lg ${
              session ? "" : "hidden"
            }`}
            style={{ border: "1px solid" }}
            onClick={() => router.back()}
          >
            Back to Editor
          </Button>
          <Button
            className="bg-primary-default text-end text-white border hover:bg-primary-default hover:text-white px-4 py-2 h-10 rounded-lg"
            onClick={handleShareLink}
          >
            Share Link
          </Button>
        </div>
        <div className="w-full sm:w-fit relative sm:absolute sm:top-48 sm:left-1/2 sm:transform sm:-translate-x-1/2">
          <Card className="bg-white p-10 sm:rounded-xl sm:shadow-lg  border-0 sm:border">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
                <Image
                  src={user?.profilePic || ""}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-[4px] border-primary-default"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className="text-heading-s text-gray-dark mb-1">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-body-m text-gray-default mb-14">
                {user?.email}
              </p>
              <div className="w-full space-y-4">
                {profileLinks &&
                  profileLinks.length > 0 &&
                  profileLinks.map((link, index) => {
                    const platform = platforms.find(
                      (p) => p.value === link.platformName
                    );
                    if (!platform) return null;

                    const isFrontendMentor =
                      platform.value === "Frontend Mentor";
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className={`w-full justify-between ${
                          isFrontendMentor ? "text-gray-dark" : "text-white"
                        } hover:text-primary-default hover:border-primary-default`}
                        style={{ backgroundColor: platform.color }}
                        onClick={() => window.open(link.url, "_blank")}
                      >
                        {platform.logo}
                        <span
                          className={
                            isFrontendMentor ? "text-gray-dark" : "text-white"
                          }
                        >
                          {platform.label}
                        </span>
                        <svg
                          className={`w-4 h-4 ${
                            isFrontendMentor ? "text-gray-dark" : "text-white"
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                    );
                  })}
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
