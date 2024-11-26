"use client";

import { useState, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Paintbrush } from "lucide-react";

type ColorSelectorProps = {
  selectedColor: string;
  onColorChange: (color: string) => void;
};

const PRESET_COLORS = [
  "#000000", // Negro
  "#2563eb", // Azul
  "#dc2626", // Rojo
  "#16a34a", // Verde
  "#9333ea", // Morado
  "#ea580c", // Naranja
  "#db2777", // Rosa
  "#0d9488", // Verde azulado
];

export function ColorSelector({ selectedColor, onColorChange }: ColorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePresetClick = useCallback((color: string) => {
    onColorChange(color);
    setIsOpen(false);
  }, [onColorChange]);

  return (
    <div className="space-y-2">
      <Label>Color del Código QR</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            role="combobox"
          >
            <div
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: selectedColor }}
            />
            <Paintbrush className="h-4 w-4" />
            <span>Seleccionar Color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="space-y-3">
            <HexColorPicker color={selectedColor} onChange={onColorChange} />
            <div className="grid grid-cols-4 gap-2 mt-3">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  className="h-8 w-full rounded-md border"
                  style={{ backgroundColor: color }}
                  onClick={() => handlePresetClick(color)}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}