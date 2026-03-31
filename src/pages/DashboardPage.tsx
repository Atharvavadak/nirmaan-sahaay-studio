import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ClipboardList, Package, BarChart3, UserPlus, CheckSquare, FolderOpen } from "lucide-react";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import Header from "@/components/app/Header";
import GlassCard from "@/components/app/GlassCard";
import AnimatedButton from "@/components/app/AnimatedButton";
import BottomNav from "@/components/app/BottomNav";
import HealthBadge from "@/components/app/HealthBadge";
import HealthAlerts from "@/components/app/HealthAlerts";
import { getProjectHealth } from "@/lib/projectHealth";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "tasks", label: "Tasks" },
  { id: "materials", label: "Materials" },
];

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showTabs, setShowTabs] = useState(false);
  const [attendance, setAttendance] = useState<string | null>(null);
  const navigate = useNavigate();
  const { selectedProject } = useProjects();
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const health = selectedProject ? getProjectHealth(selectedProject.dueDate) : null;

  return (
    <MobileContainer>
      <Header />
      <PageTransition>
        <div className="px-5 pb-4 pt-4">
          {/* Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Calendar size={14} />
            {today}
          </motion.div>

          {/* Project Card */}
          {selectedProject ? (
            <GlassCard
              onClick={() => setShowTabs(!showTabs)}
              className="gradient-warm mb-6 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="font-display text-lg font-bold text-primary-foreground">{selectedProject.name}</h3>
              <p className="text-sm text-primary-foreground/80 mt-0.5">{selectedProject.description}</p>
              <div className="mt-1 flex items-center gap-2 text-sm text-primary-foreground/80">
                <Clock size={14} />
                Due: {selectedProject.dueDate || "Not set"}
              </div>
            </GlassCard>
          ) : (
            <GlassCard
              onClick={() => navigate("/projects")}
              className="mb-6 cursor-pointer text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FolderOpen size={24} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No project selected</p>
              <p className="text-xs text-primary font-medium mt-1">Tap to select a project</p>
            </GlassCard>
          )}

          {/* Tabs */}
          <AnimatePresence>
            {showTabs && selectedProject && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="flex gap-1 rounded-xl bg-muted p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative flex-1 rounded-lg py-2 text-xs font-medium text-muted-foreground"
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="dash-tab"
                          className="absolute inset-0 rounded-lg bg-card shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  ))}
                </div>

                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3"
                >
                  {activeTab === "overview" && (
                    <GlassCard hover={false}>
                      <p className="text-sm text-foreground">{selectedProject.description || "No description available."}</p>
                    </GlassCard>
                  )}
                  {activeTab === "tasks" && (
                    <div className="space-y-2">
                      {["Foundation inspection", "Steel framework", "Electrical wiring"].map((t, i) => (
                        <GlassCard key={i} hover={false} className="py-3">
                          <div className="flex items-center gap-2">
                            <ClipboardList size={14} className="text-primary" />
                            <span className="text-sm text-foreground">{t}</span>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  )}
                  {activeTab === "materials" && (
                    <div className="space-y-2">
                      {["Cement — 500 bags", "Steel rods — 200 units", "Bricks — 10,000"].map((m, i) => (
                        <GlassCard key={i} hover={false} className="py-3" onClick={() => navigate("/materials")}>
                          <div className="flex items-center gap-2">
                            <Package size={14} className="text-accent" />
                            <span className="text-sm text-foreground">{m}</span>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          <h2 className="mb-3 font-display text-base font-semibold text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <AnimatedButton
              variant="secondary"
              className="flex-col gap-1 py-4"
              onClick={() => {
                const time = format(new Date(), "hh:mm:ss a");
                setAttendance(time);
                toast({ title: "Attendance Marked", description: `Logged at ${time}` });
              }}
            >
              <CheckSquare size={20} className="text-primary" />
              <span className="text-xs">Mark Attendance</span>
            </AnimatedButton>
            <AnimatedButton
              variant="secondary"
              className="flex-col gap-1 py-4"
              onClick={() => navigate("/workers")}
            >
              <UserPlus size={20} className="text-primary" />
              <span className="text-xs">Add Worker</span>
            </AnimatedButton>
          </div>

          {attendance && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6"
            >
              <GlassCard hover={false} className="text-center">
                <p className="text-xs text-muted-foreground">Attendance marked at</p>
                <p className="font-display text-lg font-bold text-primary">{attendance}</p>
              </GlassCard>
            </motion.div>
          )}

          {/* Navigation Cards */}
          <div className="space-y-3">
            {[
              { icon: BarChart3, label: "Report", desc: "View progress reports", path: "/report" },
              { icon: ClipboardList, label: "DPR", desc: "Daily progress reports", path: "/dpr" },
              { icon: Package, label: "Materials", desc: "Material requests", path: "/materials" },
            ].map((item, i) => (
              <GlassCard
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => navigate(item.path)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileContainer>
  );
};

export default DashboardPage;
