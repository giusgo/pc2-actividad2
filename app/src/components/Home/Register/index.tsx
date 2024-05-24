"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const formSchema = z.object({
    userName: z.string()
        .min(2, {
            message: "El usuario debe ser de mínimo 2 caracteres.",
        })
        .max(20, {
            message: "El usuario debe ser de máximo 20 caracteres."
        }),
    password: z.string()
        .min(8, {
            message: "La contraseña debe ser de mínimo 8 caracteres.",
        })
        .max(12, {
            message: "La contraseña debe ser de máximo 12 caracteres."
        })
})

interface RegisterProps {
    btnsDisabled: boolean;
    setBtnsDisabled: (arg0: boolean) => void;
}

export default function Register({ btnsDisabled, setBtnsDisabled }: RegisterProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            password: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setBtnsDisabled(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                toast({
                    title: "Registro exitoso.",
                    description: "Puede ingresar con su nuevo usuario ahora.",
                    duration: 3000,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Algo falló.",
                    description: "Hubo un problema con su solicitud.",
                });
            }
        } catch (error) {
            console.error("Ocurrio un error:", error);
        }
        setBtnsDisabled(false);
    }

    return <Card>
        <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>
                Vínculate como profesor rellenando los siguientes campos.
            </CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-2">
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usuario</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    {btnsDisabled ?
                        <Button type="submit" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando
                        </Button>
                        :
                        <Button type="submit">Enviar</Button>
                    }
                </CardFooter>
            </form>
        </Form>
    </Card>
}