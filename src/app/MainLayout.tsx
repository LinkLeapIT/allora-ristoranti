"use client";

import React from "react";
import { useAuthContext } from "./contexts/AuthContext";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {

  const authContext = useAuthContext();

  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  const { authenticate } = authContext;
  
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
