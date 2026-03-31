import React, { useState } from "react";
import { Package, CheckCircle2, XCircle, Truck } from "lucide-react";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import Header from "@/components/app/Header";
import BottomNav from "@/components/app/BottomNav";
import GlassCard from "@/components/app/GlassCard";
import Modal from "@/components/app/Modal";

interface Material {
  id: number;
  name: string;
  requested: number;
  delivered: number;
  cancelled: number;
  unit: string;
}

const materials: Material[] = [
  { id: 1, name: "Cement", requested: 500, delivered: 420, cancelled: 20, unit: "bags" },
  { id: 2, name: "Steel Rods", requested: 200, delivered: 180, cancelled: 0, unit: "units" },
  { id: 3, name: "Bricks", requested: 10000, delivered: 8500, cancelled: 500, unit: "pcs" },
  { id: 4, name: "Sand", requested: 50, delivered: 45, cancelled: 0, unit: "trucks" },
];

const statusColor = (delivered: number, requested: number) => {
  const ratio = delivered / requested;
  if (ratio >= 0.9) return "text-accent";
  if (ratio >= 0.6) return "text-primary";
  return "text-destructive";
};

const MaterialsPage: React.FC = () => {
  const [selected, setSelected] = useState<Material | null>(null);

  return (
    <MobileContainer>
      <Header />
      <PageTransition>
        <div className="px-5 pb-8 pt-4">
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">Material Requests</h2>

          <div className="space-y-3">
            {materials.map((m, i) => (
              <GlassCard
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(m)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Package size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.delivered}/{m.requested} {m.unit}</p>
                  </div>
                  <div className={`text-xs font-semibold ${statusColor(m.delivered, m.requested)}`}>
                    {Math.round((m.delivered / m.requested) * 100)}%
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
            {selected && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Requested</p>
                    <p className="text-sm font-semibold text-foreground">{selected.requested} {selected.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Delivered</p>
                    <p className="text-sm font-semibold text-foreground">{selected.delivered} {selected.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <XCircle size={18} className="text-destructive" />
                  <div>
                    <p className="text-xs text-muted-foreground">Cancelled</p>
                    <p className="text-sm font-semibold text-foreground">{selected.cancelled} {selected.unit}</p>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </PageTransition>
    </MobileContainer>
  );
};

export default MaterialsPage;
