# Progress Calendar Backend - AI Goals 🚀

Backend API con **Gemini Flash Lite** para generar metas personalizadas y planes de acción.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

> Backend Node.js + Express + Gemini AI para la app Progress Calendar

## 🚀 Instalación

```bash
cd /home/alf/Desktop/progress-calendar-backend
npm install
```

## 🏃 Ejecutar

```bash
# Modo normal
npm start

# Modo desarrollo (con auto-reload)
npm run dev
```

El servidor se ejecutará en: `http://localhost:3000`

## 📡 Endpoints

### 1. Info de la API
```bash
GET http://localhost:3000/
```

**Respuesta:**
```json
{
  "status": "ok",
  "message": "Progress Calendar Backend API",
  "endpoints": {...}
}
```

---

### 2. Health Check
```bash
GET http://localhost:3000/health
```

**Respuesta:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-14T10:30:00.000Z"
}
```

---

### 3. Generar Plan de Meta (AI)
```bash
POST http://localhost:3000/api/generate-goal
Content-Type: application/json

{
  "goal": "estar fit",
  "userContext": "Tengo 30 años, nunca he ido al gym"
}
```

**Respuesta:**
```json
{
  "success": true,
  "goal": {
    "goalTitle": "Estar Fit - Plan Principiante",
    "description": "Programa de fitness diseñado para comenzar desde cero",
    "frequency": {
      "type": "weekly",
      "times": 4,
      "unit": "días"
    },
    "plan": {
      "weekly": 4,
      "duration": 45,
      "restDays": 3
    },
    "milestones": [
      { "week": 4, "description": "Completar primer mes sin faltar" },
      { "week": 8, "description": "Notar mejora en resistencia" },
      { "week": 12, "description": "Establecer nueva rutina" }
    ],
    "tips": [
      "Empieza con ejercicios básicos",
      "Hidrátate bien",
      "Descansa lo suficiente"
    ],
    "estimatedSuccess": 75
  },
  "timestamp": "2025-11-14T10:30:00.000Z"
}
```

---

### 4. Chat con AI
```bash
POST http://localhost:3000/api/chat
Content-Type: application/json

{
  "message": "¿Cómo puedo mantener la motivación?",
  "context": "Meta: ir al gym 4x por semana"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "response": "Para mantener la motivación...",
    "suggestedActions": [
      "Establece metas pequeñas semanales",
      "Busca un compañero de gym"
    ]
  },
  "timestamp": "2025-11-14T10:30:00.000Z"
}
```

---

## 🧪 Probar con cURL

### Generar Meta
```bash
curl -X POST http://localhost:3000/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{"goal": "leer más libros"}'
```

### Chat
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Dame consejos para leer más"}'
```

---

## 📝 Ejemplos de Metas

**Fitness:**
- "estar fit"
- "correr un 5k"
- "ganar masa muscular"

**Aprendizaje:**
- "aprender inglés"
- "aprender a programar"
- "tocar guitarra"

**Productividad:**
- "leer más libros"
- "meditar diariamente"
- "despertar temprano"

---

## 🔧 Configuración

Archivo `.env`:
```
GEMINI_API_KEY=AIzaSyDjqSl1g6kvDS-lbMv-Tq20RtTGaNfqnl0
PORT=3000
```

---

## 🛠️ Stack Técnico

- **Node.js** - Runtime
- **Express** - Web framework
- **Gemini Flash Lite** - AI model
- **CORS** - Cross-origin requests
- **dotenv** - Variables de entorno

---

## 📊 Estructura JSON de Respuesta

La AI devuelve metas en este formato:

```typescript
interface Goal {
  goalTitle: string;           // Título de la meta
  description: string;         // Descripción motivadora
  frequency: {
    type: 'daily' | 'weekly' | 'monthly';
    times: number;
    unit: string;
  };
  plan: {
    weekly: number;            // Días por semana
    duration: number;          // Minutos por sesión
    restDays: number;          // Días de descanso
  };
  milestones: Array<{
    week: number;
    description: string;
  }>;
  tips: string[];
  estimatedSuccess: number;    // 0-100
}
```

---

## 🚨 Troubleshooting

### Error: "GEMINI_API_KEY not found"
- Verifica que el archivo `.env` existe
- Verifica que la API key es correcta

### Error: "Cannot connect to Gemini"
- Verifica tu conexión a internet
- Verifica que la API key no haya expirado

### Puerto 3000 en uso
- Cambia `PORT` en `.env` a otro puerto (ej: 3001)

---

## 📞 Testing

Usa Postman, Insomnia o cURL para probar los endpoints.

Archivo de ejemplo para Postman: `tests/postman-collection.json`
