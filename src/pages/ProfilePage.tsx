import React from "react";
import { motion } from "framer-motion";
import { Mail, LogOut } from "lucide-react";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import Header from "@/components/app/Header";
import GlassCard from "@/components/app/GlassCard";
import AnimatedButton from "@/components/app/AnimatedButton";
import { useNavigate } from "react-router-dom";

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

          <AnimatedButton variant="destructive" onClick={() => navigate("/projects")} className="w-full">
            <LogOut size={16} /> Logout
          </AnimatedButton>
        </div>
      </PageTransition>
    </MobileContainer>
  );
};

export default ProfilePage;
