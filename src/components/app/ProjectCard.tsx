import React from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Calendar } from "lucide-react";
import GlassCard from "./GlassCard";
import HealthBadge from "./HealthBadge";
import { getProjectHealth } from "@/lib/projectHealth";
import type { Project } from "@/contexts/ProjectContext";

interface Props {
  project: Project;
  selected: boolean;
  index: number;
  onSelect: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, selected, index, onSelect }) => (
  <GlassCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    onClick={onSelect}
    className={`cursor-pointer ${selected ? "ring-2 ring-primary" : ""}`}
  >
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Building2 size={20} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-sm font-semibold text-foreground truncate">{project.name}</h3>
        <p className="text-xs text-muted-foreground truncate">{project.description}</p>
        {project.dueDate && (
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar size={10} />
            Due: {project.dueDate}
          </div>
        )}
      </div>
      {selected && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <CheckCircle2 size={20} className="text-primary" />
        </motion.div>
      )}
    </div>
  </GlassCard>
);

export default ProjectCard;
