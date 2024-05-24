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
        })
})

interface DeleteProps {
    btnsDisabled: boolean,
    setBtnsDisabled: (arg0: boolean) => void;
}

export function Delete({ btnsDisabled, setBtnsDisabled }: DeleteProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setBtnsDisabled(true);

        const query = {
            operation: "delete",
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
                    description: "Registro eliminado.",
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
                <CardTitle>Eliminar el registro de nota final para un estudiante</CardTitle>
                <CardDescription>Digite el usuario. Luego de clic en Eliminar.</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="flex flex-row gap-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>ID estudiante</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                            <Button type="submit">Eliminar</Button>
                        }
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}