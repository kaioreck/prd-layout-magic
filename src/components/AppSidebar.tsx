
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Calendar, Store, DollarSign, 
  BarChart, Settings, ChevronRight, FileText, 
  PieChart, Activity, ChartBar
} from 'lucide-react';
import BarberLogo from './BarberLogo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  
  // Função para verificar se uma rota está ativa
  const isRouteActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Verifica se alguma sub-rota de relatórios está ativa
  const isReportsActive = location.pathname.includes('/relatorios');

  // Itens do submenu de relatórios
  const reportSubmenuItems = [
    { 
      label: 'Relatórios Principais', 
      to: '/relatorios/principais',
      isActive: isRouteActive('/relatorios/principais') 
    },
    { 
      label: 'Dashboard', 
      to: '/relatorios/dashboard',
      isActive: isRouteActive('/relatorios/dashboard')
    },
    { 
      label: 'Demonstrativo de resultado', 
      to: '/relatorios/demonstrativo',
      isActive: isRouteActive('/relatorios/demonstrativo')
    },
    { 
      label: 'Rankings', 
      to: '/relatorios/rankings',
      isActive: isRouteActive('/relatorios/rankings')
    },
    { 
      label: 'Pesquisa de satisfação', 
      to: '/relatorios/pesquisa',
      isActive: isRouteActive('/relatorios/pesquisa')
    },
    { 
      label: 'Mapa de calor', 
      to: '/relatorios/mapa-calor',
      isActive: isRouteActive('/relatorios/mapa-calor')
    },
    { 
      label: 'Relatórios de retorno', 
      to: '/relatorios/retorno',
      isActive: isRouteActive('/relatorios/retorno')
    },
  ];

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2 px-2">
          {state === "expanded" && <BarberLogo />}
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isRouteActive('/')}
                  tooltip="Home"
                >
                  <Link to="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isRouteActive('/agenda')}
                  tooltip="Agenda"
                >
                  <Link to="/agenda">
                    <Calendar />
                    <span>Agenda</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isRouteActive('/estabelecimento')}
                  tooltip="Meu Estabelecimento"
                >
                  <Link to="/estabelecimento">
                    <Store />
                    <span>Meu Estabelecimento</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isRouteActive('/financeiro')}
                  tooltip="Financeiro"
                >
                  <Link to="/financeiro">
                    <DollarSign />
                    <span>Financeiro</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isReportsActive}
                  tooltip="Relatórios"
                >
                  <div>
                    <BarChart />
                    <span>Relatórios</span>
                    <ChevronRight className={`ml-auto transition-transform ${isReportsActive ? 'rotate-90' : ''}`} />
                  </div>
                </SidebarMenuButton>
                {isReportsActive && (
                  <SidebarMenuSub>
                    {reportSubmenuItems.map((item, index) => (
                      <SidebarMenuSubItem key={index}>
                        <SidebarMenuSubButton 
                          asChild 
                          isActive={item.isActive}
                        >
                          <Link to={item.to}>{item.label}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isRouteActive('/configuracoes')}
                  tooltip="Configurações"
                >
                  <Link to="/configuracoes">
                    <Settings />
                    <span>Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/20 p-4">
        <div className="text-center text-sm text-sidebar-foreground/70">
          {state === "expanded" ? (
            <p className="text-xs">© 2024 Barber System</p>
          ) : null}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
