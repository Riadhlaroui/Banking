"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Footer from "./Footer";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { logoutAccount } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import Particles from "./magicui/particles";
import PlaidLink from "./PlaidLink";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/sign-in");
  };

  return (
    <section className="w-full">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            height={30}
            width={30}
            alt="hamburger"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-Navbar">
          <Link
            href="/"
            className="cursor-pointer items-center gap-1 px-4 flex"
          >
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Atlas Logo"
            />
            <h1 className="text-26 font-poppins font-bold text-black-1">
              Atlas
            </h1>
          </Link>
          <div className="mobilenav-sheet fixed">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-bank-gradient": isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] inverrt-1": isActive,
                          })}
                        />
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                <div className="flex flex-row">
                  <PlaidLink user={user} />
                  <p className="text-[16px] font-semibold text-black-2 mt-2">Connect Bank</p>
                </div>
              </nav>
            </SheetClose>
            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
