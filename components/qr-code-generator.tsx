"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { URLForm } from "./forms/url-form";
import { VCardForm } from "./forms/vcard-form";
import { WhatsAppForm } from "./forms/whatsapp-form";
import { QRCodeDisplay } from "./qr-code-display";
import { ColorSelector } from "./color-selector";
import type { z } from "zod";
import type { vcardSchema } from "./forms/vcard-form";
import type { whatsappSchema } from "./forms/whatsapp-form";

type QRType = "url" | "vcard" | "whatsapp";

export function QRCodeGenerator() {
  const [qrType, setQRType] = useState<QRType>("url");
  const [qrValue, setQRValue] = useState("");
  const [centerImage, setCenterImage] = useState<string | null>(null);
  const [qrColor, setQrColor] = useState("#000000");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCenterImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVCardString = (data: z.infer<typeof vcardSchema>) => {
    return `BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName}
FN:${data.firstName} ${data.lastName}
ORG:${data.organization || ""}
EMAIL:${data.email}
TEL:${data.phone}
END:VCARD`;
  };

  const onUrlSubmit = (data: { url: string }) => {
    setQRValue(data.url);
  };

  const onVCardSubmit = (data: z.infer<typeof vcardSchema>) => {
    setQRValue(generateVCardString(data));
  };

  const onWhatsappSubmit = (data: z.infer<typeof whatsappSchema>) => {
    const message = encodeURIComponent(data.message || "");
    setQRValue(`https://wa.me/${data.phone}?text=${message}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <Tabs defaultValue="url" onValueChange={(value) => setQRType(value as QRType)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="vcard">Contacto</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          </TabsList>

          <TabsContent value="url">
            <URLForm onSubmit={onUrlSubmit} />
          </TabsContent>

          <TabsContent value="vcard">
            <VCardForm onSubmit={onVCardSubmit} />
          </TabsContent>

          <TabsContent value="whatsapp">
            <WhatsAppForm onSubmit={onWhatsappSubmit} />
          </TabsContent>
        </Tabs>

        <div className="space-y-6">
          <ColorSelector selectedColor={qrColor} onColorChange={setQrColor} />

          <Card>
            <CardContent className="pt-6">
              <Label className="mb-4 block">Imagen Central</Label>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Imagen
                  </Button>
                  {centerImage && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        setCenterImage(null);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="centerImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {qrValue && (
        <div className="bg-muted/50 p-8 rounded-lg">
          <QRCodeDisplay 
            value={qrValue} 
            centerImage={centerImage} 
            qrColor={qrColor}
          />
        </div>
      )}
    </div>
  );
}