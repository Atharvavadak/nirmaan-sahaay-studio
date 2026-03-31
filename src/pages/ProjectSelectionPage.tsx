import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FolderPlus } from "lucide-react";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import ProjectCard from "@/components/app/ProjectCard";
import AnimatedButton from "@/components/app/AnimatedButton";
import BottomNav from "@/components/app/BottomNav";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";

const ProjectSelectionPage: React.FC = () => {
  const { projects, selectedProjectId, selectProject } = useProjects();
  const [localSelected, setLocalSelected] = useState<string | null>(selectedProjectId);
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    setLocalSelected(id);
  };

  const handleContinue = () => {
    if (localSelected) {
      selectProject(localSelected);
      navigate("/dashboard");
    }
  };

  return (
    <MobileContainer>
      <PageTransition>
        <div className="flex min-h-[calc(100vh-60px)] flex-col px-5 pt-16 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-2xl font-bold text-foreground">Select Project</h1>
            <p className="mt-1 text-sm text-muted-foreground">Choose a project to continue</p>
          </motion.div>

          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-1 flex-col items-center justify-center gap-4 text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <FolderPlus size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">No Projects Yet</h3>
              <p className="text-sm text-muted-foreground">Create your first project to get started</p>
              <AnimatedButton onClick={() => navigate("/add-project")} className="mt-2">
                <FolderPlus size={16} /> Add Project
              </AnimatedButton>
            </motion.div>
          ) : (
            <>
              <div className="space-y-4">
                {projects.map((p, i) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    selected={localSelected === p.id}
                    index={i}
                    onSelect={() => handleSelect(p.id)}
                  />
                ))}
              </div>

              {localSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <AnimatedButton onClick={handleContinue} className="w-full">
                    Continue <ArrowRight size={16} />
                  </AnimatedButton>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-center"
              >
                <AnimatedButton variant="ghost" onClick={() => navigate("/add-project")} className="text-sm">
                  <FolderPlus size={14} /> Add Another Project
                </AnimatedButton>
              </motion.div>
            </>
          )}
        </div>
      </PageTransition>
      <BottomNav />
    </MobileContainer>
  );
};

export default ProjectSelectionPage;
