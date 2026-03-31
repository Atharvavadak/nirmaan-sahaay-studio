import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Moon, Sun, HelpCircle, FileText, PlusCircle, LogOut } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: "Profile", action: () => { navigate("/profile"); onClose(); } },
    { icon: theme === "dark" ? Sun : Moon, label: theme === "dark" ? "Light Mode" : "Dark Mode", action: toggleTheme },
    { icon: HelpCircle, label: "Help / About", action: () => { navigate("/help"); onClose(); } },
    { icon: FileText, label: "Show DPR", action: () => { navigate("/dpr"); onClose(); } },
    { icon: PlusCircle, label: "Add New Project", action: () => { navigate("/add-project"); onClose(); } },
    { icon: LogOut, label: "Logout", action: () => { navigate("/projects"); onClose(); } },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong absolute left-0 top-0 h-full w-72 p-6"
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">Menu</h2>
              <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
                <X size={20} />
              </motion.button>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={item.action}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <item.icon size={18} className="text-primary" />
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
