"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientWrapper;
