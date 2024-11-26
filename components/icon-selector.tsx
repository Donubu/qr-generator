"use client";

import { PREDEFINED_ICONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ImageIcon, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type IconSelectorProps = {
  onSelect: (icon: string) => void;
  selectedIcon: string | null;
};

export function IconSelector({ onSelect, selectedIcon }: IconSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedIcon ? (
            <>
              {PREDEFINED_ICONS.find((icon) => icon.id === selectedIcon)?.label}
              {PREDEFINED_ICONS.find((icon) => icon.id === selectedIcon)?.icon && (
                <div className="ml-2">
                  {(() => {
                    const IconComponent = PREDEFINED_ICONS.find(
                      (icon) => icon.id === selectedIcon
                    )?.icon;
                    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
                  })()}
                </div>
              )}
            </>
          ) : (
            <>
              Select an icon
              <ImageIcon className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search icons..." />
          <CommandEmpty>No icon found.</CommandEmpty>
          <CommandGroup>
            {PREDEFINED_ICONS.map((icon) => (
              <CommandItem
                key={icon.id}
                value={icon.label}
                onSelect={() => {
                  onSelect(icon.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedIcon === icon.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <icon.icon className="mr-2 h-4 w-4" />
                {icon.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}