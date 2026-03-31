import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, Image, Plus, ArrowLeft } from "lucide-react";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import Header from "@/components/app/Header";
import BottomNav from "@/components/app/BottomNav";
import GlassCard from "@/components/app/GlassCard";
import AnimatedButton from "@/components/app/AnimatedButton";
import AnimatedInput from "@/components/app/AnimatedInput";
import { format } from "date-fns";

interface DPREntry {
  id: number;
  date: string;
  description: string;
}

const DPRPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [entries, setEntries] = useState<DPREntry[]>([
    { id: 1, date: "2026-03-30", description: "Foundation pouring completed for Block C. Weather clear." },
    { id: 2, date: "2026-03-29", description: "Steel reinforcement work for pillars. 12 workers on site." },
  ]);

  const addEntry = () => {
    if (!description.trim()) return;
    setEntries([{ id: Date.now(), date: format(new Date(), "yyyy-MM-dd"), description: description.trim() }, ...entries]);
    setDescription("");
    setDeadline("");
    setShowForm(false);
  };

  return (
    <MobileContainer>
      <Header />
      <PageTransition>
        <div className="px-5 pb-8 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">Daily Progress Report</h2>
            <AnimatedButton variant="ghost" onClick={() => setShowForm(!showForm)} className="p-2">
              {showForm ? <ArrowLeft size={18} /> : <Plus size={18} />}
            </AnimatedButton>
          </div>

          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mb-6 overflow-hidden"
            >
              <GlassCard hover={false}>
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={14} />
                  {format(new Date(), "yyyy-MM-dd")} (Today)
                </div>
                <motion.textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Work description..."
                  className="mb-3 w-full rounded-xl border-2 border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  rows={3}
                />
                <AnimatedInput label="Deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                <div className="mb-3 flex items-center gap-2 rounded-xl border-2 border-dashed border-border p-4 text-muted-foreground">
                  <Image size={18} />
                  <span className="text-xs">Tap to upload image</span>
                </div>
                <AnimatedButton onClick={addEntry} className="w-full">Submit DPR</AnimatedButton>
              </GlassCard>
            </motion.div>
          )}

          <div className="space-y-3">
            {entries.map((entry, i) => (
              <GlassCard
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                hover={false}
              >
                <div className="mb-2 flex items-center gap-2 text-xs text-primary">
                  <Calendar size={12} />
                  {entry.date}
                </div>
                <div className="flex items-start gap-2">
                  <FileText size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
                  <p className="text-sm text-foreground">{entry.description}</p>
                </div>
                <div className="mt-2 flex h-16 items-center justify-center rounded-lg bg-muted">
                  <Image size={20} className="text-muted-foreground" />
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

export default DPRPage;
