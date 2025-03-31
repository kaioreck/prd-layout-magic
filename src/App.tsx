
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import FinancialControl from "./pages/FinancialControl";
import ReturnReports from "./pages/ReturnReports";
import ProductRanking from "./pages/ProductRanking";
import WhatsAppInvitation from "./pages/WhatsAppInvitation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="financeiro" element={<FinancialControl />} />
            <Route path="relatorios/retorno" element={<ReturnReports />} />
            <Route path="relatorios/rankings/produtos" element={<ProductRanking />} />
            <Route path="marketing/whatsapp-invitation" element={<WhatsAppInvitation />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
