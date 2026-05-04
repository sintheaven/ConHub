import { Settings as SettingsIcon, Shield, Bell, Database, Cpu } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <section className="p-6 flex flex-col gap-8 max-w-4xl">
      <div className="flex items-center gap-2 border-b border-muted pb-4">
        <h2 className="text-sm font-mono flex items-center gap-2">
          <span className="text-muted">$</span> КОНФИГУРАЦИЯ_СИСТЕМЫ
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-muted p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-emerald mb-2">
            <Shield size={20} />
            <h3 className="text-xs uppercase tracking-widest font-bold">Безопасность</h3>
          </div>
          <div className="flex flex-col gap-4">
             <div className="flex justify-between items-center border-b border-muted/30 pb-2">
               <span className="text-xs text-muted">AES-256 Шифрование</span>
               <div className="w-10 h-5 bg-emerald/20 border border-emerald rounded-full relative p-1 cursor-pointer">
                  <div className="w-3 h-3 bg-emerald rounded-full float-right" />
               </div>
             </div>
             <div className="flex justify-between items-center border-b border-muted/30 pb-2">
               <span className="text-xs text-muted">Двухфакторная аут.</span>
               <div className="w-10 h-5 bg-muted/20 border border-muted rounded-full relative p-1 cursor-pointer">
                  <div className="w-3 h-3 bg-muted rounded-full" />
               </div>
             </div>
          </div>
        </div>

        <div className="bg-surface border border-muted p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-cyber mb-2">
            <Bell size={20} />
            <h3 className="text-xs uppercase tracking-widest font-bold">Уведомления</h3>
          </div>
          <div className="flex flex-col gap-4">
             <div className="flex justify-between items-center border-b border-muted/30 pb-2">
               <span className="text-xs text-muted">Telegram Alert Bot</span>
               <span className="text-[10px] text-cyber font-mono">CONNECTED</span>
             </div>
             <div className="flex justify-between items-center border-b border-muted/30 pb-2">
               <span className="text-xs text-muted">Email Отчеты</span>
               <span className="text-[10px] text-muted font-mono">DISABLED</span>
             </div>
          </div>
        </div>

        <div className="bg-surface border border-muted p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-amber mb-2">
            <Database size={20} />
            <h3 className="text-xs uppercase tracking-widest font-bold">Хранилище данных</h3>
          </div>
          <div className="flex flex-col gap-2">
             <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden mb-2">
                 <div className="h-full w-[65%] bg-amber" />
             </div>
             <div className="flex justify-between text-[9px] font-mono text-muted uppercase">
                <span>Использовано: 6.5 GB</span>
                <span>Доступно: 10 GB</span>
             </div>
          </div>
        </div>

        <div className="bg-surface border border-muted p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-muted-foreground mb-2">
            <Cpu size={20} />
            <h3 className="text-xs uppercase tracking-widest font-bold">Система</h3>
          </div>
          <div className="text-[10px] font-mono text-muted flex flex-col gap-1">
             <div>OS: ContentHub-OS v1.2.0</div>
             <div>KERNEL: 5.15.0-76-generic</div>
             <div>UPTIME: 14h 23m 12s</div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4 mt-4">
         <button className="px-6 py-2 border border-muted text-[10px] uppercase tracking-widest hover:bg-muted hover:text-white transition-all">Сброс</button>
         <button className="px-6 py-2 bg-emerald text-obsidian text-[10px] uppercase font-bold tracking-widest hover:brightness-110 transition-all">Сохранить</button>
      </div>
    </section>
  );
};
