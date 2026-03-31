import React, { useState } from "react";
import { motion } from "framer-motion";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import Header from "@/components/app/Header";
import AnimatedInput from "@/components/app/AnimatedInput";
import AnimatedButton from "@/components/app/AnimatedButton";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const AddProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", dueDate: "", deadline: "", description: "" });

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => navigate("/dashboard"), 1200);
    }, 1000);
  };

  return (
    <MobileContainer>
      <Header />
      <PageTransition>
        <div className="px-5 pb-8 pt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-1 text-sm text-muted-foreground"
          >
            <ArrowLeft size={16} /> Back
          </motion.button>
          <h2 className="mb-6 font-display text-xl font-bold text-foreground">Add New Project</h2>

          {done ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3 py-12"
            >
              <CheckCircle2 size={48} className="text-accent" />
              <p className="font-display text-lg font-semibold text-foreground">Project Added!</p>
            </motion.div>
          ) : (
            <>
              <AnimatedInput label="Project Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <AnimatedInput label="Due Date" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              <AnimatedInput label="Original Deadline" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
              <div className="relative mb-4">
                <motion.textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Description"
                  className="w-full rounded-xl border-2 border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  rows={4}
                />
              </div>
              <AnimatedButton onClick={handleSubmit} loading={loading} className="w-full">
                Create Project
              </AnimatedButton>
            </>
          )}
        </div>
      </PageTransition>
    </MobileContainer>
  );
};

export default AddProjectPage;
