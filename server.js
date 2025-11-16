const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Progress Calendar Backend API',
    endpoints: {
      '/api/generate-goal': 'POST - Generar plan de meta con AI',
      '/api/chat': 'POST - Chat general con AI',
      '/health': 'GET - Estado del servidor'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Language configurations
const languageConfig = {
  es: {
    name: 'Spanish',
    days: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    instruction: 'Responde ÚNICAMENTE en ESPAÑOL',
    examples: '- "estar fit" → 4 días/semana gym, 45min sesiones\n- "leer más" → 20min diarios, 1 libro/mes\n- "aprender inglés" → 30min diarios, práctica conversacional 2x/semana'
  },
  en: {
    name: 'English',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    instruction: 'Respond ONLY in ENGLISH',
    examples: '- "get fit" → 4 days/week gym, 45min sessions\n- "read more" → 20min daily, 1 book/month\n- "learn Spanish" → 30min daily, conversation practice 2x/week'
  },
  fr: {
    name: 'French',
    days: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    instruction: 'Répondez UNIQUEMENT en FRANÇAIS',
    examples: '- "être en forme" → 4 jours/semaine gym, 45min sessions\n- "lire plus" → 20min quotidien, 1 livre/mois\n- "apprendre l\'anglais" → 30min quotidien, pratique conversation 2x/semaine'
  },
  pt: {
    name: 'Portuguese',
    days: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'],
    instruction: 'Responda APENAS em PORTUGUÊS',
    examples: '- "ficar em forma" → 4 dias/semana academia, 45min sessões\n- "ler mais" → 20min diários, 1 livro/mês\n- "aprender inglês" → 30min diários, prática conversação 2x/semana'
  },
  it: {
    name: 'Italian',
    days: ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'],
    instruction: 'Rispondi SOLO in ITALIANO',
    examples: '- "mettersi in forma" → 4 giorni/settimana palestra, 45min sessioni\n- "leggere di più" → 20min giornalieri, 1 libro/mese\n- "imparare inglese" → 30min giornalieri, pratica conversazione 2x/settimana'
  },
  de: {
    name: 'German',
    days: ['montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag', 'sonntag'],
    instruction: 'Antworten Sie NUR auf DEUTSCH',
    examples: '- "fit werden" → 4 Tage/Woche Fitnessstudio, 45min Sitzungen\n- "mehr lesen" → 20min täglich, 1 Buch/Monat\n- "Englisch lernen" → 30min täglich, Konversationspraxis 2x/Woche'
  }
};

// Endpoint para generar metas con AI
app.post('/api/generate-goal', async (req, res) => {
  try {
    const { goal, userContext, language = 'es' } = req.body;

    if (!goal) {
      return res.status(400).json({
        error: 'El campo "goal" es requerido'
      });
    }

    // Get language configuration
    const langConfig = languageConfig[language] || languageConfig['es'];
    const daysArray = JSON.stringify(langConfig.days);

    // Prompt estructurado para generar plan de meta
    const prompt = `
You are an expert assistant in personal goal planning.
${langConfig.instruction}

A user wants: "${goal}"

${userContext ? `Additional context: ${userContext}` : ''}

Generate a REALISTIC and ACTIONABLE plan for the rest of the year.
Respond ONLY in JSON format with this exact structure:

{
  "goalTitle": "Clear goal title (max 50 characters) IN ${langConfig.name.toUpperCase()}",
  "shortName": "Very short name for calendar (max 12 characters, NO emoji, e.g: 'Reading', 'Gym', 'Running', 'Yoga') IN ${langConfig.name.toUpperCase()}",
  "description": "Motivational description (max 150 characters) IN ${langConfig.name.toUpperCase()}",
  "emoji": "ONE SINGLE emoji representing this goal (e.g: 📚 for reading, 💪 for gym, 🏃 for running, 🎨 for art, 🧘 for yoga, etc)",
  "frequency": {
    "type": "weekly" or "daily" or "monthly",
    "times": number of times,
    "unit": "days", "times", "hours", etc IN ${langConfig.name.toUpperCase()}
  },
  "plan": {
    "weekly": number of days per week (e.g: 4),
    "duration": duration in minutes per session (e.g: 45),
    "restDays": recommended rest days (e.g: 3),
    "recommendedDays": Array with day names from this list ONLY: ${daysArray}
  },
  "milestones": [
    { "week": 4, "description": "First achievable milestone IN ${langConfig.name.toUpperCase()}" },
    { "week": 8, "description": "Second milestone IN ${langConfig.name.toUpperCase()}" },
    { "week": 12, "description": "Third milestone IN ${langConfig.name.toUpperCase()}" }
  ],
  "tips": [
    "Practical tip 1 IN ${langConfig.name.toUpperCase()}",
    "Practical tip 2 IN ${langConfig.name.toUpperCase()}",
    "Practical tip 3 IN ${langConfig.name.toUpperCase()}"
  ],
  "estimatedSuccess": number between 0-100 representing success probability
}

Examples in ${langConfig.name}:
${langConfig.examples}

Be specific, realistic and motivational. ALL TEXT FIELDS MUST BE IN ${langConfig.name.toUpperCase()}.
`;

    // Llamar a Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Intentar parsear JSON de la respuesta
    let jsonResponse;
    try {
      // Extraer JSON si viene con markdown
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        jsonResponse = JSON.parse(text);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', text);
      return res.status(500).json({
        error: 'Error al procesar respuesta de AI',
        rawResponse: text
      });
    }

    // Responder con el plan generado
    res.json({
      success: true,
      goal: jsonResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en /api/generate-goal:', error);
    res.status(500).json({
      error: 'Error al generar meta',
      message: error.message
    });
  }
});

// Endpoint para chat general
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'El campo "message" es requerido'
      });
    }

    const prompt = `
${context ? `Contexto: ${context}\n\n` : ''}
Usuario: ${message}

Responde de manera concisa y útil. Si es sobre metas o productividad, da consejos accionables.
Responde en formato JSON:
{
  "response": "tu respuesta aquí",
  "suggestedActions": ["acción 1", "acción 2"] // opcional
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Intentar parsear JSON
    let jsonResponse;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      jsonResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : { response: text };
    } catch (parseError) {
      jsonResponse = { response: text };
    }

    res.json({
      success: true,
      data: jsonResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en /api/chat:', error);
    res.status(500).json({
      error: 'Error en chat',
      message: error.message
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 API Key configurada: ${process.env.GEMINI_API_KEY ? 'Sí' : 'No'}`);
  console.log(`\n📝 Endpoints disponibles:`);
  console.log(`   GET  /              - Info de la API`);
  console.log(`   GET  /health        - Health check`);
  console.log(`   POST /api/generate-goal - Generar plan de meta`);
  console.log(`   POST /api/chat      - Chat con AI`);
});
