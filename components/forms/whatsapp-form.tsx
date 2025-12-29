"use client";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useSession} from "next-auth/react";

export const whatsappSchema = z.object({
    phone: z.string().regex(/^569\d{8}$/, "El teléfono debe tener el formato 569XXXXXXXX"),
    message: z.string().optional(),
});

type WhatsAppFormProps = {
    onSubmit: (data: z.infer<typeof whatsappSchema>) => void;
};

export function WhatsAppForm({onSubmit}: WhatsAppFormProps) {
    const {data: session, status} = useSession();

    const form = useForm<z.infer<typeof whatsappSchema>>({
        resolver: zodResolver(whatsappSchema),
        defaultValues: {phone: "", message: ""},
    });

    const handleSubmit = async (data: z.infer<typeof whatsappSchema>) => {
        toast.success("QR whatsapp generado exitosamente");
        onSubmit(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Número de Teléfono</FormLabel>
                            <FormControl>
                                <Input placeholder="569XXXXXXXX" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Mensaje (Opcional)</FormLabel>
                            <FormControl>
                                <Input placeholder="¡Hola!" {...field} />
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