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

// Endpoint para generar metas con AI
app.post('/api/generate-goal', async (req, res) => {
  try {
    const { goal, userContext } = req.body;

    if (!goal) {
      return res.status(400).json({
        error: 'El campo "goal" es requerido'
      });
    }

    // Prompt estructurado para generar plan de meta
    const prompt = `
Eres un asistente experto en planificación de metas personales.
Un usuario quiere: "${goal}"

${userContext ? `Contexto adicional: ${userContext}` : ''}

Genera un plan REALISTA y ACCIONABLE para el resto del año.
Responde ÚNICAMENTE en formato JSON con esta estructura exacta:

{
  "goalTitle": "Título claro de la meta (máx 50 caracteres)",
  "description": "Descripción motivadora (máx 150 caracteres)",
  "frequency": {
    "type": "weekly" o "daily" o "monthly",
    "times": número de veces,
    "unit": "días", "veces", "horas", etc
  },
  "plan": {
    "weekly": número de días por semana (ej: 4),
    "duration": duración en minutos por sesión (ej: 45),
    "restDays": días de descanso recomendados (ej: 3),
    "recommendedDays": ["lunes", "martes", "jueves", "viernes"] // Array con nombres de días en español
  },
  "milestones": [
    { "week": 4, "description": "Primer hito alcanzable" },
    { "week": 8, "description": "Segundo hito" },
    { "week": 12, "description": "Tercer hito" }
  ],
  "tips": [
    "Consejo práctico 1",
    "Consejo práctico 2",
    "Consejo práctico 3"
  ],
  "estimatedSuccess": número entre 0-100 representando probabilidad de éxito
}

Ejemplos:
- "estar fit" → 4 días/semana gym, 45min sesiones
- "leer más" → 20min diarios, 1 libro/mes
- "aprender inglés" → 30min diarios, práctica conversacional 2x/semana

Sé específico, realista y motivador.
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
