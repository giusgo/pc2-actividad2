"use client";

import { Button } from "@/components/ui/button"
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
import {
    Form,
    FormControl,
    FormDescription,
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

import { useState } from "react";

const formSchema = z.object({
    username: z.string()
        .min(2, {
            message: "El usuario debe ser de mínimo 2 caracteres."
        })
        .max(20, {
            message: "El usuario debe ser de máximo 20 caracteres."
        })
})

interface ReadProps {
    btnsDisabled: boolean,
    setBtnsDisabled: (arg0: boolean) => void;
}

export function Read({ btnsDisabled, setBtnsDisabled }: ReadProps) {
    const { toast } = useToast();
    const [inputValue, setInputValue] = useState<string>('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setBtnsDisabled(true);

        const query = {
            operation: "read",
            username: values.username
        }

        try {
            const response = await fetch("/api/student", {
                method: "POST",
                body: JSON.stringify(query),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                toast({
                    description: "Registro obtenido.",
                    duration: 3000,
                });

                const grade = await response.json();
                setInputValue(grade);

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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Leer el registro de nota final para un estudiante</CardTitle>
                <CardDescription>Digite el usuario. Luego de clic en Leer.</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="flex flex-row gap-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="w-[70%]">
                                    <FormLabel>ID estudiante</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid items-center gap-3 w-[30%]">
                            <Label htmlFor="email">Nota</Label>
                            <Input type="text" readOnly value={inputValue}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {btnsDisabled ?
                            <Button type="submit" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Procesando
                            </Button>
                            :
                            <Button type="submit">Leer</Button>
                        }
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}