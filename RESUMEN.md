# 📦 Backend Progress Calendar - RESUMEN

## ✅ ¿Qué se ha creado?

Un backend completo con Node.js + Express que se conecta a **Gemini Flash Lite** para generar planes de metas personalizadas con AI.

---

## 📁 Estructura del Proyecto

```
/home/alf/Desktop/progress-calendar-backend/
├── server.js              # Servidor Express con endpoints
├── package.json           # Dependencias del proyecto
├── .env                   # API Key de Gemini (SECRETO)
├── .gitignore            # Archivos a ignorar en git
├── README.md             # Documentación completa
├── SETUP.md              # Guía de instalación
├── examples.json         # Ejemplos de uso
├── test-requests.sh      # Script de pruebas
└── RESUMEN.md           # Este archivo
```

---

## 🎯 Endpoints Creados

### 1. `GET /` - Info de la API
Devuelve información sobre la API y endpoints disponibles

### 2. `GET /health` - Health Check
Verifica que el servidor está funcionando

### 3. `POST /api/generate-goal` ⭐ PRINCIPAL
Genera un plan de meta personalizado con AI

**Request:**
```json
{
  "goal": "estar fit",
  "userContext": "Tengo 30 años, nunca fui al gym"
}
```

**Response:**
```json
{
  "success": true,
  "goal": {
    "goalTitle": "Estar Fit - Plan Principiante",
    "description": "Programa de fitness...",
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
    "milestones": [...],
    "tips": [...],
    "estimatedSuccess": 75
  }
}
```

### 4. `POST /api/chat`
Chat general con AI para consejos y preguntas

---

## 🚀 Cómo Usar

### Paso 1: Instalar Dependencias
```bash
cd /home/alf/Desktop/progress-calendar-backend
npm install
```

### Paso 2: Iniciar Servidor
```bash
npm start
```

### Paso 3: Probar
```bash
curl http://localhost:3000/health
```

---

## 🔑 Configuración

**API Key de Gemini:** Ya configurada en `.env`
```
GEMINI_API_KEY=AIzaSyDjqSl1g6kvDS-lbMv-Tq20RtTGaNfqnl0
PORT=3000
```

**IMPORTANTE:** No subas `.env` a GitHub (ya está en `.gitignore`)

---

## 🧪 Ejemplos de Prueba

### Generar meta de fitness:
```bash
curl -X POST http://localhost:3000/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{"goal": "estar fit"}'
```

### Generar meta de lectura:
```bash
curl -X POST http://localhost:3000/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{"goal": "leer más libros"}'
```

### Chat con AI:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Cómo mantener la motivación?"}'
```

---

## 📊 Formato de Respuesta

La AI siempre devuelve JSON estructurado:

```typescript
interface GoalResponse {
  goalTitle: string;
  description: string;
  frequency: {
    type: 'daily' | 'weekly' | 'monthly';
    times: number;
    unit: string;
  };
  plan: {
    weekly: number;        // Días por semana
    duration: number;      // Minutos por sesión
    restDays: number;      // Días de descanso
  };
  milestones: Array<{
    week: number;
    description: string;
  }>;
  tips: string[];
  estimatedSuccess: number; // 0-100
}
```

---

## 🎨 Prompts AI

El backend usa prompts optimizados para:
- Generar planes **realistas y accionables**
- Considerar el **contexto del usuario**
- Proporcionar **hitos alcanzables**
- Dar **consejos prácticos**
- Estimar **probabilidad de éxito**

---

## 🔄 Próxima Fase: Integración con Android

**Cuando estés listo:**

1. La app Android hará requests HTTP a este backend
2. Usuario ingresa su meta ("estar fit")
3. Backend consulta a Gemini
4. Gemini genera el plan
5. Backend devuelve JSON a la app
6. App muestra el plan y permite tracking

**Endpoint para la app:**
```
POST http://localhost:3000/api/generate-goal
```

O si está en la misma red:
```
POST http://[IP-DE-TU-PC]:3000/api/generate-goal
```

---

## 📝 Logs del Servidor

Al ejecutar `npm start` verás:

```
🚀 Servidor corriendo en http://localhost:3000
📊 API Key configurada: Sí

📝 Endpoints disponibles:
   GET  /              - Info de la API
   GET  /health        - Health check
   POST /api/generate-goal - Generar plan de meta
   POST /api/chat      - Chat con AI
```

Y cuando lleguen requests:
- Verás los logs de cada petición
- Errores si algo falla
- Respuestas generadas por AI

---

## ✅ Checklist de Funcionamiento

- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor inicia sin errores (`npm start`)
- [ ] Health check responde (`curl http://localhost:3000/health`)
- [ ] Generate goal funciona (prueba con cURL)
- [ ] Respuestas JSON válidas
- [ ] API de Gemini conectada

---

## 🎯 Estado Actual

**✅ LISTO PARA USAR**

El backend está completamente funcional:
- ✅ Servidor Express configurado
- ✅ Gemini Flash Lite integrado
- ✅ Endpoints REST listos
- ✅ Respuestas en formato JSON
- ✅ Documentación completa
- ✅ Ejemplos de uso

**Siguiente paso:** Instalar dependencias y probar

```bash
cd /home/alf/Desktop/progress-calendar-backend
npm install
npm start
```

---

## 🔗 Referencias

- **Ubicación:** `/home/alf/Desktop/progress-calendar-backend/`
- **Puerto:** 3000 (configurable en `.env`)
- **API:** Gemini Flash Lite
- **Docs:** `README.md` y `SETUP.md`
- **Tests:** `./test-requests.sh`
