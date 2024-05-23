"use client";

import Logo from "@/../public/logo.png";
import DarkLogo from "@/../public/logo_dark.png";
import Image from "next/image";
import { ModeToggle } from "@/components/ownui/mode-toggle";

export default function Navbar() {

    return <div className="w-full h-14 bg-white dark:bg-black border-b-4 border-gray-400">
        <div className="mx-auto max-w-screen-xl flex items-center h-full justify-between">
            <Image src={Logo} alt="logo" className="h-full w-auto dark:hidden py-1"></Image>
            <Image src={DarkLogo} alt="logo" className="h-full w-auto light:hidden"></Image>
            <ModeToggle />
        </div>
    </div>;
}