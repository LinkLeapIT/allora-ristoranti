"use client"
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/app/contexts/AuthContext";
import alloraLogo from "@/../public/assets/images/logo.png";
import { MdMenuBook } from "react-icons/md";
import {  BsBookmarks } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Products, StateProps } from "../../../../type";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import AuthButtons from "@/components/auth-button";

const Navbar = () => {
    const { currentUser } = useAuthContext();
    const { productData, orderData } = useSelector((state: StateProps) => state.shopping);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = useMemo(
        () => [
          { href: "/", label: "Home" },
          { href: "/chi-siamo", label: "Chi Siamo" },
          { href: "/servizi", label: "Servizi" },
          { href: "/contatti", label: "Contatti" },
          { href: "/chiama-ora", label: "Chiama-Ora!" },
        ],
        []
    );

    const calculateTotalPrice = (product: Products) => {
        let totalPrice = 0;
        const selectedSize = product.sizes.find(size => size.size === product.options.size);
        if (selectedSize) {
            totalPrice += selectedSize.price;
        }
        product.options.extraIngredients.forEach((ingredient: string) => {
            const extra = product.extraIngredients.find(item => item.ingredient === ingredient);
            if (extra) {
                totalPrice += extra.price;
            }
        });
        return totalPrice * product.quantity;
    };

    const [totalAmt, setTotalAmt] = useState(0);

    useEffect(() => {
        let amt = 0;
        productData.forEach((product: Products) => {
            amt += calculateTotalPrice(product);
        });
        setTotalAmt(amt);
    }, [productData]);

    return (
        <header className="sticky inset-x-0 top-0 z-50 w-full bg-lightBg">
            <div className="max-w-[1400px] mx-auto">
                <nav className="flex items-center justify-between p-4 uppercase" aria-label="Global">
                    <div className="flex items-center flex-shrink-0">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <Image
                        src={alloraLogo}
                        alt="Logo"
                        width={96}
                        height={85}
                        className="w-[48px] md:w-[72px] xl:w-[96px] h-auto"
                        priority
                        />
                    </Link>
                    </div>

                    <motion.div
                    className="hidden lg:flex flex-grow justify-center lg:gap-x-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    >
                    {navItems.map(({ href, label }) => (
                        <Link
                        key={href}
                        href={href}
                        className="tracking-widest leading-6 text-text text-[12px] xl:text-[16px] font-extrabold hover:scale-110 hover:text-lightText transition-transform bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent"
                        >
                        {label}
                        </Link>
                    ))}
                    </motion.div>

                    <div className="flex flex-1 justify-end items-center gap-4">
                    <div className="relative">
                        {/** orderData start here */}
                        {
                            orderData?.length > 0 && currentUser && (
                                <Link className="text-2xl" href={'/order'}>
                                    <BsBookmarks className="text-2xl" />
                                    <p className="">Orders</p>
                                </Link>
                            )
                        }
                    </div>
                    {/** Services start here */}
                    <Link href="/menu">
                        <MdMenuBook className="text-3xl text-lightText hover:text-hoverBg duration-300 hover:scale-110 transition-transform"/>
                    </Link>
                    {/** Services End here */}

                    {/** Cart start here */}
                    <Link href={"/cart"}>
                        <div className="flex flex-col justify-center items-center gap-2 h-12 bg-transparent relative ">
                            <RiShoppingCartLine className="text-3xl text-lightText hover:text-hoverBg duration-300 hover:scale-110 transition-transform"/>
                            <p className="text-[10px] font-extrabold text-lightText -mt-2">${totalAmt.toFixed(2)}</p>
                            <span className="absolute w-4 h-4 bg-lightText text-lightBg top-0 right-0 rounded-full flex justify-center items-center text-xs">{productData ? productData.length : 0}</span>
                        </div>
                    </Link>
                    {/** Cart End here */}
                    <AuthButtons />
                    </div>

                    <button
                    type="button"
                    className="inline-flex items-center text-lightText hover:text-hoverBg duration-300 justify-center p-2 lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                    <svg
                        className={`h-9 w-9 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18m-18 6h18" />
                    </svg>
                    </button>
                </nav>

                <AnimatePresence>
                    {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-gradient-to-tr from-darkBg via-lightBg to-darkBg p-6 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex flex-col items-center justify-center">
                        <button
                            className="self-end mb-4 text-2xl text-darkText hover:text-lightText"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ✖
                        </button>
                        {navItems.map(({ href, label }) => (
                            <Link
                            key={href}
                            onClick={() => setMobileMenuOpen(false)}
                            href={href}
                            className="tracking-widest leading-6 bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent text-3xl mb-9 hover:scale-110 hover:text-lightText transition-transform font-extrabold p-1"
                            >
                            {label}
                            </Link>
                        ))}
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
