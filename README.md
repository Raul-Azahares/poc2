# POC Asistente Clínico Inteligente

Sistema de transcripción de voz y generación automática de historia clínica estructurada para médicos.

## Características

- 🎤 Captura de voz en tiempo real usando Web Speech API
- 🤖 Procesamiento inteligente con Groq API (LLM gratuito)
- 📋 Generación automática de historia clínica estructurada
- ✏️ Panel editable para revisar y ajustar la información
- 🎨 UI moderna y responsiva con Tailwind CSS

## Tecnologías

- **Next.js 16** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Web Speech API** para transcripción de voz
- **Groq API** para procesamiento de IA (gratuito)

## Requisitos Previos

- Node.js 18+ 
- Navegador compatible con Web Speech API (Chrome, Edge)
- Cuenta en Groq (gratuita)

## Configuración

1. **Clonar e instalar dependencias:**

```bash
npm install
```

2. **Obtener API Key de Groq:**

   - Ve a [https://console.groq.com](https://console.groq.com)
   - Crea una cuenta gratuita
   - Genera una API key

3. **Configurar variables de entorno:**

   - Copia el archivo `.env.example` a `.env.local`
   - Añade tu API key de Groq:

```bash
cp .env.example .env.local
# Edita .env.local y añade tu GROQ_API_KEY
```

## Uso

1. **Iniciar servidor de desarrollo:**

```bash
npm run dev
```

2. **Abrir en el navegador:**

   Visita [http://localhost:3000](http://localhost:3000)

3. **Usar la aplicación:**

   - Haz clic en el botón "Iniciar Grabación"
   - Permite el acceso al micrófono
   - Habla describiendo la consulta médica
   - La transcripción aparecerá en tiempo real
   - Haz clic en "Detener y Procesar"
   - La historia clínica estructurada se generará automáticamente
   - Puedes editar los campos generados

## Estructura del Proyecto

```
poc2/
├── app/
│   ├── api/
│   │   └── process/
│   │       └── route.ts          # API route para procesamiento con Groq
│   ├── components/
│   │   ├── VoiceRecorder.tsx     # Componente de grabación de voz
│   │   └── MedicalRecord.tsx     # Componente de historia clínica
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── .env.local                    # Variables de entorno (no commitear)
├── .env.example                  # Ejemplo de variables de entorno
└── package.json
```

## Deploy en Vercel

1. Conecta tu repositorio a Vercel
2. Añade la variable de entorno `GROQ_API_KEY` en la configuración del proyecto
3. Deploy automático

## Limitaciones del POC

- Sin persistencia de datos (solo en sesión)
- Web Speech API solo funciona en navegadores compatibles (Chrome, Edge)
- Requiere conexión a internet para Groq API
- Sin autenticación de usuarios
- Límite de Groq API: 30 req/min, 14,400 tokens/min (capa gratuita)

## Licencia

MIT
