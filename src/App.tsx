import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AnimatePresence } from "framer-motion";
import AuthPage from "./pages/AuthPage";
import ProjectSelectionPage from "./pages/ProjectSelectionPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import AddProjectPage from "./pages/AddProjectPage";
import WorkersPage from "./pages/WorkersPage";
import ReportPage from "./pages/ReportPage";
import DPRPage from "./pages/DPRPage";
import MaterialsPage from "./pages/MaterialsPage";
import HelpPage from "./pages/HelpPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/projects" element={<ProjectSelectionPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/add-project" element={<AddProjectPage />} />
              <Route path="/workers" element={<WorkersPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/dpr" element={<DPRPage />} />
              <Route path="/materials" element={<MaterialsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
