import { prefersDark, theme } from "@/signals/theme";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
    const selected =
        theme.value !== "system"
            ? theme.value
            : prefersDark()
              ? "dark"
              : "light";

    return (
        <Sonner
            theme={selected}
            className="toaster group"
            style={{
                "--normal-bg": "var(--popover)",
                "--normal-text": "var(--popover-foreground)",
                "--normal-border": "var(--border)",
            }}
            {...props}
        />
    );
}
