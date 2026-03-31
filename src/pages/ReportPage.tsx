import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import Header from "@/components/app/Header";
import BottomNav from "@/components/app/BottomNav";
import GlassCard from "@/components/app/GlassCard";

const data = [
  { week: "W1", planned: 20, actual: 18 },
  { week: "W2", planned: 35, actual: 30 },
  { week: "W3", planned: 50, actual: 48 },
  { week: "W4", planned: 65, actual: 55 },
  { week: "W5", planned: 80, actual: 70 },
];

const ReportPage: React.FC = () => (
  <MobileContainer>
    <Header />
    <PageTransition>
      <div className="px-5 pb-8 pt-4">
        <h2 className="mb-4 font-display text-xl font-bold text-foreground">Report</h2>

        <GlassCard hover={false} className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Progress: Planned vs Actual</h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="planned" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-3">
          <GlassCard hover={false}>
            <p className="text-xs text-muted-foreground">Planned</p>
            <p className="font-display text-2xl font-bold text-primary">80%</p>
          </GlassCard>
          <GlassCard hover={false}>
            <p className="text-xs text-muted-foreground">Actual</p>
            <p className="font-display text-2xl font-bold text-accent">70%</p>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
    <BottomNav />
  </MobileContainer>
);

export default ReportPage;
