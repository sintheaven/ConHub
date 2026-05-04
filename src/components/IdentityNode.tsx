import { useState } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { RefreshCw, Terminal, Save, Eye } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export const IdentityNode = () => {
  const { profile, refreshData } = useDashboard();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

  const handleSync = async () => {
    setIsSyncing(true);
    await refreshData();
    // Simulate some extra delay for "terminal effect"
    await new Promise(r => setTimeout(r, 1500));
    setLastSync(new Date().toLocaleTimeString());
    setIsSyncing(false);
  };

  const TerminalPanel = ({ title, content }: { title: string, content: string }) => (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="terminal-header justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-emerald" />
          <span className="text-[11px] uppercase tracking-widest text-muted">{title}</span>
        </div>
        <div className="flex gap-2">
           <Eye size={12} className="text-muted hover:text-emerald cursor-pointer" />
           <Save size={12} className="text-muted hover:text-emerald cursor-pointer" />
        </div>
      </div>
      <div className="terminal-window flex-1 prose prose-invert prose-sm max-w-none prose-emerald">
        {profile ? (
           <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <div className="animate-pulse flex flex-col gap-2">
            <div className="h-2 bg-muted/40 w-3/4 rounded" />
            <div className="h-2 bg-muted/40 w-1/2 rounded" />
            <div className="h-2 bg-muted/40 w-5/6 rounded" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-mono flex items-center gap-2">
          <span className="text-emerald">$</span> IDENTITY_NODE_ORCHESTRATION
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-muted font-mono uppercase">Last Sync: {lastSync}</span>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-4 py-1.5 bg-surface border border-emerald/30 text-emerald text-[11px] uppercase tracking-widest hover:bg-emerald hover:text-obsidian transition-all ${isSyncing ? 'opacity-50 cursor-wait' : ''}`}
          >
            <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'Accessing Node...' : 'Sync Sequence'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TerminalPanel title="Core Identity" content={profile?.coreIdentity || ''} />
        <TerminalPanel title="Tone of Voice" content={profile?.toneOfVoice || ''} />
        <TerminalPanel title="Knowledge Base" content={profile?.knowledgeBase || ''} />
      </div>

      {isSyncing && (
        <div className="bg-surface/50 border border-muted p-2 font-mono text-[10px] text-muted-foreground overflow-hidden">
           <div className="animate-bounce">{'>>'} [LOG] INITIALIZING SECURE TUNNEL TO .252...</div>
           <div className="animate-bounce delay-75">{'>>'} [LOG] HANDSHAKE SUCCESSFUL. RETRIEVING PROFILE BLOB...</div>
           <div className="animate-bounce delay-150">{'>>'} [LOG] DECRYPTING DATA... DONE.</div>
        </div>
      )}
    </section>
  );
};
