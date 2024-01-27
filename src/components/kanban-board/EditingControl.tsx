"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

interface EditingControlProps {
  closeEditingMode: () => void;
}

export default function EditingControl({ closeEditingMode }: EditingControlProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="submit"
        variant="secondary"
        size="icon"
        className="bg-primary-foreground shadow-lg"
        onMouseDown={(e) => e.preventDefault()}
      >
        <CheckIcon className="h-5 w-5" />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="bg-primary-foreground shadow-lg"
        onClick={closeEditingMode}
      >
        <Cross2Icon className="h-5 w-5" />
      </Button>
    </div>
  );
}
