import { motion } from 'motion/react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface ContentSlot {
  id: number;
  time: string;
  type: 'Text' | 'Carousel' | 'Video';
  status: 'Published' | 'Queued' | 'Draft';
  title: string;
}

export const ContentPlanner = () => {
  const slots: ContentSlot[] = [
    { id: 1, time: '09:00', type: 'Text', status: 'Published', title: 'The Immunity Reflex' },
    { id: 2, time: '12:30', type: 'Carousel', status: 'Queued', title: 'Obsidian Design Principles' },
    { id: 3, time: '15:00', type: 'Video', status: 'Draft', title: 'Edge Node Explained' },
    { id: 4, time: '18:45', type: 'Text', status: 'Queued', title: 'Bio-tech Intersection' },
    { id: 5, time: '21:00', type: 'Video', status: 'Draft', title: 'Future of Decentralization' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Published': return 'border-emerald text-emerald bg-emerald/5';
      case 'Queued': return 'border-cyber text-cyber bg-cyber/5';
      case 'Draft': return 'border-muted text-muted bg-muted/5';
      default: return 'border-muted text-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Text': return '[T]';
      case 'Carousel': return '[C]';
      case 'Video': return '[V]';
      default: return '[?]';
    }
  };

  return (
    <section className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-muted pb-4">
        <h2 className="text-sm font-mono flex items-center gap-2">
          <span className="text-muted">$</span> CONTENT_SCHEDULER_RIBBON
        </h2>
        <div className="flex items-center gap-4">
          <button className="text-muted hover:text-white"><ChevronLeft size={18} /></button>
          <span className="text-xs font-mono uppercase text-cyber">Monday, May 4</span>
          <button className="text-muted hover:text-white"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-4 min-w-max">
          {slots.map((slot) => (
            <motion.div
              key={slot.id}
              whileHover={{ y: -4 }}
              className={`w-64 border-l-2 p-4 flex flex-col gap-3 group cursor-pointer transition-colors ${getStatusStyle(slot.status)}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold flex items-center gap-1">
                   <Clock size={12} />
                   {slot.time}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest">{getTypeIcon(slot.type)}</span>
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-medium group-hover:underline underline-offset-4">{slot.title}</h4>
              </div>

              <div className="flex items-center justify-between mt-4">
                 <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm border ${getStatusStyle(slot.status)}`}>
                   {slot.status}
                 </span>
                 <div className="h-1 flex-1 mx-2 bg-muted/20 rounded-full overflow-hidden">
                    {slot.status === 'Published' && <div className="h-full w-full bg-emerald" />}
                    {slot.status === 'Queued' && <div className="h-full w-1/2 bg-cyber" />}
                 </div>
              </div>
            </motion.div>
          ))}

          {/* Add Slot Placeholder */}
          <div className="w-64 border border-dashed border-muted p-4 flex items-center justify-center text-muted hover:text-white hover:border-white transition-all cursor-pointer">
             <div className="flex flex-col items-center gap-2">
               <Calendar size={24} className="opacity-20" />
               <span className="text-[10px] uppercase tracking-[0.2em]">New Slot +</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
