import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== "";

    return (
      <div className="relative mb-4">
        <motion.div
          animate={{ borderColor: focused ? "hsl(var(--primary))" : "hsl(var(--border))" }}
          className={cn(
            "relative rounded-xl border-2 bg-card transition-colors",
            error && "border-destructive",
            className
          )}
        >
          <input
            ref={ref}
            {...props}
            onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
            className="peer w-full bg-transparent px-4 pt-5 pb-2 text-sm text-foreground outline-none placeholder:text-transparent"
            placeholder={label}
          />
          <motion.label
            animate={{
              y: focused || hasValue ? -8 : 0,
              scale: focused || hasValue ? 0.8 : 1,
              color: focused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
            }}
            className="pointer-events-none absolute left-4 top-3.5 origin-left text-sm text-muted-foreground"
          >
            {label}
          </motion.label>
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";
export default AnimatedInput;
