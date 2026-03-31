import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Drawer from "./Drawer";

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="glass sticky top-0 z-40 flex items-center gap-3 px-4 py-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setDrawerOpen(true)}
          className="rounded-lg p-2 text-foreground hover:bg-muted"
        >
          <Menu size={22} />
        </motion.button>
        <h1 className="font-display text-lg font-bold text-foreground">
          Nirmaan<span className="text-primary">Sahaay</span>
        </h1>
      </header>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Header;
