# Instrucciones de Configuración - POC Asistente Clínico

## 🚀 Pasos para Configurar y Ejecutar

### 1. Obtener API Key de Groq (GRATUITA)

1. Ve a [https://console.groq.com](https://console.groq.com)
2. Crea una cuenta (es completamente gratuita)
3. Ve a "API Keys" en el menú lateral
4. Haz clic en "Create API Key"
5. Copia la API key generada

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```bash
GROQ_API_KEY=tu_api_key_aqui
```

**Reemplaza** `tu_api_key_aqui` con la API key que obtuviste de Groq.

### 3. Instalar Dependencias (si no están instaladas)

```bash
npm install
```

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

### 5. Abrir en el Navegador

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**IMPORTANTE:** Usa Chrome o Edge, ya que son los únicos navegadores que soportan Web Speech API en español.

## 📝 Cómo Usar la Aplicación

1. **Iniciar Grabación:**
   - Haz clic en el botón verde "🎙️ Iniciar Grabación"
   - Permite el acceso al micrófono cuando el navegador lo solicite

2. **Hablar:**
   - Describe la consulta médica de forma natural
   - Incluye:
     - Datos del paciente (nombre, edad, sexo)
     - Motivo de consulta
     - Antecedentes relevantes
     - Síntomas que presenta
     - Exploración física realizada
     - Diagnóstico o impresión diagnóstica
     - Tratamiento prescrito

3. **Detener y Procesar:**
   - Haz clic en "⏹️ Detener y Procesar"
   - Espera unos segundos mientras la IA procesa la información

4. **Revisar y Editar:**
   - La historia clínica aparecerá estructurada en el panel derecho
   - Puedes editar cualquier campo
   - Puedes añadir o eliminar síntomas

5. **Exportar:**
   - Haz clic en "💾 Exportar" para descargar la historia clínica en formato texto

## 🎯 Ejemplo de Consulta

Puedes probar con este ejemplo:

> "Paciente masculino de 45 años llamado Juan Pérez. Viene por dolor torácico. Tiene antecedentes de hipertensión arterial desde hace 5 años, tratada con enalapril. Refiere dolor opresivo en el pecho que se irradia al brazo izquierdo, de inicio hace 2 horas, acompañado de sudoración y náuseas. A la exploración física: presión arterial 150/95, frecuencia cardíaca 95 por minuto, auscultación cardíaca rítmica sin soplos. Impresión diagnóstica: posible síndrome coronario agudo. Se indica traslado inmediato a urgencias para electrocardiograma y análisis de troponinas. Administrar ácido acetilsalicílico 300 mg vía oral."

## ⚠️ Requisitos y Limitaciones

### Requisitos:
- **Navegador:** Chrome o Edge (versiones recientes)
- **Conexión a Internet:** Necesaria para Groq API
- **Micrófono:** Funcional y con permisos concedidos

### Limitaciones del POC:
- Sin persistencia de datos (no se guardan las historias clínicas)
- Solo funciona con navegadores compatibles con Web Speech API
- Límites de Groq API gratuita: 30 requests/min, 14,400 tokens/min
- Sin autenticación de usuarios
- Sin integración con sistemas hospitalarios

## 🐛 Solución de Problemas

### "Tu navegador no soporta reconocimiento de voz"
- **Solución:** Usa Google Chrome o Microsoft Edge

### "Permiso de micrófono denegado"
- **Solución:** Permite el acceso al micrófono en la configuración del navegador

### "API key de Groq inválida"
- **Solución:** Verifica que hayas copiado correctamente la API key en `.env.local`
- Reinicia el servidor de desarrollo después de crear/editar `.env.local`

### "No se detectó habla"
- **Solución:** Habla más cerca del micrófono o verifica que está funcionando

### "Límite de requests excedido"
- **Solución:** Espera un minuto antes de intentar procesar otra transcripción

## 📦 Estructura del Proyecto

```
poc2/
├── app/
│   ├── api/
│   │   └── process/
│   │       └── route.ts          # API para procesamiento con Groq
│   ├── components/
│   │   ├── VoiceRecorder.tsx     # Componente de grabación
│   │   └── MedicalRecord.tsx     # Componente de historia clínica
│   ├── types/
│   │   └── medical.ts            # Tipos TypeScript
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Página principal
├── .env.local                    # Variables de entorno (CREAR)
├── .env.example
├── package.json
└── README.md
```

## 🚀 Deploy en Vercel

Para desplegar en Vercel (gratuito):

1. Sube tu código a GitHub
2. Conecta tu repositorio en [vercel.com](https://vercel.com)
3. En la configuración del proyecto, añade la variable de entorno:
   - **Name:** `GROQ_API_KEY`
   - **Value:** tu API key de Groq
4. Deploy automático

## 💡 Tips

- **Habla de forma clara y pausada** para mejor reconocimiento
- **Estructura tu discurso** siguiendo el orden: datos del paciente → motivo → antecedentes → síntomas → exploración → diagnóstico → tratamiento
- **Revisa siempre** la información generada antes de usarla
- **Usa nombres ficticios** para las pruebas del POC

## 📞 Soporte

Este es un POC (Proof of Concept) de demostración. Para preguntas técnicas sobre:
- **Next.js:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **Groq API:** [https://console.groq.com/docs](https://console.groq.com/docs)
- **Web Speech API:** [https://developer.mozilla.org/es/docs/Web/API/Web_Speech_API](https://developer.mozilla.org/es/docs/Web/API/Web_Speech_API)

