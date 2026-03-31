import React from "react";
import { motion } from "framer-motion";
import { Home, FolderOpen, User, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: ArrowLeft, label: "Back", path: "back" },
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: FolderOpen, label: "Projects", path: "/projects" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    if (path === "back") {
      navigate(-1);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="sticky bottom-0 z-40 glass-strong border-t border-border">
      <nav className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = item.path !== "back" && location.pathname === item.path;
          return (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleNav(item.path)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
