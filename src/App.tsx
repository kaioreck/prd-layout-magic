
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import FinancialControl from "./pages/FinancialControl";
import ReturnReports from "./pages/ReturnReports";
import ProductRanking from "./pages/ProductRanking";
import Schedule from "./pages/Schedule";
import Establishment from "./pages/Establishment";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import MainReports from "./pages/MainReports";
import DashboardReports from "./pages/DashboardReports";
import ResultsReport from "./pages/ResultsReport";
import Rankings from "./pages/Rankings";
import SatisfactionSurvey from "./pages/SatisfactionSurvey";
import HeatMap from "./pages/HeatMap";
import { EstablishmentProvider } from "./contexts/EstablishmentContext";
import { SettingsProvider } from "./contexts/SettingsContext";

// Componente para rolar para o topo ao navegar
const ScrollToTop: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return <>{children}</>;
};

// Create a React Query client
const queryClient = new QueryClient();

// Set document title
document.title = "Barber.IA";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EstablishmentProvider>
        <SettingsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="agenda" element={<Schedule />} />
                  <Route path="estabelecimento" element={<Establishment />} />
                  <Route path="financeiro" element={<FinancialControl />} />
                  <Route path="relatorios/principais" element={<MainReports />} />
                  <Route path="relatorios/dashboard" element={<DashboardReports />} />
                  <Route path="relatorios/demonstrativo" element={<ResultsReport />} />
                  <Route path="relatorios/rankings" element={<Rankings />} />
                  <Route path="relatorios/rankings/produtos" element={<ProductRanking />} />
                  <Route path="relatorios/pesquisa" element={<SatisfactionSurvey />} />
                  <Route path="relatorios/mapa-calor" element={<HeatMap />} />
                  <Route path="relatorios/retorno" element={<ReturnReports />} />
                  <Route path="configuracoes" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </SettingsProvider>
      </EstablishmentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
