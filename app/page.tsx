'use client';

import { useState } from 'react';
import { Activity, MessageCircle, Clock } from 'lucide-react';
import VoiceRecorder from './components/VoiceRecorder';
import MedicalRecord from './components/MedicalRecord';
import { MedicalRecordData } from './types/medical';

export default function Home() {
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecordData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showConsultation, setShowConsultation] = useState(false);

  const handleTranscriptionComplete = async (transcript: string) => {
    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al procesar la transcripción');
      }

      const result = await response.json();
      setMedicalRecord(result.data);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Error al procesar la transcripción');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewConsultation = () => {
    setShowConsultation(true);
    setMedicalRecord(null);
    setError('');
  };

  const handleBackToDashboard = () => {
    setShowConsultation(false);
    setMedicalRecord(null);
    setError('');
  };

  if (showConsultation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToDashboard}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-icon flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">MediConsult AI</h1>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Hello, <span className="font-semibold">Doctor</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-[1800px] mx-auto">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p className="font-semibold">❌ Error:</p>
                <p>{error}</p>
              </div>
            )}

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-700"></div>
                <p className="font-semibold">
                  Processing transcription with AI... This may take a few seconds.
                </p>
              </div>
            )}

            {/* Componentes principales */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="h-full">
                <VoiceRecorder onTranscriptionComplete={handleTranscriptionComplete} />
              </div>
              <div className="h-full">
                <MedicalRecord data={medicalRecord} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-icon flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">MediConsult AI</h1>
            </div>
            <div className="text-sm text-gray-600">
              Hello, <span className="font-semibold">kiki</span> | <button className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors">Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
          <p className="text-gray-600">Manage your medical consultations</p>
        </div>

        {/* New Consultation Card */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-dashed border-blue-300 p-12 mb-8 hover:border-blue-400 transition-colors">
          <div className="text-center">
            <button
              onClick={handleNewConsultation}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-button text-white mb-4 hover:opacity-90 transition-opacity"
            >
              <span className="text-3xl">+</span>
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">New Medical Consultation</h3>
            <p className="text-gray-600">Start a new assessment with our assistant</p>
          </div>
        </div>

        {/* Consultation History */}
        <div className="mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800">Consultation History</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">No consultations yet. Start your first one above!</p>
        </div>
      </main>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 gradient-button text-white rounded-full p-4 shadow-2xl hover:opacity-90 transition-all hover:scale-110 flex items-center justify-center">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
