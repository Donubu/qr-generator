"use client";

import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

type QRCodeDisplayProps = {
  value: string;
  centerImage?: string | null;
  qrColor: string;
};

type Resolution = {
  label: string;
  size: number;
};

const RESOLUTIONS: Resolution[] = [
  { label: "Estándar (1200×1200)", size: 1200 },
  { label: "Alta (2000×2000)", size: 2000 },
];

export function QRCodeDisplay({ value, centerImage, qrColor }: QRCodeDisplayProps) {
  const [selectedResolution, setSelectedResolution] = useState<Resolution>(RESOLUTIONS[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = async () => {
    if (!value || isDownloading || !qrRef.current) return;
    setIsDownloading(true);

    try {
      const size = selectedResolution.size;
      
      const svgElement = qrRef.current.querySelector('svg');
      if (!svgElement) {
        throw new Error('QR code SVG no encontrado');
      }

      const clonedSvg = svgElement.cloneNode(true) as SVGElement;
      clonedSvg.setAttribute('width', size.toString());
      clonedSvg.setAttribute('height', size.toString());

      const svgString = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('No se pudo obtener el contexto del canvas');
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, size, size);

      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = svgUrl;
      });

      ctx.drawImage(img, 0, 0, size, size);

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `codigo-qr-${size}x${size}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
      canvas.remove();

      toast.success('Código QR descargado exitosamente');
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      toast.error('Error al descargar el código QR. Por favor intenta nuevamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      toast.success('URL copiada al portapapeles');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error('Error al copiar la URL');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start space-y-4">
      <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-sm">
        <QRCodeSVG
          value={value}
          size={256}
          level="H"
          imageSettings={centerImage ? {
            src: centerImage,
            width: 64,
            height: 64,
            excavate: true,
          } : undefined}
          fgColor={qrColor}
          bgColor="#FFFFFF"
        />
      </div>
      <div className="w-full space-y-2">
        {showUrl && (
          <div className="flex gap-2">
            <Input
              value={value}
              readOnly
              className="flex-1"
              placeholder="URL del código QR"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="shrink-0"
            >
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Select
            value={selectedResolution.label}
            onValueChange={(value) => {
              const resolution = RESOLUTIONS.find(r => r.label === value);
              if (resolution) setSelectedResolution(resolution);
            }}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Seleccionar resolución" />
            </SelectTrigger>
            <SelectContent>
              {RESOLUTIONS.map((resolution) => (
                <SelectItem key={resolution.size} value={resolution.label}>
                  {resolution.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowUrl(!showUrl)}
            className="shrink-0"
          >
            {showUrl ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Button 
          onClick={downloadQRCode} 
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          disabled={isDownloading || !value}
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? 'Descargando...' : 'Descargar Código QR'}
        </Button>
      </div>
    </div>
  );
}