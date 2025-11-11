'use client';

import { useState, useEffect, useRef } from 'react';

interface VoiceRecorderProps {
  onTranscriptionComplete: (transcript: string) => void;
}

export default function VoiceRecorder({ onTranscriptionComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState('');
  const [manualText, setManualText] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Verificar si el navegador soporta Web Speech API
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setIsSupported(false);
        setError('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
        return;
      }

      // Inicializar el reconocimiento de voz
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'es-ES';
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptText = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptText + ' ';
          } else {
            interimTranscript += transcriptText;
          }
        }

        // Solo añadir el texto final al transcript acumulado
        if (finalTranscript) {
          setTranscript((prev) => prev + finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Error de reconocimiento:', event.error);
        if (event.error === 'no-speech') {
          setError('No se detectó habla. Intenta hablar más cerca del micrófono.');
        } else if (event.error === 'not-allowed') {
          setError('Permiso de micrófono denegado. Permite el acceso al micrófono en la configuración del navegador.');
        } else if (event.error === 'aborted') {
          // Ignorar error de aborted, es normal al detener
          return;
        } else if (event.error === 'network') {
          setError('⚠️ Error de red: Web Speech API necesita conexión a internet. Verifica tu conexión y que no haya VPN o firewall bloqueando los servicios de Google.');
        } else if (event.error === 'service-not-allowed') {
          setError('Servicio no permitido. Asegúrate de estar usando HTTPS o localhost.');
        } else {
          setError(`Error: ${event.error}`);
        }
        setIsRecording(false);
      };

      recognition.onstart = () => {
        console.log('Reconocimiento de voz iniciado');
        setError('');
      };

      recognition.onend = () => {
        console.log('Reconocimiento de voz terminado');
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignorar errores al limpiar
        }
      }
    };
  }, []);

  const startRecording = () => {
    if (!isSupported) return;
    
    setTranscript('');
    setError('');
    setIsRecording(true);
    
    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        console.log('Grabación iniciada');
      }
    } catch (error: any) {
      console.error('Error al iniciar grabación:', error);
      if (error.message && error.message.includes('already started')) {
        // Si ya está iniciado, reiniciar
        recognitionRef.current?.stop();
        setTimeout(() => {
          recognitionRef.current?.start();
        }, 100);
      } else {
        setError('Error al iniciar la grabación. Recarga la página e intenta de nuevo.');
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        console.log('Grabación detenida');
      }
    } catch (error) {
      console.error('Error al detener:', error);
    }
    
    // Procesar después de un delay
    setTimeout(() => {
      setTranscript((currentTranscript) => {
        console.log('Transcript actual:', currentTranscript);
        console.log('Longitud:', currentTranscript.length);
        
        // Usar setTimeout para evitar el warning de React
        setTimeout(() => {
          if (currentTranscript.trim()) {
            console.log('Enviando a procesar...');
            onTranscriptionComplete(currentTranscript.trim());
          } else {
            console.warn('⚠️ Transcript vacío, no se puede procesar');
            setError('No se detectó ninguna transcripción. Intenta grabar de nuevo o usa la opción de texto manual.');
          }
        }, 0);
        
        return currentTranscript;
      });
    }, 500);
  };

  const clearTranscript = () => {
    setTranscript('');
    setError('');
  };

  const handleManualSubmit = () => {
    if (manualText.trim()) {
      onTranscriptionComplete(manualText.trim());
      setManualText('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Voice Recording
      </h2>

      {!isSupported && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {error && isSupported && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-4 mb-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={!isSupported}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
              isSupported
                ? 'gradient-button hover:opacity-90'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Stop & Process
          </button>
        )}

        {transcript && !isRecording && (
          <button
            onClick={clearTranscript}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {isRecording && (
        <div className="flex items-center gap-3 mb-4 text-red-600">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <span className="font-semibold">Recording... Speak now</span>
        </div>
      )}

      {transcript && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Transcription:
          </h3>
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto flex-1">
            <p className="text-gray-800 whitespace-pre-wrap text-base leading-relaxed">{transcript}</p>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {transcript.split(' ').filter(w => w).length} words
          </p>
        </div>
      )}

      {!transcript && !isRecording && (
        <div>
          <div className="text-center py-4 text-gray-400">
            <p>Click "Start Recording" to begin</p>
            <p className="text-sm mt-2">
              Describe the medical consultation: patient data, reason, symptoms, diagnosis and treatment
            </p>
          </div>

          {/* Alternativa: Texto Manual */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Alternative: Write Text Manually
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              If recording doesn't work, you can type the consultation directly:
            </p>
            <textarea
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Example: Patient John Doe, 45 years old, male. Chest pain..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
            />
            <button
              onClick={handleManualSubmit}
              disabled={!manualText.trim()}
              className={`mt-3 w-full px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                manualText.trim()
                  ? 'gradient-button hover:opacity-90'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Process Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

