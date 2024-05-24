"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Login from "./Login"
import Register from "./Register"
import { useState } from "react"

export default function TeacherForm() {
    const [btnsDisabled, setBtnsDisabled] = useState<boolean>(false);

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Ingreso</TabsTrigger>
                    <TabsTrigger value="regiser">Registro</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Login />
                </TabsContent>
                <TabsContent value="regiser">
                    <Register btnsDisabled={btnsDisabled} setBtnsDisabled={setBtnsDisabled} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
