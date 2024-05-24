"use client";

import Background from "@/components/Home/background";
import Navbar from "@/components/General/Navbar";
import Panel from "@/components/Reportes";

export default function Page() {
    return (
        <main>
            <Background />
            <Navbar />
            <Panel />
        </main>
    );
}