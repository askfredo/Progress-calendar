#!/bin/bash

echo "🧪 Probando Backend Progress Calendar API"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URL base
BASE_URL="http://localhost:3000"

echo -e "${BLUE}1. Health Check${NC}"
curl -s $BASE_URL/health | json_pp
echo ""
echo ""

echo -e "${BLUE}2. Info de la API${NC}"
curl -s $BASE_URL/ | json_pp
echo ""
echo ""

echo -e "${BLUE}3. Generar Meta: Estar Fit${NC}"
curl -s -X POST $BASE_URL/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{"goal": "estar fit", "userContext": "Principiante, nunca fui al gym"}' \
  | json_pp
echo ""
echo ""

echo -e "${BLUE}4. Generar Meta: Leer Más${NC}"
curl -s -X POST $BASE_URL/api/generate-goal \
  -H "Content-Type: application/json" \
  -d '{"goal": "leer más libros"}' \
  | json_pp
echo ""
echo ""

echo -e "${BLUE}5. Chat con AI${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Cómo puedo mantener la motivación?", "context": "Meta: gym 4x semana"}' \
  | json_pp
echo ""
echo ""

echo -e "${GREEN}✅ Tests completados${NC}"
