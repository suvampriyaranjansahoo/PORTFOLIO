import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  // Lazy initialize Gemini client
  let genAI: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!genAI && process.env.GEMINI_API_KEY) {
      genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return genAI;
  }

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
  });

  // JD Analysis endpoint powered by Gemini
  app.post('/api/analyze-jd', async (req, res) => {
    try {
      const { jobDescription, targetRoleTitle } = req.body;

      if (!jobDescription || typeof jobDescription !== 'string') {
        return res.status(400).json({ error: 'Job description text is required' });
      }

      const client = getGeminiClient();

      if (!client) {
        // Fallback response with intelligent matching heuristics if GEMINI_API_KEY is not configured
        const text = jobDescription.toLowerCase();
        const keywords = [
          'sql', 'python', 'power bi', 'dax', 'tableau', 'rice', 'analytics', 
          'azure', 'etl', 'machine learning', 'churn', 'dashboard', 'xgboost', 
          'product', 'r', 'excel', 'spark', 'pyspark', 'fastapi', 'shap', 'rfm'
        ];
        const matchedKeywords = keywords.filter(k => text.includes(k));
        const calculatedScore = Math.min(Math.max(Math.round((matchedKeywords.length / 7) * 100), 78), 98);

        return res.json({
          matchScore: calculatedScore,
          suggestedRole: targetRoleTitle || 'Data & Product Analyst',
          candidatePitch: `Strong technical match with verified experience across ${matchedKeywords.slice(0, 3).map(k => k.toUpperCase()).join(', ') || 'SQL, Data Analytics, and Product Metrics'}, demonstrated in enterprise delivery at VOIS and production ML projects.`,
          matchedSkills: matchedKeywords.length > 0 
            ? matchedKeywords.slice(0, 6).map(k => k.toUpperCase()) 
            : ['SQL & Query Optimization', 'Power BI & DAX', 'Data Quality Auditing', 'Exploratory Data Analysis', 'Python & Pandas', 'Stakeholder Presentations'],
          recommendedCaseStudy: text.includes('product') || text.includes('rice') 
            ? 'prioritype' 
            : text.includes('churn') || text.includes('segment') 
            ? 'customer_segmentation' 
            : text.includes('stream') || text.includes('azure') || text.includes('iot')
            ? 'mediflow_rt'
            : 'financial_distress',
          strengths: [
            'Direct hands-on experience with SQL CTE validation & data cleaning at enterprise scale',
            'Strong business & product acumen with quantitative decision frameworks (RICE, RFM, CLV)',
            'Production AI/ML and real-time data streaming architecture experience'
          ]
        });
      }

      const prompt = `You are an expert technical talent evaluator and ATS matching specialist.
Analyze this Job Description against candidate Suvam Priyaranjan Sahoo (Data, Product & Business Analytics professional with experience at Vodafone VOIS, expertise in SQL CTEs, Power BI/DAX, Python, PySpark, Azure Stream Analytics, XGBoost, and RICE product prioritization).

Job Description:
"""${jobDescription.slice(0, 4000)}"""

Respond strictly with valid JSON conforming to this schema:
{
  "matchScore": number (integer between 75 and 99 representing percentage alignment),
  "suggestedRole": string (e.g., "Product Analyst", "Business Analyst", "Data Analyst", "Data Engineer", or "AI Engineer"),
  "candidatePitch": string (concise 2-sentence tailored recruiter pitch highlighting how Suvam's background directly solves this role's needs),
  "matchedSkills": array of 4 to 6 strings (concrete technical & functional skills from Suvam's background that match this JD),
  "recommendedCaseStudy": string (one of: "customer_segmentation", "financial_distress", "prioritype", "mediflow_rt"),
  "strengths": array of 3 strings (bullet points summarizing core strengths for this position)
}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);

      return res.json({
        matchScore: parsed.matchScore || 92,
        suggestedRole: parsed.suggestedRole || 'Data & Product Analytics Specialist',
        candidatePitch: parsed.candidatePitch || 'Proven track record of turning complex business requirements and large-scale data into actionable decision models.',
        matchedSkills: Array.isArray(parsed.matchedSkills) && parsed.matchedSkills.length > 0
          ? parsed.matchedSkills
          : ['SQL & Query Optimization', 'Power BI & DAX', 'Predictive Modeling', 'Customer Analytics'],
        recommendedCaseStudy: ['customer_segmentation', 'financial_distress', 'prioritype', 'mediflow_rt'].includes(parsed.recommendedCaseStudy)
          ? parsed.recommendedCaseStudy
          : 'prioritype',
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : []
      });
    } catch (error: any) {
      console.error('Error analyzing JD with Gemini:', error);
      return res.status(500).json({
        error: 'Failed to analyze job description',
        details: error?.message || 'Unknown error'
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
