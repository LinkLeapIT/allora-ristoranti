"use client"
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { alloraLogo } from "@/../public/assets/images/index";
import { GoHeart } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { MdMenuBook } from "react-icons/md";
import { BsCart2, BsBookmarks } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Products, StateProps } from "../../../../type";
import Link from "next/link";
import { addUser, deleteUser } from "@/redux/shoppingSlice";
import { div } from "framer-motion/client";

const LogIn = () => {
    const { login, currentUser } = useAuthContext();
    return (
        !currentUser && (
        <button type="button" className="btn btn-warning" onClick={login}>
            Login
        </button>
        )
    );
};
  
const LogOut = () => {
    const { logout, currentUser } = useAuthContext();
    return (
    !!currentUser && (
        <button type="button" className="btn btn-danger" onClick={logout}>
        Logout
        </button>
    )
    );
};

const Navbar = () => {
    const dispatch = useDispatch();
    const { currentUser } = useAuthContext();
    const { productData, orderData } = useSelector((state: StateProps) => state.shopping);
    useEffect(() => {
        if(currentUser) {
            dispatch(
                addUser({
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                    image: currentUser?.photoURL,
                })
            );
        }else {
            dispatch(deleteUser());
        }
    },[currentUser, dispatch]);

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

    const username = useMemo(() => {
        return currentUser?.displayName || "Profile";
    }, [currentUser]);
    
    const avatar = useMemo(() => {
        return !!currentUser ? (
            <Image
            src={currentUser?.photoURL}
            alt={currentUser?.displayName}
            width="34"
            height="34"
            className="rounded-full"
            />
        ) : (
                <AiOutlineUser 
                className="text-lg"
                aria-hidden="true"
            />
        );
    }, [currentUser]);

    return (
        <div className="w-full bg-yellow text-orange sticky top-0 z-50">
            <div className="container mx-auto w-ful">
                <div className="w-full h-full">
                    <div className="max-w-container mx-auto h-20 px-1 flex items-center justify-between gap-2">
                        {/** Logo start here */}
                        <div className="navBarHover">
                            <Image className="w-44" src={alloraLogo} alt="logo"/>
                        </div>
                        {/** Logo End here */}

                        <div className="flex">
                            {/** orderData start here */}
                            {
                                orderData?.length > 0 && currentUser && (
                                    <Link className="text-2xl" href={'/order'}>
                                        <BsBookmarks className="text-2xl" />
                                        <p className="">Orders</p>
                                    </Link>
                                )
                            }

                            {/** Account start here */}
                            <div className="navBarHover">
                                {avatar}
                                <div>
                                <div className="flex justify-center">
                                    <LogIn />
                                    <LogOut />
                                </div>
                                    <h2 className="text-base font-semibold -mt-1">{username}</h2>
                                </div>

                            </div>
                            {/** Account End here */}

                            {/** Services start here */}
                            <Link href="/menu" className="navBarHover">
                                <MdMenuBook className="text-2xl"/>
                            </Link>
                            {/** Services End here */}

                            {/** I Liked start here */}
                            <div className="navBarHover">
                                <GoHeart className="text-2xl"/>
                            </div>
                            {/** I Liked End here */}

                            {/** Cart start here */}
                            <Link href={"/cart"}>
                                <div className="flex flex-col justify-center items-center gap-2 h-12 pr-2 rounded-full bg-transparent hover:bg-hoverBg duration-300 relative">
                                    <BsCart2 className="text-2xl"/>
                                    <p className="text-[10px] -mt-2">${totalAmt.toFixed(2)}</p>
                                    <span className="absolute w-4 h-4 bg-orange text-black top-0 right-0 rounded-full flex justify-center items-center text-xs">{productData ? productData.length : 0}</span>
                                </div>
                            </Link>
                            {/** Cart End here */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
