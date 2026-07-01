import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import type { MainNavItem } from "@/types";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

interface MainNavigationProps {
  items?: MainNavItem[];
}

const MobileNav = ({ items }: MainNavigationProps) => {
  return (
    <div className="flex lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-4">
            <Icons.menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pt-12 px-8">
          <SheetClose asChild>
            <Link to="/" className="flex items-center space-x-1">
              <Icons.logo className="size-4" aria-hidden="true" />
              <span className="inline-block font-bold">{siteConfig.name}</span>
            </Link>
          </SheetClose>

          <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="max-w-lg"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>{items?.[0]?.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-2">
                    {items?.[0]?.card?.map((item) => (
                      <SheetClose asChild key={item.title}>
                        <Link to={String(item.href)} className="text-foreground/70 no-underline">{item.title}</Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col space-y-2">
                {items?.[0]?.menu?.map((item) => (
                  <SheetClose asChild key={item.title}>
                    <Link to={String(item.href)} className="">{item.title}</Link>
                  </SheetClose>
                ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
