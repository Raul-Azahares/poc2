import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim() === '') {
      return NextResponse.json(
        { error: 'No se proporcionó transcripción' },
        { status: 400 }
      );
    }

    // Prompt especializado para extraer información médica estructurada
    const prompt = `Eres un asistente médico especializado en estructurar historias clínicas. 
Analiza la siguiente transcripción de una consulta médica y extrae la información en formato JSON estructurado.

TRANSCRIPCIÓN:
${transcript}

Devuelve SOLO un objeto JSON válido con la siguiente estructura (sin markdown, sin texto adicional):
{
  "paciente": {
    "nombre": "nombre del paciente o 'No especificado' si no se menciona",
    "edad": "edad o 'No especificada' si no se menciona",
    "sexo": "sexo o 'No especificado' si no se menciona"
  },
  "motivoConsulta": "razón principal de la consulta",
  "antecedentes": "antecedentes médicos relevantes o 'Sin antecedentes mencionados'",
  "sintomas": ["lista", "de", "síntomas", "identificados"],
  "exploracionFisica": "hallazgos de la exploración física o 'No especificada'",
  "diagnostico": "diagnóstico o impresión diagnóstica",
  "tratamiento": "plan de tratamiento, medicamentos, indicaciones",
  "observaciones": "notas adicionales o seguimiento recomendado"
}

Si no encuentras información para algún campo, usa valores por defecto apropiados pero siempre devuelve el JSON completo.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente médico experto que estructura historias clínicas. Siempre respondes en formato JSON válido sin markdown ni texto adicional.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile', // Modelo gratuito de Groq
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    // Parsear la respuesta JSON
    let medicalRecord;
    try {
      medicalRecord = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing Groq response:', responseText);
      return NextResponse.json(
        { error: 'Error al procesar la respuesta de IA' },
        { status: 500 }
      );
    }

    // Validar estructura básica
    if (!medicalRecord.paciente || !medicalRecord.sintomas) {
      return NextResponse.json(
        { error: 'Respuesta de IA incompleta' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: medicalRecord });
  } catch (error: any) {
    console.error('Error processing transcript:', error);
    
    // Manejar errores específicos de Groq
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'API key de Groq inválida. Verifica tu configuración en .env.local' },
        { status: 500 }
      );
    }
    
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Límite de requests excedido. Espera un momento e intenta de nuevo.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Error al procesar la transcripción' },
      { status: 500 }
    );
  }
}

