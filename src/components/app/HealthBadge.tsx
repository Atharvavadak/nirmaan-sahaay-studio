import React from "react";
import { motion } from "framer-motion";
import type { HealthStatus } from "@/lib/projectHealth";

const config: Record<HealthStatus, { bg: string; text: string; glow: string }> = {
  "on-track": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "shadow-emerald-500/30",
  },
  "at-risk": {
    bg: "bg-amber-500/15",
    text: "text-amber-600 dark:text-amber-400",
    glow: "shadow-amber-500/30",
  },
  delayed: {
    bg: "bg-red-500/15",
    text: "text-red-600 dark:text-red-400",
    glow: "shadow-red-500/30",
  },
};

interface Props {
  status: HealthStatus;
  label: string;
}

const HealthBadge: React.FC<Props> = ({ status, label }) => {
  const c = config[status];
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${c.bg} ${c.text} shadow-sm ${c.glow}`}
    >
      <motion.span
        animate={status !== "on-track" ? { scale: [1, 1.4, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className={`h-1.5 w-1.5 rounded-full ${
          status === "on-track" ? "bg-emerald-500" : status === "at-risk" ? "bg-amber-500" : "bg-red-500"
        }`}
      />
      {label}
    </motion.span>
  );
};

export default HealthBadge;
