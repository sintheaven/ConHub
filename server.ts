import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API for Identity Node
  app.get("/api/v1/profile/:name", (req, res) => {
    const { name } = req.params;
    res.json({
      name,
      coreIdentity: `# Профиль: ${name}\n\nОсновной узел: .252\nСтатус: АКТИВЕН\n\nЭксперт в аналитических системах и оркестрации контента. Нацелен на точность и системную эффективность.`,
      toneOfVoice: `## Рекомендации по тону\n\n- Профессиональный\n- Прямой\n- Основанный на данных\n- Минималистичный\n- Авторитетный, но доступный`,
      knowledgeBase: `### Активные модули\n\n1. Тренды кибербезопасности\n2. Аналитика в реальном времени\n3. Финансовые рынки\n4. Контент-стратегии ИИ`
    });
  });

  // Mock trends for Radar
  app.get("/api/v1/trends", (req, res) => {
    res.json([
      { id: 1, title: "Рефлекс Павлова в иммунитете", score: 92, context: "Новые исследования показывают, что нейро-иммунные связи могут быть обусловлены. Критически важно для ниши био-теха." },
      { id: 2, title: "Рост эстетики Obsidian", score: 78, context: "Сдвиг в сторону высококонтрастных интерфейсов с низкой нагрузкой на зрение в SaaS." },
      { id: 3, title: "Децентрализация периферийных узлов", score: 85, context: "Перенос обработки на узлы (протоколы .252) снижает задержку при распределении контента." }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
