import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong relative z-10 w-full max-w-sm rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            {title && <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X size={18} />
            </motion.button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
