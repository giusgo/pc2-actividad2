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

const formSchema = z.object({
    username: z.string()
        .min(2, {
            message: "El usuario debe ser de mínimo 2 caracteres."
        })
        .max(20, {
            message: "El usuario debe ser de máximo 20 caracteres."
        }),
    grade: z.coerce.number({ message: "Ingrese una nota válida." })
        .min(0, {
            message: "La nota mínima es 0."
        })
        .max(5.0, {
            message: "La nota máxima es 5."
        })
})

interface CreateProps {
    btnsDisabled: boolean,
    setBtnsDisabled: (arg0: boolean) => void;
}

export function Create({ btnsDisabled, setBtnsDisabled }: CreateProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            grade: 0
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setBtnsDisabled(true);

        const query = {
            operation: "create",
            username: values.username,
            grade: values.grade
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
                    description: "Registro creado.",
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Crear el registro de nota final para un estudiante</CardTitle>
                <CardDescription>Digite el usuario y la nota correspondiente. Luego de clic en Guardar.</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="w-[600px] flex flex-row gap-4">
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
                        <FormField
                            control={form.control}
                            name="grade"
                            render={({ field }) => (
                                <FormItem className="w-[30%]">
                                    <FormLabel>Nota</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
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
                                Procesando
                            </Button>
                            :
                            <Button type="submit">Guardar</Button>
                        }
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}