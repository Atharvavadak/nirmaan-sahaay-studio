import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, DollarSign, CalendarDays } from "lucide-react";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import Header from "@/components/app/Header";
import BottomNav from "@/components/app/BottomNav";
import GlassCard from "@/components/app/GlassCard";
import AnimatedInput from "@/components/app/AnimatedInput";
import AnimatedButton from "@/components/app/AnimatedButton";
import Modal from "@/components/app/Modal";

interface Worker {
  id: number;
  name: string;
  dailyWage: number;
  daysWorked: number;
}

const WorkersPage: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([
    { id: 1, name: "Rajesh Kumar", dailyWage: 800, daysWorked: 22 },
    { id: 2, name: "Sunil Yadav", dailyWage: 750, daysWorked: 18 },
  ]);
  const [newName, setNewName] = useState("");
  const [selected, setSelected] = useState<Worker | null>(null);

  const addWorker = () => {
    if (!newName.trim()) return;
    setWorkers([...workers, { id: Date.now(), name: newName.trim(), dailyWage: 700, daysWorked: 0 }]);
    setNewName("");
  };

  return (
    <MobileContainer>
      <Header />
      <PageTransition>
        <div className="px-5 pb-8 pt-4">
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">Workers</h2>

          <div className="mb-6 flex gap-2">
            <div className="flex-1">
              <AnimatedInput label="Worker Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <AnimatedButton onClick={addWorker} className="mb-4 shrink-0">
              <UserPlus size={18} />
            </AnimatedButton>
          </div>

          <div className="space-y-3">
            {workers.map((w, i) => (
              <GlassCard
                key={w.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(w)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {w.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{w.name}</p>
                    <p className="text-xs text-muted-foreground">₹{w.dailyWage}/day</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
            {selected && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign size={18} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Daily Wage</p>
                    <p className="text-sm font-semibold text-foreground">₹{selected.dailyWage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays size={18} className="text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Days Worked</p>
                    <p className="text-sm font-semibold text-foreground">{selected.daysWorked} days</p>
                  </div>
                </div>
                <GlassCard hover={false} className="bg-primary/5">
                  <p className="text-xs text-muted-foreground">Total Earned</p>
                  <p className="font-display text-lg font-bold text-primary">₹{selected.dailyWage * selected.daysWorked}</p>
                </GlassCard>
              </div>
            )}
          </Modal>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileContainer>
  );
};

export default WorkersPage;
