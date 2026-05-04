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
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: UserCircle, label: 'Identity Node', id: 'identity' },
    { icon: Radar, label: 'Trend Radar', id: 'trends' },
    { icon: Factory, label: 'Factory', id: 'factory' },
    { icon: CalendarDays, label: 'Planner', id: 'planner' },
    { icon: Settings, label: 'Settings', id: 'settings' },
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
            className="group relative cursor-pointer text-muted hover:text-emerald transition-colors"
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
          <span className="text-[10px] text-muted uppercase tracking-tighter">Active Profile</span>
          <span className="text-cyber font-mono text-sm font-medium">{currentProfileName}</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted uppercase">Node .252</span>
            <div className={`w-2 h-2 rounded-full ${getStatusColor(statusNode252)} transition-colors duration-500`} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted uppercase">Node .188</span>
            <div className={`w-2 h-2 rounded-full ${getStatusColor(statusNode188)} transition-colors duration-500`} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-muted">04.05.2026</div>
            <div className="text-[10px] font-mono text-emerald">18:21:30 UTC</div>
          </div>
          <div className="w-8 h-8 rounded-full border border-emerald overflow-hidden bg-surface">
             <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=Olga`} alt="User avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};
