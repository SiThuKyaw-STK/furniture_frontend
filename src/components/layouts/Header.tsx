import React from "react";
import { siteConfig } from "@/config/site";
import MobileNav from "./MobileNav";
import MainNav from "@/components/layouts/MainNav";
import { ModeToggle } from "../mode-toggle";
import AuthDropDown from "./AuthDropDown";
import { User } from "@/data/user";

const Header = () => {
  return (
    <header className="w-full border-b sticky top-0 z-40 bg-background">
      <nav className="container flex items-center h-16 mx-auto px-2 lg:px-0">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav items={siteConfig.mainNav} />
        <div className="flex-1 flex justify-end items-center space-x-4 ">
          <ModeToggle />
          <AuthDropDown user={User}/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
