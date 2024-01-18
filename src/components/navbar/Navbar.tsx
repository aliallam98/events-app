"use client";
import NavbarScroll from "@/hooks/NavbarScroll";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "../Logo";
import NavLinks from "./NavLinks";
import UserButtons from "./UserButtons";


const Navbar = () => {
  const isScroll = NavbarScroll();
  
  return (
    <header
      className={cn(
        "fixed top-0 w-full p-5   backdrop-blur-sm z-50",
        isScroll && "shadow-sm border-b "
      )}
    >
      <nav className="flex items-center justify-between">
        <Logo />
        <NavLinks />
        <UserButtons/>
      </nav>
    </header>
  );
};

export default Navbar;
