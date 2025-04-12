
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
  useSidebar
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  const location = useLocation();
  const { isMobile } = useSidebar();
  const [showReportsSubmenu, setShowReportsSubmenu] = React.useState(false);
  
  // Check if the current route is active
  const isRouteActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Check if any reports sub-route is active
  const isReportsActive = location.pathname.includes('/relatorios');
  
  // Toggle the reports submenu
  React.useEffect(() => {
    if (isReportsActive) {
      setShowReportsSubmenu(true);
    }
  }, [isReportsActive]);

  const toggleReportsSubmenu = () => {
    setShowReportsSubmenu(!showReportsSubmenu);
  };

  // Report submenu items
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
    <Sidebar variant="sidebar" collapsible={isMobile ? "offcanvas" : "none"}>
      <SidebarHeader className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2 px-2">
          <BarberLogo />
        </div>
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
                  isActive={isReportsActive}
                  tooltip="Relatórios"
                  onClick={toggleReportsSubmenu}
                >
                  <div className="flex items-center w-full">
                    <BarChart />
                    <span>Relatórios</span>
                    <ChevronRight className={`ml-auto transition-transform ${showReportsSubmenu ? 'rotate-90' : ''}`} />
                  </div>
                </SidebarMenuButton>
                {showReportsSubmenu && (
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
          <p className="text-xs">© 2024 Barber System</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
