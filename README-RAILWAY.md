# 🚂 Deploy en Railway - Progress Calendar Backend

## 🚀 Despliegue Rápido

### Opción 1: Deploy Directo desde GitHub

1. **Conecta tu cuenta de Railway con GitHub:**
   - Ve a: https://railway.app/
   - Login con GitHub
   - Autoriza Railway

2. **Crea un nuevo proyecto:**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Elige: `askfredo/Progress-calendar`

3. **Configura las variables de entorno:**
   - En el dashboard de Railway, ve a "Variables"
   - Agrega:
     ```
     GEMINI_API_KEY=AIzaSyDjqSl1g6kvDS-lbMv-Tq20RtTGaNfqnl0
     PORT=3000
     ```

4. **Deploy automático:**
   - Railway detectará `package.json` automáticamente
   - Ejecutará `npm install` y `npm start`
   - En ~2 minutos tu backend estará live

---

## 🔧 Configuración Railway

### Variables de Entorno Requeridas

```
GEMINI_API_KEY=tu_api_key_aqui
PORT=3000
```

### Start Command

Railway detectará automáticamente:
```bash
npm start
```

O puedes configurarlo manualmente en Settings:
- **Build Command:** `npm install`
- **Start Command:** `npm start`

---

## 🌐 URL de Producción

Una vez desplegado, Railway te dará una URL tipo:
```
https://progress-calendar-production.up.railway.app
```

Tus endpoints serán:
```
GET  https://tu-app.railway.app/
GET  https://tu-app.railway.app/health
POST https://tu-app.railway.app/api/generate-goal
POST https://tu-app.railway.app/api/chat
```

---

## 🧪 Probar en Producción

```bash
# Health check
curl https://tu-app.railway.app/health

# Generar meta
curl -X POST https://tu-app.railway.app/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{"goal": "estar fit"}'
```

---

## 📊 Monitoreo

Railway provee:
- ✅ Logs en tiempo real
- ✅ Métricas de CPU/RAM
- ✅ Reinicio automático si falla
- ✅ HTTPS automático

---

## 💰 Costos

Railway ofrece:
- **$5 USD gratis/mes** (suficiente para empezar)
- Luego: ~$5-10/mes dependiendo del uso

**Nota:** Gemini Flash Lite tiene cuota gratuita generosa.

---

## 🔄 CI/CD Automático

Cada push a GitHub despliega automáticamente:
```bash
git push origin main
# → Railway detecta el push
# → Ejecuta npm install
# → Ejecuta npm start
# → Deploy en ~1-2 min
```

---

## 🔒 Seguridad

### ✅ Cosas que Railway maneja automáticamente:
- HTTPS/SSL
- Variables de entorno encriptadas
- Reinicio automático
- Firewall

### ⚠️ TU responsabilidad:
- Nunca subir `.env` a GitHub (ya está en `.gitignore`)
- Rotar API keys periódicamente
- Monitorear uso de Gemini API

---

## 📱 Integrar con App Android

Una vez desplegado, actualiza la URL en tu app:

**Antes (desarrollo local):**
```kotlin
const val BASE_URL = "http://localhost:3000"
```

**Después (producción):**
```kotlin
const val BASE_URL = "https://tu-app.railway.app"
```

---

## 🐛 Troubleshooting

### Error: "Application failed to respond"
- Verifica que `PORT` esté en variables de entorno
- Railway asigna puerto dinámico, usa `process.env.PORT`

### Error: "Gemini API key not found"
- Verifica que `GEMINI_API_KEY` esté en variables de Railway
- No debe tener espacios ni comillas

### Logs no aparecen
- Ve a: Railway Dashboard → Tu servicio → Logs
- Filtro por tipo: `deployments`, `app`, `build`

### Deploy lento
- Primera vez toma ~3-5 minutos (descarga dependencias)
- Siguientes deploys: ~1-2 minutos

---

## 📈 Escalabilidad

Railway escala automáticamente si:
- Recibes mucho tráfico
- Necesitas más recursos

**Plan Hobby:** 1GB RAM, suficiente para 100-1000 requests/día
**Plan Pro:** Escalable según necesidad

---

## 🎯 Checklist de Deploy

- [ ] Repositorio en GitHub
- [ ] Railway conectado a GitHub
- [ ] Variables de entorno configuradas
- [ ] Primer deploy exitoso
- [ ] Health check funciona
- [ ] Generate goal funciona
- [ ] URL guardada para la app

---

## 📞 Soporte Railway

- Docs: https://docs.railway.app/
- Discord: https://discord.gg/railway
- Status: https://status.railway.app/

---

## 🚀 Próximos Pasos

1. Deploy en Railway
2. Guardar URL de producción
3. Probar endpoints
4. Integrar URL en app Android
5. Monitorear uso y logs

---

**Una vez desplegado, tu backend estará 24/7 disponible para la app!** 🎉
