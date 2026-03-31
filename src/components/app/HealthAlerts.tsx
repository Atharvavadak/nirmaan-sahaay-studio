import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Clock } from "lucide-react";
import type { HealthInfo } from "@/lib/projectHealth";

interface Props {
  health: HealthInfo;
  projectName: string;
}

const HealthAlerts: React.FC<Props> = ({ health, projectName }) => {
  if (health.status === "on-track") return null;

  const isDelayed = health.status === "delayed";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`mb-4 flex items-center gap-3 rounded-xl border p-3 ${
          isDelayed
            ? "border-red-500/20 bg-red-500/10"
            : "border-amber-500/20 bg-amber-500/10"
        }`}
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
        >
          {isDelayed ? (
            <AlertTriangle size={18} className="text-red-500" />
          ) : (
            <Clock size={18} className="text-amber-500" />
          )}
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold ${isDelayed ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}>
            {isDelayed ? "Project Overdue" : "Deadline Approaching"}
          </p>
          <p className="text-[11px] text-muted-foreground truncate">
            {isDelayed
              ? `${projectName} is ${Math.abs(health.daysUntilDue!)} day(s) past due`
              : `${projectName} is due in ${health.daysUntilDue} day(s)`}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HealthAlerts;
