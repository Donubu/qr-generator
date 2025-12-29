"use client";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {toast} from "sonner";

export const urlSchema = z.object({
    name: z.string(),
    url: z.string().url({message: "Por favor ingresa una URL válida"}),
    enableTracking: z.boolean().default(false),
});

type URLFormProps = {
    onSubmit: (data: { url: string }) => void;
    userSession: any;
};

export function URLForm({onSubmit, userSession}: URLFormProps ) {

    const form = useForm<z.infer<typeof urlSchema>>({
        resolver: zodResolver(urlSchema),
        defaultValues: {
            name: "",
            url: "",
            enableTracking: false
        },
    });

    const handleSubmit = async (data: z.infer<typeof urlSchema>) => {
        try {
            if (data.enableTracking) {
                const response = await fetch('/api/qr-tracking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: data.name,
                        original_url: data.url,
                        user_email: userSession.userSession.email,
                        qr_type: 'url'
                    })
                });

                if (!response.ok) throw new Error('Error al crear tracking');

                const tracking = await response.json();

                const redirectUrl = new URL("/redirect", window.location.origin);
                redirectUrl.searchParams.set("id", tracking.id);
                redirectUrl.searchParams.set("url", encodeURIComponent(data.url));
                onSubmit({url: redirectUrl.toString()});
                toast.success("URL con seguimiento generada exitosamente");
            } else {
                onSubmit({url: data.url});
            }
        } catch (error) {
            console.error('Error al crear seguimiento:', error);
            toast.error("Error al generar URL con seguimiento");
            onSubmit({url: data.url});
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre para identificar el qr" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://ejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="enableTracking"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Seguimiento de Escaneos
                                </FormLabel>
                                <FormMessage/>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Generar Código QR</Button>
            </form>
        </Form>
    );
}