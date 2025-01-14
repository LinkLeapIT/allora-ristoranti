//
//components/auth-button.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { addUser, deleteUser } from "@/redux/shoppingSlice";
import { AiOutlineUser } from "react-icons/ai";
import { RiHeart2Fill } from "react-icons/ri";
import LoadingSpinner from "./loading-spinner";

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


export default function AuthButtons() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const { currentUser } = useAuthContext();

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

    const username = useMemo(() => {
        return currentUser?.displayName || "Profile";
    }, [currentUser]);
    
    const avatar = useMemo(() => {
        return !!currentUser ? (
            <Image
            src={currentUser?.photoURL}
            alt={currentUser?.displayName}
            width="40"
            height="40"
            className="rounded-full"
            />
        ) : (
                <AiOutlineUser 
                className="text-lg"
                aria-hidden="true"
            />
        );
    }, [currentUser]);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
        {status === "loading" ? (
            <div className="flex items-center justify-center p-2">
                <Loader2 className="animate-spin" />
            </div>
        ) : currentUser ? (
            <div className="flex items-center gap-4">
                {/** I Liked start here */}
                <div className="relative">
                    <RiHeart2Fill className="text-3xl text-lightText hover:text-hoverBg duration-300 hover:scale-110 transition-transform cursor-pointer"/>
                </div>
                {/** I Liked End here */}

                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                    <Avatar>
                        {currentUser ? (
                            avatar
                        ) : (
                        <AvatarFallback>
                         {username}
                        </AvatarFallback>
                        )}
                    </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background text-text">
                    <DropdownMenuLabel>
                        <div>{currentUser?.displayName  || "User"}</div>
                        <div className="font-normal text-xs text-text">
                        {currentUser?.email}
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/user/premium/profile" onClick={closeMobileMenu}>
                        Profile
                        </Link>
                    </DropdownMenuItem>
       
                    <DropdownMenuItem asChild>
                    <Link href="/admin" onClick={closeMobileMenu}>
                        Admin Dashboard
                    </Link>
                    </DropdownMenuItem>
          
                    <DropdownMenuItem asChild>
                    <Link href="/user/premium" onClick={closeMobileMenu}>
                        User Dashboard
                    </Link>
                    </DropdownMenuItem>
             
                    <DropdownMenuItem>
                        {isLoggingOut ? (
                        <>
                        <LoadingSpinner/>
                        <span>Logging out...</span>
                        </>
                        
                        ) : (
                        <LogOut />
                        )}
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ) : (
            <div className="flex gap-4 items-center">
                <LogIn />
            </div>
        )}
        </>
    );
}
