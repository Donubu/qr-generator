"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import QRCode from "qrcode";

type QRCodeData = {
  id: string;
  created_at: string;
  original_url: string;
  scans: number;
  name: string;
  user_email: string;
};

export function QRCodesList(userSession) {
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchQRCodes() {
      try {
        const response = await fetch('/api/qr-tracking');
        if (!response.ok) throw new Error('Error fetching QR codes');

        const data = await response.json();
        setQrCodes(data || []);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
        toast.error("Error al cargar los códigos QR");
      } finally {
        setLoading(false);
      }
    }

    fetchQRCodes();
  }, [userSession]);

  const downloadQR = useCallback(async (qrCode: QRCodeData) => {
    try {
      const redirectUrl = new URL("/redirect", window.location.origin);
      redirectUrl.searchParams.set("id", qrCode.id);
      redirectUrl.searchParams.set("url", encodeURIComponent(qrCode.original_url));

      // Generate QR code as data URL
      const qrDataUrl = await QRCode.toDataURL(redirectUrl.toString(), {
        width: 1200,
        margin: 1,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });

      // Create download link
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = `qr-code-${format(
        new Date(qrCode.created_at),
        "yyyy-MM-dd-HH-mm"
      )}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Código QR descargado exitosamente");
    } catch (error) {
      console.error("Error downloading QR:", error);
      toast.error("Error al descargar el código QR");
    }
  }, []);

  const previewQR = useCallback((qrCode: QRCodeData) => {
    const redirectUrl = new URL("/redirect", window.location.origin);
    redirectUrl.searchParams.set("id", qrCode.id);
    redirectUrl.searchParams.set("url", encodeURIComponent(qrCode.original_url));
    window.open(redirectUrl.toString(), "_blank", "noopener,noreferrer");
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (qrCodes.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No has generado ningún código QR todavía
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>URL/Contenido</TableHead>
            <TableHead className="text-right">Escaneos</TableHead>
            <TableHead className="text-center">Creador</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qrCodes.map((qrCode) => (
            <TableRow key={qrCode.id}>
              <TableCell>
                {format(new Date(qrCode.created_at), "PPp", { locale: es })}
              </TableCell>
              <TableCell className="capitalize">{qrCode.name}</TableCell>
              <TableCell className="max-w-xs truncate">
                {qrCode.original_url}
              </TableCell>
              <TableCell className="text-right">{qrCode.scans}</TableCell>
              <TableCell className="text-center">{qrCode.user_email}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => previewQR(qrCode)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => downloadQR(qrCode)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}