import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<string, string> = {
  primary: "gradient-primary text-primary-foreground shadow-lg",
  secondary: "bg-secondary text-secondary-foreground",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  destructive: "bg-destructive text-destructive-foreground",
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = "primary",
  loading,
  children,
  className,
  ...props
}) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
    disabled={loading}
    className={cn(
      "relative flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all disabled:opacity-60",
      variants[variant],
      className
    )}
    {...props}
  >
    {loading ? (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
      />
    ) : (
      children
    )}
  </motion.button>
);

export default AnimatedButton;
