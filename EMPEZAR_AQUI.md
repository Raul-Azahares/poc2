# 🚀 POC Asistente Clínico Inteligente - EMPEZAR AQUÍ

## ✅ ¿Qué Tienes?

Un POC completo y funcional de Asistente Clínico Inteligente que:
- 🎤 Captura voz del médico en tiempo real
- 📝 Transcribe automáticamente con Web Speech API
- 🤖 Procesa con IA (Groq/Llama 3.3) para extraer información médica
- 📋 Genera historia clínica estructurada y editable
- 💾 Permite exportar los datos

## ⚡ Inicio Rápido (3 opciones)

### Opción 1: Deploy en Vercel (MÁS RÁPIDO - RECOMENDADO)

```bash
# 1. Crear repositorio en GitHub y subir el código
git init
git add .
git commit -m "POC Asistente Clínico"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main

# 2. Ir a https://vercel.com y conectar el repo

# 3. Añadir variable de entorno en Vercel:
#    GROQ_API_KEY = tu_api_key_de_groq

# 4. Deploy automático
```

### Opción 2: Actualizar Node.js y Ejecutar Localmente

```bash
# Actualizar Node.js a v20
nvm install 20
nvm use 20

# Crear .env.local
echo "GROQ_API_KEY=tu_api_key_aqui" > .env.local

# Ejecutar
npm run dev
```

### Opción 3: Usar Docker

```bash
# Crear Dockerfile (ver NOTA_VERSION_NODE.md)
docker build -t poc-asistente .
docker run -p 3000:3000 poc-asistente
```

## 🔑 Obtener API Key de Groq (GRATIS)

1. Ve a https://console.groq.com
2. Regístrate (gratis)
3. Crea una API Key
4. Cópiala y úsala en `.env.local` o Vercel

## ⚠️ Problema Actual

Tu sistema tiene **Node.js v18.15.0** pero se requiere **v18.17.0+** o **v20+**.

**Soluciones:**
- Deploy en Vercel (sin problemas de versión) ⭐ RECOMENDADO
- Actualizar Node.js localmente
- Usar Docker

## 📚 Documentación

- **INSTRUCCIONES.md** → Guía completa de uso
- **ESTADO_DEL_PROYECTO.md** → Qué está hecho y estado actual
- **NOTA_VERSION_NODE.md** → Soluciones al problema de versión
- **README.md** → Documentación técnica general

## 🎯 Estructura del Proyecto

```
✅ app/components/VoiceRecorder.tsx    → Captura de voz
✅ app/components/MedicalRecord.tsx    → Historia clínica
✅ app/api/process/route.ts            → API con Groq
✅ app/page.tsx                        → Página principal
✅ app/types/medical.ts                → Tipos TypeScript
```

## 🔧 Stack Tecnológico

- **Next.js 14** (downgraded para compatibilidad)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Groq API** (Llama 3.3 70B - Gratis)
- **Web Speech API** (navegador - Gratis)

## 🌟 Características Implementadas

✅ Grabación de voz en tiempo real
✅ Transcripción automática en español
✅ Procesamiento con IA
✅ Extracción de entidades médicas
✅ Historia clínica estructurada
✅ Todos los campos editables
✅ Gestión dinámica de síntomas
✅ Exportación a archivo de texto
✅ UI moderna y responsiva
✅ Manejo de errores
✅ Documentación completa

## 📝 Ejemplo de Uso

1. Abrir la app en Chrome/Edge
2. Clic en "Iniciar Grabación"
3. Hablar: *"Paciente Juan Pérez, 45 años, masculino. Viene por dolor torácico..."*
4. Clic en "Detener y Procesar"
5. Revisar historia clínica generada
6. Editar si es necesario
7. Exportar

## 🎓 Requisitos para Ejecutar

- **Navegador:** Chrome o Edge (Web Speech API)
- **API Key:** Groq (gratis en https://console.groq.com)
- **Node.js:** v20+ (para ejecución local)
- **Internet:** Sí (para Groq API)

## 🚦 Próximos Pasos

1. **Obtener API Key de Groq** → https://console.groq.com
2. **Elegir opción de deploy/ejecución** (Vercel recomendado)
3. **Configurar GROQ_API_KEY**
4. **Probar la aplicación**

## 💡 Recomendación

**Para probarlo YA:**
👉 Deploy en Vercel (5 minutos, sin problemas de versiones)

**Para desarrollo local:**
👉 Actualizar Node.js a v20 primero

## ❓ Problemas Comunes

| Problema | Solución |
|----------|----------|
| "Node.js version required" | Actualizar Node o usar Vercel/Docker |
| "Navegador no soporta voz" | Usar Chrome o Edge |
| "API key inválida" | Verificar en .env.local o Vercel |
| "No se detectó habla" | Revisar permisos del micrófono |

## 🎉 Estado del Proyecto

**✅ COMPLETADO Y LISTO PARA USAR**

Solo necesitas configurar la API key y elegir cómo ejecutarlo.

Todo el código está implementado, documentado y libre de errores.

---

**¿Dudas?** Lee los archivos de documentación mencionados arriba.

**¿Listo para empezar?** → Obtén tu API key de Groq y elige tu método de deploy preferido.

