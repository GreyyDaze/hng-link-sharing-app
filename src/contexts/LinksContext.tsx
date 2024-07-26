"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface LinkItem {
  userLinks: any;
  platformName: any;
  platform: string;
  link: string;
}

interface LinksContextType {
  links: LinkItem[];
  setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>>;
  profilePic: string | null;
  setProfilePic: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export const LinksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const moveLink = (dragIndex: number, hoverIndex: number) => {
    const reorderedLinks = [...links];
    const [movedItem] = reorderedLinks.splice(dragIndex, 1);
    reorderedLinks.splice(hoverIndex, 0, movedItem);
    setLinks(reorderedLinks);
  };

  return (
    <LinksContext.Provider
      value={{
        links,
        setLinks,
        profilePic,
        setProfilePic,
        name,
        setName,
        email,
        setEmail,
        moveLink,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => {
  const context = useContext(LinksContext);
  if (context === undefined) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
};
