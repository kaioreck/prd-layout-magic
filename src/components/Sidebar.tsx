
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Calendar, Store, DollarSign, BarChart, 
  MessageSquare, Settings, Users, ChevronRight, ChevronLeft 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  isActive = false,
  hasSubmenu = false,
  onClick
}) => {
  return (
    <li>
      <Link 
        to={to} 
        className={`flex items-center p-2 text-white rounded-md hover:bg-white/10 ${isActive ? 'bg-white/10' : ''}`}
        onClick={onClick}
      >
        <div className="mr-3">{icon}</div>
        <span className="flex-1">{label}</span>
        {hasSubmenu && <ChevronRight className="w-4 h-4" />}
      </Link>
    </li>
  );
};

interface SubmenuProps {
  items: Array<{
    label: string;
    to: string;
    isActive?: boolean;
  }>;
}

const Submenu: React.FC<SubmenuProps> = ({ items }) => {
  return (
    <ul className="pl-8 space-y-1">
      {items.map((item, index) => (
        <li key={index}>
          <Link 
            to={item.to} 
            className={`block p-2 text-white rounded-md hover:bg-white/10 ${item.isActive ? 'bg-white/10' : ''}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showReportsSubmenu, setShowReportsSubmenu] = useState(false);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setShowReportsSubmenu(false);
    }
  };

  const toggleReportsSubmenu = () => {
    setShowReportsSubmenu(!showReportsSubmenu);
  };

  const reportSubmenuItems = [
    { label: 'Relatórios Principais', to: '/relatorios/principais', isActive: true },
    { label: 'Dashboard', to: '/relatorios/dashboard' },
    { label: 'Demonstrativo de resultado', to: '/relatorios/demonstrativo' },
    { label: 'Rankings', to: '/relatorios/rankings' },
    { label: 'Pesquisa de satisfação', to: '/relatorios/pesquisa' },
    { label: 'Mapa de calor', to: '/relatorios/mapa-calor' },
    { label: 'Relatórios de retorno', to: '/relatorios/retorno' },
  ];

  return (
    <aside className={`bg-trinks-orange h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-trinks-orange/20">
          {!isCollapsed && (
            <Link to="/" className="text-white text-xl font-bold">
              trinks
            </Link>
          )}
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            <SidebarItem 
              icon={<Home className="w-5 h-5" />} 
              label="Home" 
              to="/" 
              isActive 
            />
            <SidebarItem 
              icon={<Calendar className="w-5 h-5" />} 
              label="Agenda" 
              to="/agenda" 
            />
            <SidebarItem 
              icon={<Store className="w-5 h-5" />} 
              label="Meu Estabelecimento" 
              to="/estabelecimento" 
            />
            <SidebarItem 
              icon={<DollarSign className="w-5 h-5" />} 
              label="Financeiro" 
              to="/financeiro" 
            />
            <SidebarItem 
              icon={<BarChart className="w-5 h-5" />} 
              label="Relatórios" 
              to="#" 
              hasSubmenu 
              onClick={toggleReportsSubmenu}
            />
            
            {showReportsSubmenu && !isCollapsed && <Submenu items={reportSubmenuItems} />}
            
            <SidebarItem 
              icon={<MessageSquare className="w-5 h-5" />} 
              label="Marketing" 
              to="/marketing" 
            />
            <SidebarItem 
              icon={<Users className="w-5 h-5" />} 
              label="Meu Plano" 
              to="/plano" 
            />
            <SidebarItem 
              icon={<Settings className="w-5 h-5" />} 
              label="Configurações" 
              to="/configuracoes" 
            />
          </ul>
        </nav>

        <div className="p-4 border-t border-trinks-orange/20">
          <button 
            onClick={toggleSidebar} 
            className="flex items-center justify-center w-full p-2 text-white rounded-md hover:bg-white/10"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : "Recolher Menu"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
