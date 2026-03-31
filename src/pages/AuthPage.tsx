import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import AnimatedInput from "@/components/app/AnimatedInput";
import AnimatedButton from "@/components/app/AnimatedButton";
import MobileContainer from "@/components/app/MobileContainer";
import PageTransition from "@/components/app/PageTransition";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Min 6 characters";
    if (isSignUp && password !== confirmPassword) errs.confirm = "Passwords don't match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/projects");
    }, 1200);
  };

  return (
    <MobileContainer>
      <PageTransition>
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-8 text-center"
          >
            <h1 className="font-display text-3xl font-bold text-foreground">
              Nirmaan<span className="text-primary">Sahaay</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Construction management, simplified</p>
          </motion.div>

          <motion.div
            layout
            className="glass w-full rounded-2xl p-6"
          >
            <div className="mb-6 flex rounded-xl bg-muted p-1">
              {["Sign In", "Sign Up"].map((tab, i) => (
                <motion.button
                  key={tab}
                  onClick={() => { setIsSignUp(i === 1); setErrors({}); }}
                  className="relative flex-1 rounded-lg py-2 text-sm font-medium text-muted-foreground"
                >
                  {(isSignUp ? i === 1 : i === 0) && (
                    <motion.div
                      layoutId="auth-tab"
                      className="absolute inset-0 rounded-lg bg-card shadow-sm"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? "signup" : "signin"}
                initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-[18px] z-10 text-muted-foreground" />
                  <AnimatedInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    className="pl-8"
                  />
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-[18px] z-10 text-muted-foreground" />
                  <AnimatedInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    className="pl-8"
                  />
                </div>
                {isSignUp && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative"
                  >
                    <Lock size={16} className="absolute left-3 top-[18px] z-10 text-muted-foreground" />
                    <AnimatedInput
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={errors.confirm}
                      className="pl-8"
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <AnimatedButton onClick={handleSubmit} loading={loading} className="mt-2 w-full">
              {isSignUp ? "Create Account" : "Sign In"} <ArrowRight size={16} />
            </AnimatedButton>
          </motion.div>
        </div>
      </PageTransition>
    </MobileContainer>
  );
};

export default AuthPage;
