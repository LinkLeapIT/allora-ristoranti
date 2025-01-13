"use client";

import React, { useEffect, useContext } from "react";
import { useAuthContext } from "./contexts/AuthContext";
import { ProductContext } from "./contexts/ProductContext";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const productContext = useContext(ProductContext);
  const authContext = useAuthContext();

  if (!productContext) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  const { state, read } = productContext;
  const { authenticate } = authContext;


  useEffect(() => {
    read();
    authenticate();
  }, [read, authenticate]);

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
