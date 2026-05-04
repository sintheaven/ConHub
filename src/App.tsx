/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Sidebar, Header } from './components/Navigation';
import { IdentityNode } from './components/IdentityNode';
import { TrendRadar } from './components/TrendRadar';
import { ContentFactory } from './components/ContentFactory';
import { ContentPlanner } from './components/ContentPlanner';
import { SettingsPage } from './components/Settings';

const DashboardContent = () => {
  const { activeView } = useDashboard();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <IdentityNode />
            <TrendRadar />
            <ContentFactory />
            <ContentPlanner />
          </>
        );
      case 'identity':
        return <IdentityNode />;
      case 'trends':
        return <TrendRadar />;
      case 'factory':
        return <ContentFactory />;
      case 'planner':
        return <ContentPlanner />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <IdentityNode />;
    }
  };

  return (
    <div className="flex bg-obsidian min-h-screen text-white">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto pb-20">
            {renderView()}
          </div>
        </div>

        {/* Footer Status Bar */}
        <footer className="h-6 bg-surface border-t border-muted px-4 flex items-center justify-between text-[9px] font-mono whitespace-nowrap text-muted uppercase tracking-widest overflow-hidden">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald" /> CPU_LOAD: 12.4%</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-cyber" /> NET_TRAFFIC: 254KB/s</span>
            <span className="flex items-center gap-1 font-bold text-cyber animate-pulse">{'>>'} SYSTEM_READY</span>
          </div>
          <div>
            [ PROTOCOL_SECURED_BY_AES256 ]
          </div>
        </footer>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
