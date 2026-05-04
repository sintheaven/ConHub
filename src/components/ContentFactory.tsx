import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Factory, Send, Copy, Download, Layers, Monitor, Instagram, MessageSquare } from 'lucide-react';

const TYPEWRITER_SPEED = 15; // ms per char

export const ContentFactory = () => {
  const [topic, setTopic] = useState('');
  const [platforms, setPlatforms] = useState<string[]>(['TG']);
  const [mode, setMode] = useState('Deep Dive Article');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [displayText, setDisplayText] = useState('');

  const terminalRef = useRef<HTMLDivElement>(null);

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    setGeneratedContent('');
    setDisplayText('');

    // Mock content generation
    const mockOutput = `# Расширение темы: ${topic}\n\n## Аннотация\nПересечение современной иммунологии и нейронных путей дает уникальную точку воздействия для контент-стратегии. Понимая павловские реакции в биологических системах, мы можем зеркально отражать их в цифровом распределении.\n\n### Стратегические столпы:\n1. Синхронная активация периферийных узлов\n2. Эстетика с низкой задержкой (Obsidian Deep)\n3. Взаимная контекстная осведомленность\n\n---\n**Оптимизация под платформы:** ${platforms.join(', ')}\n**Режим:** ${mode}\n\n[КОНЕЦ ПЕРЕДАЧИ]`;

    setTimeout(() => {
      setGeneratedContent(mockOutput);
      setIsGenerating(false);
    }, 2000);
  };

  // Typewriter effect
  useEffect(() => {
    if (generatedContent && displayText.length < generatedContent.length) {
      const timer = setTimeout(() => {
        setDisplayText(generatedContent.slice(0, displayText.length + 1));
      }, TYPEWRITER_SPEED);
      return () => clearTimeout(timer);
    }
  }, [generatedContent, displayText]);

  // Scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayText]);

  return (
    <section className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-muted pb-4">
        <h2 className="text-sm font-mono flex items-center gap-2">
          <span className="text-amber">$</span> КОНТЕНТ_ФАБРИКА_V5
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Input Zone */}
        <div className="bg-surface border border-muted p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-muted uppercase tracking-widest font-mono">Тема / Контекст</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Введите вектор нарратива..."
              className="bg-obsidian border border-muted p-3 text-sm font-mono focus:border-amber transition-colors outline-none text-amber"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] text-muted uppercase tracking-widest font-mono font-bold">Целевые платформы</label>
              <div className="flex gap-3">
                {[
                  { id: 'TG', icon: MessageSquare },
                  { id: 'Insta', icon: Instagram },
                  { id: 'VK', icon: Monitor }
                ].map(plat => (
                  <button
                    key={plat.id}
                    onClick={() => togglePlatform(plat.id)}
                    className={`p-2 border transition-all ${platforms.includes(plat.id) ? 'border-amber bg-amber/10 text-amber' : 'border-muted text-muted'}`}
                  >
                    <plat.icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-muted uppercase tracking-widest font-mono font-bold">Режим генерации</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="bg-obsidian border border-muted p-2 text-xs font-mono text-white outline-none focus:border-amber"
              >
                <option>Глубокая статья</option>
                <option>Логика карусели</option>
                <option>Сценарий видео</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className="mt-4 flex items-center justify-center gap-3 bg-amber/10 border border-amber/40 text-amber py-3 text-sm font-mono uppercase tracking-[0.2em] hover:bg-amber hover:text-obsidian transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <Layers size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            {isGenerating ? 'Синтез данных...' : 'Запустить двигатель'}
          </button>
        </div>

        {/* Terminal Output */}
        <div className="flex flex-col">
          <div className="terminal-header justify-between">
            <div className="flex items-center gap-2">
              <Factory size={14} className="text-amber" />
              <span className="text-[11px] uppercase tracking-widest text-muted">Вывод терминала фабрики</span>
            </div>
            <div className={`flex items-center gap-1 ${isGenerating ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
               <span className="text-[9px] text-amber animate-pulse">ГЕНЕРАЦИЯ КОНТЕНТА...</span>
            </div>
          </div>
          <div
            ref={terminalRef}
            className="terminal-window h-[300px] flex-1 whitespace-pre-wrap relative"
          >
            {displayText ? (
              <div className="cursor-blink">
                {displayText}
              </div>
            ) : (
              <div className="text-muted/30 italic flex items-center justify-center h-full flex-col gap-4">
                 <Monitor size={48} className="opacity-10" />
                 <span className="text-xs uppercase tracking-tighter">Ожидание входного сигнала...</span>
              </div>
            )}
          </div>
          <div className="bg-surface border-x border-b border-muted p-2 flex justify-end gap-3">
             <button className="flex items-center gap-1 text-[10px] text-muted hover:text-amber transition-colors uppercase">
               <Copy size={12} /> Копировать
             </button>
             <button className="flex items-center gap-1 text-[10px] text-muted hover:text-amber transition-colors uppercase">
               <Download size={12} /> Экспорт PDF
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};
