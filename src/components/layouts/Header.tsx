import React from "react";
import { siteConfig } from "@/config/site";
import MobileNav from "./MobileNav";
import MainNav from "@/components/layouts/MainNav";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <header className="w-full border-b">
      <nav className="container flex items-center h-16 mx-auto">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav items={siteConfig.mainNav} />
        <div className="flex-1 flex justify-end items-center space-x-4 mr-8 lg:mr-0">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
