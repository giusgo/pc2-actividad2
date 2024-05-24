"use client";

import Logo from "@/../public/logo.png";
import DarkLogo from "@/../public/logo_dark.png";
import Image from "next/image";
import { ModeToggle } from "@/components/ownui/mode-toggle";
import { useSession } from "next-auth/react";
import { LogOutBtn } from "./LogOut";

export default function Navbar() {
    const { data: session } = useSession();

    return <div className="w-full h-14 bg-white dark:bg-black border-b-4 border-gray-400">
        <div className="mx-auto max-w-screen-xl flex items-center h-full justify-between">
            <Image src={Logo} alt="logo" className="h-full w-auto py-1 dark:hidden"></Image>
            <Image src={DarkLogo} alt="logo" className="h-full w-auto py-1 light:hidden"></Image>
            <div className="right flex items-center gap-4">
                {session ? <LogOutBtn name={session.user?.name!} /> : <></>}
                <ModeToggle />
            </div>
        </div>
    </div>;
}