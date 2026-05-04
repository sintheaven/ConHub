/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DashboardProvider } from './context/DashboardContext';
import { Sidebar, Header } from './components/Navigation';
import { IdentityNode } from './components/IdentityNode';
import { TrendRadar } from './components/TrendRadar';
import { ContentFactory } from './components/ContentFactory';
import { ContentPlanner } from './components/ContentPlanner';

export default function App() {
  return (
    <DashboardProvider>
      <div className="flex bg-obsidian min-h-screen text-white">
        <Sidebar />
        
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <Header />
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-[1600px] mx-auto pb-20">
              {/* Module A: Identity Node */}
              <IdentityNode />
              
              <div className="grid grid-cols-1 gap-4">
                 {/* Module B: Trend Radar */}
                 <TrendRadar />
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Module C: Content Factory (Inside Grid or Full Width?) Let's do Full and Grid combinations */}
                 </div>
                 
                 <ContentFactory />
                 
                 {/* Module D: Content Planner */}
                 <ContentPlanner />
              </div>
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
    </DashboardProvider>
  );
}
