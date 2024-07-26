"use client"; // Ensure this component is rendered on the client side

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "@/components/common/Navbar";
import { LinksProvider } from "@/contexts/LinksContext";
import PhoneMockup from "@/components/common/PhoneMockup";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LinksProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen bg-gray-lighter">
          <Navbar /> {/* Ensure Navbar is correctly implemented */}
          <main className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Left side - Phone preview */}
              <div className="lg:order-1 order-2 lg:w-[45%] w-full bg-white flex items-center flex-shrink-0 p-2 sm:p-4 md:p-6 rounded-3xl">
                <PhoneMockup />{" "}
              </div>

              {/* Right side - Dynamic content */}
              <div className="lg:order-2 order-1 flex-grow bg-white p-6 md:p-10 rounded-3xl relative md:overflow-y-auto md:max-h-[100vh]">
                {children} {/* Render dynamic content */}
              </div>
            </div>
          </main>
          <Toaster /> {/* Toast notifications */}
        </div>
      </DndProvider>
    </LinksProvider>
  );
}
