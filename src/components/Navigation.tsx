import { motion } from 'motion/react';
import {
  LayoutDashboard,
  UserCircle,
  Radar,
  Factory,
  CalendarDays,
  Settings,
  MoreVertical,
  Activity
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export const Sidebar = () => {
  const { activeView, setActiveView } = useDashboard();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Дашборд', id: 'dashboard' },
    { icon: UserCircle, label: 'Identity Node', id: 'identity' },
    { icon: Radar, label: 'Trend Radar', id: 'trends' },
    { icon: Factory, label: 'Фабрика', id: 'factory' },
    { icon: CalendarDays, label: 'Планировщик', id: 'planner' },
    { icon: Settings, label: 'Настройки', id: 'settings' },
  ];

  return (
    <aside className="w-16 h-screen bg-surface border-r border-muted flex flex-col items-center py-6 gap-8 z-50">
      <div className="text-emerald hover:scale-110 transition-transform cursor-pointer">
        <Activity size={28} />
      </div>

      <nav className="flex flex-col gap-6 flex-1">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`group relative cursor-pointer transition-colors ${activeView === item.id ? 'text-emerald' : 'text-muted hover:text-emerald'}`}
          >
            <item.icon size={24} />
            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-muted text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100]">
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      <div className="text-muted hover:text-white cursor-pointer transition-colors pb-4">
        <MoreVertical size={20} />
      </div>
    </aside>
  );
};

export const Header = () => {
  const { currentProfileName, statusNode252, statusNode188 } = useDashboard();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-emerald shadow-[0_0_8px_#00FF41]';
      case 'offline': return 'bg-red-500';
      case 'connecting': return 'bg-amber animate-pulse';
      default: return 'bg-muted';
    }
  };

  return (
    <header className="h-14 border-b border-muted bg-obsidian flex items-center justify-between px-6 sticky top-0 z-40 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-surface border border-muted rounded-sm">
          <span className="text-[10px] text-muted uppercase tracking-tighter">Активный профиль</span>
          <span className="text-cyber font-mono text-sm font-medium">{currentProfileName}</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted uppercase">Узел .252</span>
            <div className={`w-2 h-2 rounded-full ${getStatusColor(statusNode252)} transition-colors duration-500`} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted uppercase">Узел .188</span>
            <div className={`w-2 h-2 rounded-full ${getStatusColor(statusNode188)} transition-colors duration-500`} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-muted">04.05.2026</div>
            <div className="text-[10px] font-mono text-emerald">18:21:30 МСК</div>
          </div>
          <div className="w-8 h-8 rounded-full border border-emerald overflow-hidden bg-surface">
             <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=Olga`} alt="User avatar" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </header>
  );
};
