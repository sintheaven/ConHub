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
      coreIdentity: `# Profile: ${name}\n\nPrimary Node: .252\nStatus: ACTIVE\n\nExpertise in analytical systems and content orchestration. Dedicated to precision and systemic efficiency.`,
      toneOfVoice: `## Tone Guidelines\n\n- Professional\n- Direct\n- Data-driven\n- Minimalist\n- Authoritative yet accessible`,
      knowledgeBase: `### Active Modules\n\n1. Cybersecurity Trends\n2. Real-time Analytics\n3. Financial Markets\n4. AI Content Strategy`
    });
  });

  // Mock trends for Radar
  app.get("/api/v1/trends", (req, res) => {
    res.json([
      { id: 1, title: "Pavlov Reflex in Immunity", score: 92, context: "Emerging studies suggest neuro-immune connections can be conditioned. Vital for bio-tech niche." },
      { id: 2, title: "Obsidian Aesthetics Growth", score: 78, context: "Shift towards high-contrast, low-eye-strain UI in SaaS. Influencing design systems." },
      { id: 3, title: "Edge Node Decentralization", score: 85, context: "Moving processing to the edge (.252 protocols) reduces latency in content distribution." }
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
