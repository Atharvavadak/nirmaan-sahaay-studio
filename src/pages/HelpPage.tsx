import React from "react";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import Header from "@/components/app/Header";
import BottomNav from "@/components/app/BottomNav";
import GlassCard from "@/components/app/GlassCard";
import { HelpCircle, Info } from "lucide-react";

const HelpPage: React.FC = () => (
  <MobileContainer>
    <Header />
    <PageTransition>
      <div className="px-5 pb-8 pt-4">
        <h2 className="mb-4 font-display text-xl font-bold text-foreground">Help & About</h2>
        <GlassCard hover={false} className="mb-4">
          <div className="flex items-start gap-3">
            <Info size={18} className="mt-0.5 text-primary" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">NirmaanSahaay</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                A construction project management app designed for site engineers and contractors. Track projects, manage workers, monitor materials, and generate daily progress reports.
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard hover={false}>
          <div className="flex items-start gap-3">
            <HelpCircle size={18} className="mt-0.5 text-accent" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Need Help?</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Contact support at help@nirmaansahaay.com or visit our documentation for detailed guides.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
      </PageTransition>
      <BottomNav />
    </MobileContainer>
);

export default HelpPage;
