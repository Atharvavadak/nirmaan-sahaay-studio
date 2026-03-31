import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, hover = true, ...props }) => (
  <motion.div
    whileHover={hover ? { scale: 1.02, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" } : undefined}
    whileTap={hover ? { scale: 0.98 } : undefined}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className={cn("glass rounded-2xl p-4", className)}
    {...props}
  >
    {children}
  </motion.div>
);

export default GlassCard;
