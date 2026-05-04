import { motion } from 'motion/react';
import { Radar, ArrowUpRight, Zap, Share2 } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export const TrendRadar = () => {
  const { trends } = useDashboard();

  return (
    <section className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-muted pb-4">
        <h2 className="text-sm font-mono flex items-center gap-2">
          <span className="text-cyber">$</span> TREND_RADAR_SCAN
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted uppercase">Scanning Frequency:</span>
          <span className="text-[10px] text-cyber font-mono">1.2THz</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-surface border border-muted p-5 hover:border-cyber/50 transition-colors group relative overflow-hidden"
          >
            {/* Background score accent */}
            <div className="absolute top-0 right-0 p-4 font-mono text-4xl text-muted/10 font-black select-none group-hover:text-cyber/10 transition-colors">
              {trend.score}
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-cyber font-mono flex items-center gap-1 uppercase tracking-widest">
                <Radar size={12} />
                Niche_{trend.id}
              </span>
              <div className="flex items-center gap-2 text-muted">
                 <Share2 size={14} className="hover:text-white cursor-pointer" />
              </div>
            </div>

            <h3 className="text-lg font-medium mb-2 group-hover:text-cyber transition-colors">{trend.title}</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              {trend.context}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-muted/50">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted uppercase tracking-tighter">Impact Score</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1 w-24 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${trend.score}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-full bg-cyber"
                    />
                  </div>
                  <span className="text-xs text-cyber font-mono">{trend.score}</span>
                </div>
              </div>

              <button className="flex items-center gap-2 px-3 py-1.5 bg-cyber/10 border border-cyber/30 text-cyber text-[10px] uppercase tracking-widest hover:bg-cyber hover:text-obsidian transition-all group-hover:scale-105 active:scale-95">
                <Zap size={10} />
                Deploy
                <ArrowUpRight size={10} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
