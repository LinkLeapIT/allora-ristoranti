"use client";

import React from "react";
import { useAuth } from "./context/auth";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import LoadingSpinner from "@/components/loading-spinner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const authContext = useAuth();

  if (!authContext) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </>
  );
}
