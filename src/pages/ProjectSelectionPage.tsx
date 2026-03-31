import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, ArrowRight } from "lucide-react";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import GlassCard from "@/components/app/GlassCard";
import AnimatedButton from "@/components/app/AnimatedButton";
import { useNavigate } from "react-router-dom";

const projects = [
  { id: "a", name: "Project A", description: "Residential complex — Phase 2" },
  { id: "b", name: "Project B", description: "Commercial tower — Foundation" },
];

const ProjectSelectionPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <PageTransition>
        <div className="flex min-h-screen flex-col px-5 pt-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-2xl font-bold text-foreground">Select Project</h1>
            <p className="mt-1 text-sm text-muted-foreground">Choose a project to continue</p>
          </motion.div>

          <div className="space-y-4">
            {projects.map((p, i) => (
              <GlassCard
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(p.id)}
                className={`cursor-pointer ${selected === p.id ? "ring-2 ring-primary" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-sm font-semibold text-foreground">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                  </div>
                  {selected === p.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 size={20} className="text-primary" />
                    </motion.div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>

          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <AnimatedButton onClick={() => navigate("/dashboard")} className="w-full">
                Continue <ArrowRight size={16} />
              </AnimatedButton>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </MobileContainer>
  );
};

export default ProjectSelectionPage;
