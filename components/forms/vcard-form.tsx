"use client";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useSession} from "next-auth/react";

export const vcardSchema = z.object({
    firstName: z.string().min(1, "El nombre es requerido"),
    lastName: z.string().min(1, "El apellido es requerido"),
    email: z.string().email("Dirección de correo inválida"),
    phone: z.string().min(1, "El teléfono es requerido"),
    organization: z.string().optional(),
});

type VCardFormProps = {
    onSubmit: (data: z.infer<typeof vcardSchema>) => void;
};

export function VCardForm({onSubmit}: VCardFormProps) {
    const {data: session, status} = useSession();

    const form = useForm<z.infer<typeof vcardSchema>>({
        resolver: zodResolver(vcardSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            organization: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof vcardSchema>) => {
        toast.success("Tarjeta de contacto generada exitosamente");
        onSubmit(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Juan" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                                <Input placeholder="Pérez" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Correo</FormLabel>
                            <FormControl>
                                <Input placeholder="juan@ejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                                <Input placeholder="+56912345678" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="organization"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Organización (Opcional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre de la empresa" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Generar Código QR</Button>
            </form>
        </Form>
    );
}