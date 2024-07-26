"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import platforms from "@/utils/logos";
import { LinkItem, useLinks } from "@/contexts/LinksContext";
import { useSession } from "next-auth/react"; 
import Image from "next/image";

const Links: React.FC = () => {
  const { links, setLinks } = useLinks();
  const { data: session, status } = useSession();
  const router = useRouter();

  const userId = session?.user?.id;
  const token = session?.accessToken; 

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm({
    defaultValues: { links },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  // console.log(session);

  useEffect(() => {
    if (status === "loading") return; 
    if (!session) {
      toast.error("You are not authenticated. Redirecting to home...");
      router.push("/"); 
      return;
    }

    const fetchProfileLinks = async () => {
      try {
        const response = await fetch(`/api/links/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch links");
        }

        const result = await response.json();
        const newLinks: LinkItem[] = result.platformLinks.map((link: any) => ({
          platform: link.platformName,
          link: link.userLinks[0],
        }));

        const existingLinks = links.map((link) => ({
          platform: link.platform,
          link: link.link,
        }));

        const existingLinksSet = new Set(
          existingLinks.map((link) => `${link.platform}-${link.link}`)
        );

        const filteredLinks = newLinks.filter(
          (newLink: LinkItem) =>
            !existingLinksSet.has(`${newLink.platform}-${newLink.link}`)
        );

      
        setLinks(() => [...filteredLinks]);
        reset({ links: [...links, ...filteredLinks] });
      } catch (error) {
        toast.error("Error fetching links. Please try again.");
        console.error(error);
      }
    };

    fetchProfileLinks();
  }, [session, userId, token, setLinks]);

  const handleSelectChange = (index: number, value: string) => {
    setValue(`links.${index}.platform`, value);
    const updatedLinks = [...getValues("links")];
    updatedLinks[index].platform = value;
    setLinks(updatedLinks);
  };

  const handleLinkChange = (index: number, value: string) => {
    setValue(`links.${index}.link`, value);
    const updatedLinks = [...getValues("links")];
    updatedLinks[index].link = value;
    setLinks(updatedLinks);
  };

  const handleRemove = (index: number) => {
    remove(index);
    const updatedLinks = [...getValues("links")];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const onSubmit = async (data: any) => {
    try {
      console.log(data.links, "data");

      const platformLinks = data.links.map(
        (link: { platform: string; link: String[] }) => ({
          platformName: link.platform,
          userLinks: [link.link],
        })
      );

      const response = await fetch(`/api/links/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ platformLinks }),
      });

      if (!response.ok) {
        throw new Error("Failed to save links");
      }

      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      toast.error("Error saving links. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="font-bold text-xl sm:text-2xl leading-[150%] md:text-heading-m text-gray-dark mb-2">
        Customize your links
      </h1>
      <p className="text-body-s sm:text-body-m text-gray-default mb-10">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <Button
        variant="outline"
        className="w-full py-3 mb-6 text-primary-default border-primary-default hover:bg-primary-lighter hover:text-primary-default rounded-lg"
        onClick={() =>
          append([
            {
              platform: "",
              link: "",
              userLinks: undefined,
              platformName: undefined,
            },
          ])
        }
      >
        + Add new link
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.length > 0 ? (
          <>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-gray-lighter rounded-xl p-5 mb-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-gray-dark font-bold">
                    Link #{index + 1}
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-gray-default hover:text-gray-dark"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs mb-1 text-gray-dark">
                      Platform
                    </label>
                    <Controller
                      name={`links.${index}.platform`}
                      control={control}
                      rules={{ required: "Can't be empty" }}
                      render={({ field }) => (
                        <div className="relative btn">
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange(index, value)
                            }
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent bg-white ${
                                errors.links?.[index]?.platform
                                  ? "border-error"
                                  : "focus-within:border-primary-default focus-within:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)]"
                              }`}
                            >
                              <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              {platforms.map((platform) => (
                                <SelectItem
                                  key={platform.value}
                                  value={platform.value}
                                >
                                  <div className="flex items-center mr-2 logo">
                                    <div className="text-white">
                                      {platform.logo}
                                    </div>
                                    <span>{platform.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.links?.[index]?.platform && (
                            <p className="absolute right-8 bottom-3 text-error text-xs">
                              {errors.links[index]?.platform?.message as string}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1 text-gray-dark">
                      Link
                    </label>
                    <Controller
                      name={`links.${index}.link`}
                      control={control}
                      rules={{ required: "Can't be empty" }}
                      render={({ field }) => (
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="https://"
                            {...field}
                            className={`w-full h-[50px] focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent bg-white ${
                              errors.links?.[index]?.link
                                ? "border-error"
                                : "focus-within:border-primary-default focus-within:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]"
                            }`}
                            onChange={(e) =>
                              handleLinkChange(index, e.target.value)
                            }
                          />
                          {errors.links?.[index]?.link && (
                            <p className="absolute right-8 bottom-3 text-error text-xs">
                              {errors.links[index]?.link?.message as string}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="bg-gray-lighter rounded-xl p-4 sm:p-6 md:p-10 flex flex-col items-center mb-10">
            <Image
              src="/images/illustration-empty.svg"
              alt="Get Started Illustration"
              width={250}
              height={160}
              className="mb-10 w-[124px] h-[80px] md:w-[250px] md:h-[160px]"
            />
            <h2 className="font-bold text-xl sm:text-2xl leading-[150%] md:text-heading-m text-gray-dark mb-6">
              Let&rsquo;s get you started
            </h2>
            <p className="text-body-s sm:text-body-m text-gray-default text-center max-w-[488px]">
              Use the &ldquo;Add new link&rdquo; button to get started. Once you
              have more than one link, you can reorder and edit them. We&apos;re
              here to help you share your profiles with everyone!
            </p>
          </div>
        )}
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

export default Links;
