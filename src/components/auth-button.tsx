"use client";

import React, { useState, useEffect, Suspense } from "react";
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
import { useDispatch } from "react-redux";
import { useAuth } from "@/app/context/auth";
import { addUser, deleteUser } from "@/redux/shoppingSlice";
import { AiOutlineUser } from "react-icons/ai";
import { RiHeart2Fill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import dynamic from "next/dynamic";
import LoadingSpinner from "./loading-spinner";

const LogIn = () => (
  <Link href="/login" className="text-3xl text-lightText hover:scale-110 transition-transform hover:text-hoverBg">
    <CiLogin />
  </Link>
);

const LogOut = ({ logout }: { logout: () => void }) => (
  <button type="button" onClick={logout}>
    Logout
  </button>
);

export default function AuthButtons() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = useAuth();
  const currentUser = auth?.currentUser;

  useEffect(() => {
    if (currentUser === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
      if (currentUser) {
        dispatch(
          addUser({
            name: currentUser?.displayName || "",
            email: currentUser?.email ?? "",
            image: currentUser?.photoURL || "/assets/images/avatar.png",
          })
        );
      } else {
        dispatch(deleteUser());
      }
    }
  }, [currentUser, dispatch]);

  const username = currentUser?.displayName || "Profile";

  const avatar = currentUser ? (
    <div className="w-10 h-10 flex flex-col items-center justify-center">
      <Image
        src={currentUser?.photoURL || "/assets/images/avatar.png"}
        alt={currentUser?.displayName || "Avatar"}
        width="36"
        height="36"
        className="rounded-full bg-link w-[36px] h-[36px]"
        priority
      />
    </div>
  ) : (
    <AiOutlineUser className="text-lg" aria-hidden="true" />
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2">
        <LoadingSpinner />
      </div>
    );
  }

  return currentUser ? (
    <div className="flex items-center gap-4">
      <Link href="/my-favourites" className="relative">
        <RiHeart2Fill className="text-3xl text-lightText hover:text-hoverBg duration-300 hover:scale-110 transition-transform cursor-pointer" />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {avatar || <AvatarFallback>{username}</AvatarFallback>}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background text-text">
          <DropdownMenuLabel>
            <div>{currentUser?.displayName || "User"}</div>
            <div className="font-normal text-xs text-text">
              {currentUser?.email}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {auth.customClaims?.admin ? (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link href="/account">
                Account
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <LogOut logout={auth?.logout} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex gap-4 items-center">
      <LogIn />
    </div>
  );
}
