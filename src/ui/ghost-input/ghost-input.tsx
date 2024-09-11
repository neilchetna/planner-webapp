import { TextField } from "@radix-ui/themes";
import { RootProps } from "@radix-ui/themes/src/components/text-field.jsx";
import clsx from "clsx";
import React from "react";

type GhostInputProps = RootProps & {
  children?: React.ReactNode;
  className?: string;
};

function GhostInput({ children, className = "", ...props }: GhostInputProps) {
  return (
    <TextField.Root className={clsx("ghost-input", className)} {...props}>
      {children}
    </TextField.Root>
  );
}

export default GhostInput;
