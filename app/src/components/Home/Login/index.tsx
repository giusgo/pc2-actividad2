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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
    username: z.string()
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

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Print
        console.log(values)
    }

    return <Card>
        <CardHeader>
            <CardTitle>Ingreso</CardTitle>
            <CardDescription>
                Ingresa tus credenciales de profesor en los siguientes campos.
            </CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-2">
                    <FormField
                        control={form.control}
                        name="username"
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
                    <Button type="submit">Enviar</Button>
                </CardFooter>
            </form>
        </Form>
    </Card>
}