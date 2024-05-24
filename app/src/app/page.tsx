"use client";

import Background from "@/components/Home/background";
import Navbar from "@/components/General/Navbar";
import TeacherForm from "@/components/Home/form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    redirect("/reportes");
  }
  
  return (
    <main>
      <Background />
      <Navbar />
      <TeacherForm />
    </main>
  );
}
