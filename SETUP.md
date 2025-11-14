# 🚀 Setup del Backend

## Paso 1: Instalar Dependencias

```bash
cd /home/alf/Desktop/progress-calendar-backend
npm install
```

**Esto instalará:**
- express (servidor web)
- cors (permitir requests desde otras apps)
- dotenv (variables de entorno)
- @google/generative-ai (Gemini API)
- nodemon (auto-reload en desarrollo)

⏱️ **Tiempo estimado:** 1-2 minutos

---

## Paso 2: Iniciar el Servidor

```bash
npm start
```

**Verás esto:**
```
🚀 Servidor corriendo en http://localhost:3000
📊 API Key configurada: Sí

📝 Endpoints disponibles:
   GET  /              - Info de la API
   GET  /health        - Health check
   POST /api/generate-goal - Generar plan de meta
   POST /api/chat      - Chat con AI
```

---

## Paso 3: Probar los Endpoints

### Opción A: Con cURL (Terminal)

**Test rápido:**
```bash
curl http://localhost:3000/health
```

**Generar una meta:**
```bash
curl -X POST http://localhost:3000/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{"goal": "estar fit"}'
```

### Opción B: Con el script de tests

```bash
./test-requests.sh
```

### Opción C: Con navegador

Abre en tu navegador:
```
http://localhost:3000/
```

---

## 🔍 Verificar que Funciona

1. **El servidor está corriendo:**
   - Verás el mensaje "🚀 Servidor corriendo..."
   - No hay errores en la terminal

2. **La API responde:**
   ```bash
   curl http://localhost:3000/health
   ```
   Debe devolver: `{"status":"ok","timestamp":"..."}`

3. **Gemini está conectado:**
   ```bash
   curl -X POST http://localhost:3000/api/generate-goal \
     -H "Content-Type: application/json" \
     -d '{"goal": "test"}'
   ```
   Debe devolver JSON con un plan de meta

---

## ❌ Solución de Problemas

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error: "EADDRINUSE: address already in use :::3000"
Puerto 3000 ocupado. Cambia el puerto en `.env`:
```
PORT=3001
```

### Error: "API key not configured"
Verifica que `.env` existe y tiene la API key correcta

### Gemini no responde
- Verifica tu conexión a internet
- Verifica que la API key no haya expirado
- Chequea: https://makersuite.google.com/app/apikey

---

## 🎯 Próximos Pasos

Una vez que el backend funciona:

1. ✅ Probar diferentes tipos de metas
2. ✅ Ver las respuestas JSON
3. ✅ Ajustar los prompts si es necesario
4. ⏭️ Integrar con la app Android (siguiente fase)

---

## 📱 Ejemplos de Uso

### Meta: Fitness
```bash
curl -X POST http://localhost:3000/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "estar fit",
    "userContext": "Tengo 25 años, sedentario, quiero empezar"
  }'
```

### Meta: Aprendizaje
```bash
curl -X POST http://localhost:3000/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "aprender inglés",
    "userContext": "Nivel básico, 30 min disponibles al día"
  }'
```

### Meta: Lectura
```bash
curl -X POST http://localhost:3000/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{"goal": "leer más libros"}'
```

---

## 🛑 Detener el Servidor

En la terminal donde corre el servidor:
```
Ctrl + C
```
