import React from "react";
import { motion } from "framer-motion";
import { Mail, LogOut, BarChart3, ClipboardList, Package, LayoutDashboard, FolderOpen, ChevronRight } from "lucide-react";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import Header from "@/components/app/Header";
import GlassCard from "@/components/app/GlassCard";
import AnimatedButton from "@/components/app/AnimatedButton";
import BottomNav from "@/components/app/BottomNav";
import { useNavigate } from "react-router-dom";

const quickLinks = [
  { icon: LayoutDashboard, label: "Dashboard", desc: "Go to main dashboard", path: "/dashboard" },
  { icon: FolderOpen, label: "Projects", desc: "View all projects", path: "/projects" },
  { icon: BarChart3, label: "Report", desc: "View progress reports", path: "/report" },
  { icon: ClipboardList, label: "DPR", desc: "Daily progress reports", path: "/dpr" },
  { icon: Package, label: "Materials", desc: "Material requests", path: "/materials" },
];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <Header />
      <PageTransition>
        <div className="px-5 pb-8 pt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 flex flex-col items-center"
          >
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-3xl font-bold text-primary-foreground font-display">
              NS
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">Site Engineer</h2>
            <p className="text-sm text-muted-foreground">NirmaanSahaay User</p>
          </motion.div>

          <GlassCard hover={false} className="mb-6">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">engineer@nirmaansahaay.com</p>
              </div>
            </div>
          </GlassCard>

          <h3 className="mb-3 font-display text-base font-semibold text-foreground">Quick Access</h3>
          <div className="space-y-2 mb-6">
            {quickLinks.map((item, i) => (
              <GlassCard
                key={item.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => navigate(item.path)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground">{item.label}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </GlassCard>
            ))}
          </div>

          <AnimatedButton variant="destructive" onClick={() => navigate("/projects")} className="w-full">
            <LogOut size={16} /> Logout
          </AnimatedButton>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileContainer>
  );
};

export default ProfilePage;
